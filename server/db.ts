import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';
import { supabase } from './supabase';

// Connect to the Supabase-hosted PostgreSQL database
console.log('Connecting to Supabase-hosted PostgreSQL database');

// Connection configuration for Supabase PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'db.lnclfnomfnoaqpatmqhj.supabase.co',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres', 
  password: process.env.DB_PASSWORD || '#4HQZgasswo',  // Using the provided password
  ssl: {
    // This is needed to handle self-signed certificates in the chain
    rejectUnauthorized: false
  }
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
    console.error('Error details:', err.message);
    console.error('Make sure to set the correct database credentials in the .env file or edit the db.ts file directly');
    
    // Try logging more information about the connection
    console.log('Connection details:');
    console.log(`- Host: ${process.env.DB_HOST || 'db.lnclfnomfnoaqpatmqhj.supabase.co'}`);
    console.log(`- Port: ${process.env.DB_PORT || '5432'}`);
    console.log(`- Database: ${process.env.DB_NAME || 'postgres'}`);
    console.log(`- User: ${process.env.DB_USER || 'postgres'}`);
    console.log(`- Password present: ${process.env.DB_PASSWORD ? 'Yes' : 'No'}`);
  } else {
    console.log('Successfully connected to Supabase database! Server time:', res.rows[0].now);
  }
});

// Export the drizzle instance with the configured pool and schema
export const db = drizzle(pool, { schema });