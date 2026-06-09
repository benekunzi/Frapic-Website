import { createClient } from '@supabase/supabase-js';

// We use the non-NEXT_PUBLIC url and keys here for server side validation,
// optionally if you want to reuse this on the client you'd use NEXT_PUBLIC prefix.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase Environment Variables');
}

export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);
