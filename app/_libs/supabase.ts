import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/_entities/common/supabase.types';

export function supabase() {
  const client = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  return client;
}

export function supabaseServer() {
  const client = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  return client;
}
