import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../.env') });

export default function validateEnv() {
  const requiredEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD'
  ];
  
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );
  
  if (missingEnvVars.length > 0) {
    console.warn(
      `Warning: Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
    console.warn('Create a .env file in the project root or set these variables in your environment.');
  } else {
    console.log('All required environment variables found!');
    console.log(`Database host: ${process.env.DB_HOST}`);
    console.log(`Database port: ${process.env.DB_PORT}`);
    console.log(`Database name: ${process.env.DB_NAME}`);
    console.log(`Database user: ${process.env.DB_USER}`);
    console.log(`Database password: ${process.env.DB_PASSWORD ? '******' : 'Not set'}`);
  }
  
  return missingEnvVars.length === 0;
}