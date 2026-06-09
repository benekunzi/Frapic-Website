'use server';

import { supabaseServer } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const RATE_LIMIT_WINDOW = 3 * 60 * 1000; // 3 minutes
const contactRateMap = new Map<string, number>();
const taskRateMap = new Map<string, number>();

function isRateLimited(map: Map<string, number>, ip: string): boolean {
  const now = Date.now();
  const lastCall = map.get(ip);
  
  if (lastCall && now - lastCall < RATE_LIMIT_WINDOW) {
    return true; // request is blocked
  }
  
  map.set(ip, now);
  
  // Simple garbage collection to prevent memory leaks in warm lambdas
  if (map.size > 100) {
    map.forEach((time, key) => {
      if (now - time > RATE_LIMIT_WINDOW) map.delete(key);
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
