import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

// Connect to the PostgreSQL database using direct connection details
console.log('Connecting to Supabase PostgreSQL database');
const pool = new Pool({
  user: 'postgres', 
  password: '#4HQZgasswo',
  host: 'db.qnclnzaipfdecnptwlfw.supabase.co',
  port: 5432,
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Successfully connected to Supabase database! Server time:', res.rows[0].now);
  }
});

// Export the drizzle instance with the configured pool and schema
export const db = drizzle(pool, { schema });