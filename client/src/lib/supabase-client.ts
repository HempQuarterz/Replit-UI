import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or key is missing. Check your environment variables.');
}

const supabase = createClient(
  supabaseUrl || '', 
  supabaseKey || ''
);

export default supabase;