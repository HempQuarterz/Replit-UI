# Industrial Hemp Database UI Export Guide

This guide will help you recreate the UI of this application with a fresh Supabase database setup.

## Step 1: Export UI Components and Assets

1. Download the project files from Replit
2. Extract the following directories and files which contain the UI components:
   - `client/src/components/` - All UI components
   - `client/src/pages/` - Page layouts and routing
   - `client/src/assets/` - Images and static assets
   - `client/src/lib/utils.ts` - Utility functions
   - `client/src/hooks/use-mobile.tsx` - Mobile detection hook
   - `client/src/hooks/use-toast.ts` - Toast notification system
   - `client/index.html` - Main HTML template
   - `client/src/index.css` - Global styles
   - `attached_assets/` - All custom images and assets
   - `tailwind.config.ts` - Tailwind configuration
   - `postcss.config.js` - PostCSS configuration

## Step 2: Set Up a New Project with Supabase

1. Create a new project with these dependencies:
   ```
   npm create vite@latest hemp-database -- --template react-ts
   cd hemp-database
   npm install @supabase/supabase-js
   npm install tailwindcss postcss autoprefixer
   npm install @radix-ui/react-* lucide-react class-variance-authority clsx tailwind-merge
   npm install @tanstack/react-query wouter
   npm install @react-three/fiber @react-three/drei three
   ```

2. Set up Tailwind CSS:
   ```
   npx tailwindcss init -p
   ```

3. Copy over the Tailwind and PostCSS config files

## Step 3: Supabase Database Setup

1. Create a new Supabase project at https://supabase.com
2. Under SQL Editor, run the following SQL to create your tables:

```sql
-- Create tables based on schema in shared/schema.ts
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE plant_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  model_url TEXT
);

CREATE TABLE plant_parts (
  id SERIAL PRIMARY KEY,
  plant_type_id INTEGER REFERENCES plant_types(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

CREATE TABLE industries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT
);

CREATE TABLE sub_industries (
  id SERIAL PRIMARY KEY,
  industry_id INTEGER REFERENCES industries(id),
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE hemp_products (
  id SERIAL PRIMARY KEY,
  plant_part_id INTEGER REFERENCES plant_parts(id),
  industry_id INTEGER REFERENCES industries(id),
  sub_industry_id INTEGER REFERENCES sub_industries(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  environmental_impact TEXT,
  economic_impact TEXT,
  traditional_alternative TEXT
);

CREATE TABLE research_papers (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  publication_date DATE,
  abstract TEXT,
  doi TEXT,
  url TEXT,
  plant_type_id INTEGER REFERENCES plant_types(id),
  plant_part_id INTEGER REFERENCES plant_parts(id),
  industry_id INTEGER REFERENCES industries(id),
  keywords TEXT
);
```

## Step 4: Connect to Supabase

1. Create a lib directory with a supabase.ts file:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

2. Create a .env file with your Supabase credentials:

```
VITE_SUPABASE_URL=https://yourprojectid.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Step 5: Create Data Hooks

Replace the existing data hooks with Supabase versions:

1. Create `src/hooks/use-plant-data.ts`:

```typescript
import { useQuery } from '@tanstack/react-query';
import supabase from '../lib/supabase';

export function usePlantTypes() {
  return useQuery({
    queryKey: ['plant-types'],
    queryFn: async () => {
      const { data, error } = await supabase.from('plant_types').select('*');
      if (error) throw error;
      return data;
    }
  });
}

// Create similar hooks for other plant data
```

2. Create similar hook files for product data and research papers

## Step 6: Copy the UI Components

1. Copy your components, pages, and assets directories from the original project
2. Update any API endpoint references to use your Supabase hooks
3. Make sure all imports are updated to match your new project structure

## Step 7: Set Up Routing

1. Set up the routing in your App.tsx:

```typescript
import { Route, Switch } from 'wouter';
import HomePage from './pages/home';
// Import other pages

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" component={HomePage} />
        {/* Add other routes */}
      </Switch>
    </div>
  );
}

export default App;
```

## Step 8: Import Styles

1. Copy the index.css file and ensure the Tailwind directives are included:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles */
```

## Step 9: Setup Supabase Client-Side Logic

Create utility functions to handle data operations:

```typescript
// src/lib/api.ts
import supabase from './supabase';

export async function fetchPlantTypes() {
  const { data, error } = await supabase.from('plant_types').select('*');
  if (error) throw error;
  return data;
}

// Add more functions for other data operations
```

## Step 10: Run Your New Project

1. Start the development server:
   ```
   npm run dev
   ```

2. Verify that the UI looks correct and is properly connected to your Supabase database

## Troubleshooting

- If components aren't rendering correctly, check for missing dependencies or CSS issues
- If data isn't loading, verify your Supabase connection and query hooks
- Check the browser console for any errors related to API calls or component rendering