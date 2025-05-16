import { createClient } from '@supabase/supabase-js';

// Create a Supabase client
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or key is missing. Check your environment variables.');
}

const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

export default supabase;