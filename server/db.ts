import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

// Connect to the Replit-hosted PostgreSQL database
console.log('Connecting to Replit-hosted PostgreSQL database');
const pool = new Pool({
  // This will use the PGUSER, PGHOST, etc. environment variables
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