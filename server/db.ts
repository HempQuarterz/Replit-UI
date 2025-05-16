import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '@shared/schema';

// Use WebSockets for Neon/Supabase serverless connections
neonConfig.webSocketConstructor = ws;

// Check if we have the necessary environment variables
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provide your Supabase connection string?",
  );
}

// Connect to the PostgreSQL database using Supabase
console.log('Connecting to Supabase database');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true });

// Export the drizzle instance with the configured pool and schema
export const db = drizzle({ client: pool, schema });