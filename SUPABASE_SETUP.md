# Setting Up Your Hemp Database with Supabase

This guide walks you through setting up a fresh Hemp Database application using Supabase as the backend.

## Step 1: Create a Supabase Project

1. Sign up or log in at [Supabase](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key (from Project Settings → API)

## Step 2: Set Up Database Tables

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Plant Types
CREATE TABLE plant_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  model_url TEXT
);

-- Plant Parts
CREATE TABLE plant_parts (
  id SERIAL PRIMARY KEY,
  plant_type_id INTEGER REFERENCES plant_types(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

-- Industries
CREATE TABLE industries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT
);

-- Sub Industries
CREATE TABLE sub_industries (
  id SERIAL PRIMARY KEY,
  industry_id INTEGER REFERENCES industries(id),
  name TEXT NOT NULL,
  description TEXT
);

-- Hemp Products
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

-- Research Papers
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

## Step 3: Sample Data

Add sample data to your tables:

```sql
-- Insert Plant Types
INSERT INTO plant_types (name, description, image_url) VALUES 
('Fiber Hemp', 'Hemp grown primarily for its fiber content with minimal THC', '/assets/fiber-hemp.jpg'),
('Seed Hemp', 'Hemp varieties optimized for seed production', '/assets/seed-hemp.jpg'),
('CBD Hemp', 'Hemp cultivated for high CBD content with low THC', '/assets/cbd-hemp.jpg');

-- Insert Plant Parts (examples)
INSERT INTO plant_parts (plant_type_id, name, description) VALUES 
(1, 'Stalk', 'The main stem of the hemp plant'),
(1, 'Bast Fiber', 'The outer fibrous covering of the hemp stalk'),
(1, 'Hurd', 'The woody inner core of the hemp stalk');

-- Insert Industries (examples)
INSERT INTO industries (name, description, icon) VALUES 
('Construction', 'Building materials and construction applications', 'building'),
('Textiles', 'Fabric and clothing applications', 'scissors'),
('Food', 'Edible hemp products and ingredients', 'utensils');
```

## Step 4: Setup Environment Variables

Create a `.env` file with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Step 5: Supabase Client Setup

Create a file at `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

## Step 6: Create API Functions

Create a file at `src/lib/api.ts`:

```typescript
import supabase from './supabase';
import { Plant, PlantPart, Industry, Product } from './types';

// Get all plant types
export async function getPlantTypes() {
  const { data, error } = await supabase
    .from('plant_types')
    .select('*');
  
  if (error) throw error;
  return data;
}

// Get plant parts by type
export async function getPlantPartsByType(plantTypeId: number) {
  const { data, error } = await supabase
    .from('plant_parts')
    .select('*')
    .eq('plant_type_id', plantTypeId);
  
  if (error) throw error;
  return data;
}

// Get all industries
export async function getIndustries() {
  const { data, error } = await supabase
    .from('industries')
    .select('*');
  
  if (error) throw error;
  return data;
}

// Get hemp products by plant part
export async function getProductsByPlantPart(plantPartId: number) {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*')
    .eq('plant_part_id', plantPartId);
  
  if (error) throw error;
  return data;
}

// Get statistics
export async function getStats() {
  const productsCount = await supabase
    .from('hemp_products')
    .select('*', { count: 'exact', head: true });
    
  const industriesCount = await supabase
    .from('industries')
    .select('*', { count: 'exact', head: true });
    
  const plantTypesCount = await supabase
    .from('plant_types')
    .select('*', { count: 'exact', head: true });
    
  return {
    totalProducts: productsCount.count || 0,
    totalIndustries: industriesCount.count || 0,
    totalPlantTypes: plantTypesCount.count || 0
  };
}

// Search hemp products
export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*')
    .ilike('name', `%${query}%`)
    .or(`description.ilike.%${query}%`);
  
  if (error) throw error;
  return data;
}
```

## Step 7: Create React Query Hooks

Create data fetching hooks in `src/hooks/use-data.ts`:

```typescript
import { useQuery } from '@tanstack/react-query';
import * as api from '../lib/api';

export function usePlantTypes() {
  return useQuery({
    queryKey: ['plant-types'],
    queryFn: api.getPlantTypes
  });
}

export function usePlantPartsByType(plantTypeId: number | null) {
  return useQuery({
    queryKey: ['plant-parts', plantTypeId],
    queryFn: () => plantTypeId ? api.getPlantPartsByType(plantTypeId) : Promise.resolve([]),
    enabled: !!plantTypeId
  });
}

export function useIndustries() {
  return useQuery({
    queryKey: ['industries'],
    queryFn: api.getIndustries
  });
}

export function useProductsByPlantPart(plantPartId: number | null) {
  return useQuery({
    queryKey: ['products', 'plant-part', plantPartId],
    queryFn: () => plantPartId ? api.getProductsByPlantPart(plantPartId) : Promise.resolve([]),
    enabled: !!plantPartId
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: api.getStats
  });
}

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => query ? api.searchProducts(query) : Promise.resolve([]),
    enabled: query.length > 2
  });
}
```

## Step 8: Set Up TypeScript Types

Create a file at `src/lib/types.ts`:

```typescript
export interface PlantType {
  id: number;
  name: string;
  description: string;
  image_url: string;
  model_url?: string;
}

export interface PlantPart {
  id: number;
  plant_type_id: number;
  name: string;
  description: string;
  image_url?: string;
}

export interface Industry {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface SubIndustry {
  id: number;
  industry_id: number;
  name: string;
  description: string;
}

export interface HempProduct {
  id: number;
  plant_part_id: number;
  industry_id: number;
  sub_industry_id?: number;
  name: string;
  description: string;
  image_url?: string;
  environmental_impact?: string;
  economic_impact?: string;
  traditional_alternative?: string;
}

export interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  publication_date: string;
  abstract: string;
  doi?: string;
  url?: string;
  plant_type_id?: number;
  plant_part_id?: number;
  industry_id?: number;
  keywords?: string;
}

export interface Stats {
  totalProducts: number;
  totalIndustries: number;
  totalPlantTypes: number;
}
```

## Step 9: Initialize the Query Client

In your main entry file (`src/main.tsx`):

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
```

## Next Steps

1. Make sure all components are updated to use these Supabase hooks
2. Copy UI components from your original project, updating any data fetching logic
3. Update paths for images and assets in your components
4. Test your application to ensure everything is working correctly