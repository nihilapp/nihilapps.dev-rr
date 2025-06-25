import { createClient } from '@supabase/supabase-js';

export function supabase() {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  return client;
}

export function supabaseServer() {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  return client;
}
