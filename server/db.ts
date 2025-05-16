import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

// Connect to the PostgreSQL database with explicit parameters
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
    console.log('Successfully connected to database! Server time:', res.rows[0].now);
  }
});

// Export the drizzle instance with the configured pool and schema
export const db = drizzle(pool, { schema });