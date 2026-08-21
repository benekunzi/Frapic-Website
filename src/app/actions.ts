'use server';

import { supabaseServer } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const RATE_LIMIT_WINDOW = 3 * 60 * 1000; // 3 minutes
const GIF_RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const contactRateMap = new Map<string, number>();
const taskRateMap = new Map<string, number>();
const gifRateMap = new Map<string, number>();

function isRateLimited(
  map: Map<string, number>,
  ip: string,
  windowMs: number = RATE_LIMIT_WINDOW,
): boolean {
  const now = Date.now();
  const lastCall = map.get(ip);

  if (lastCall && now - lastCall < windowMs) {
    return true; // request is blocked
  }

  map.set(ip, now);

  // Simple garbage collection to prevent memory leaks in warm lambdas
  if (map.size > 100) {
    map.forEach((time, key) => {
      if (now - time > windowMs) map.delete(key);
    });
  }

  return false;
}

async function getIP() {
  const head = await headers();
  const forwardedFor = head.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0];
  return head.get('x-real-ip') || '127.0.0.1';
}

export async function submitContactForm(formData: FormData) {
  const ip = await getIP();
  if (isRateLimited(contactRateMap, ip)) {
    return { error: 'You are submitting forms too quickly. Please wait a few minutes before trying again.' };
  }

  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString();

  if (!email || !message) {
    return { error: 'Email and message are required.' };
  }

  const { error } = await supabaseServer.from('contact_messages').insert([{ email, message }]);

  if (error) {
    console.error('Error submitting contact form:', error);
    return { error: 'Failed to submit contact message.' };
  }

  return { success: true };
}

export async function submitFutureTask(formData: FormData) {
  const ip = await getIP();
  if (isRateLimited(taskRateMap, ip)) {
    return { error: 'You are submitting features too quickly. Please wait a few minutes before adding another one.' };
  }

  const title = formData.get('title')?.toString();
  const description = formData.get('description')?.toString();

  if (!title || !description) {
    return { error: 'Title and description are required.' };
  }

  const { error } = await supabaseServer.from('future_tasks').insert([
    {
      title,
      description,
      is_company_task: false, // User submissions are always false by default
    },
  ]);

  if (error) {
    console.error('Error submitting future task:', error);
    return { error: 'Failed to submit task.' };
  }

  // Revalidate to ensure the newly added task shows up without a page refresh
  revalidatePath('/');
  return { success: true };
}

interface GiphyGif {
  id: string;
  images: {
    fixed_height?: { url: string };
    original?: { url: string };
  };
}

// Claims a thank-you GIF that has never been assigned to any donation before.
// The giphy_id primary key in thank_you_gifs guarantees global uniqueness even
// if two donors claim at the exact same moment (the second insert fails and we
// fall back to the next candidate).
export async function claimThankYouGif(): Promise<
  { success: true; gif: { id: string; url: string } } | { error: string }
> {
  const ip = await getIP();
  if (isRateLimited(gifRateMap, ip, GIF_RATE_LIMIT_WINDOW)) {
    return { error: 'rate_limited' };
  }

  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) {
    console.error('Missing GIPHY_API_KEY environment variable');
    return { error: 'not_configured' };
  }

  try {
    // Collect every GIF id that has already been claimed (paginated around
    // Supabase's default 1000-row cap).
    const usedIds = new Set<string>();
    const PAGE_SIZE = 1000;
    let from = 0;
    for (;;) {
      const { data, error } = await supabaseServer
        .from('thank_you_gifs')
        .select('giphy_id')
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw new Error(error.message);
      for (const row of data ?? []) usedIds.add(row.giphy_id as string);
      if (!data || data.length < PAGE_SIZE) break;
      from += PAGE_SIZE;
    }

    // Try a few random pages of Giphy search results until we find an unclaimed GIF.
    for (let attempt = 0; attempt < 3; attempt++) {
      const offset = Math.floor(Math.random() * 8) * 25;
      const url =
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}` +
        `&q=${encodeURIComponent('thank you')}&limit=25&offset=${offset}&rating=g`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Giphy API responded with ${res.status}`);
      const json = await res.json();
      const candidates: GiphyGif[] = (json.data ?? []).filter(
        (gif: GiphyGif) => !usedIds.has(gif.id),
      );

      // Shuffle so concurrent donors don't all race for the same first candidate.
      for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }

      for (const candidate of candidates) {
        const gifUrl = candidate.images.fixed_height?.url ?? candidate.images.original?.url;
        if (!gifUrl) continue;

        const { error: insertError } = await supabaseServer
          .from('thank_you_gifs')
          .insert([{ giphy_id: candidate.id, gif_url: gifUrl }]);
        if (!insertError) {
          return { success: true, gif: { id: candidate.id, url: gifUrl } };
        }
        // 23505 = unique violation: another donor claimed this GIF concurrently.
        if (insertError.code !== '23505') throw new Error(insertError.message);
      }
    }

    return { error: 'pool_exhausted' };
  } catch (err) {
    console.error('Error claiming thank-you GIF:', err);
    return { error: 'fetch_failed' };
  }
}
