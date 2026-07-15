export type PublicProfile = {
  username: string;
  displayName: string;
  profilePicUrl: string | null;
};

/**
 * Server-side only — calls the `get-public-profile` Supabase Edge Function, which
 * uses the service role to bypass the `profiles` table's "authenticated users only"
 * RLS policy and returns just the fields that are safe to expose with no session:
 * username, display name, profile picture. Used to render share-link previews at
 * /u/[username] (frapic.de/u/<username>).
 */
export async function getPublicProfile(username: string): Promise<PublicProfile | null> {
  // This only ever runs on the server (generateMetadata / the page's Server Component),
  // so it deliberately prefers the non-NEXT_PUBLIC_ env vars — the NEXT_PUBLIC_ prefix
  // gets a value inlined into the client JS bundle at build time, which buys nothing
  // here and just exposes it in view-source for no reason. Falls back to the
  // NEXT_PUBLIC_ ones so this keeps working without a deployment env change.
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey || !username.trim()) {
    return null;
  }

  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/get-public-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ username }),
      // Bunny-signed profile pic URLs stay valid for a stable ~12h window (see
      // signBunnyUrl), so an hour of caching here is safe and cuts function calls.
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return (await res.json()) as PublicProfile;
  } catch (error) {
    console.error("Error fetching public profile:", error);
    return null;
  }
}
