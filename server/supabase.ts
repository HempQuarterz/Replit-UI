import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from '@shared/schema';

// Supabase connection details
const supabaseUrl = process.env.SUPABASE_URL || 'https://lnclfnomfnoaqpatmqhj.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuY2xmbm9tZm5vYXFwYXRtcWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMTYwMTksImV4cCI6MjA1MjU5MjAxOX0.PF2Yp2Zyaxqrx6jcPYv_xuou_NDwOT949sRwGz3tPPc';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Connecting to Supabase database:', supabaseUrl);

// We'll export this client for direct Supabase API access (auth, storage, etc.)
export default supabase;