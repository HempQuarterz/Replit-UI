import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

// Use the PostgreSQL database that was created with Replit
// This ensures the application works properly
console.log('Connecting to Replit-hosted PostgreSQL database');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
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