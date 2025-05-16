// Type definitions for the Supabase database schema

export interface PlantType {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  planting_density?: string;
  characteristics?: string;
  created_at?: string;
}

export interface PlantPart {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  plant_type_id: number;
  created_at?: string;
}

export interface Industry {
  id: number;
  name: string;
  description?: string;
  icon_name?: string;
  created_at?: string;
}

export interface SubIndustry {
  id: number;
  name: string;
  description?: string;
  industry_id: number;
  created_at?: string;
}

export interface HempProduct {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  plant_part_id: number;
  industry_id: number;
  sub_industry_id?: number;
  properties?: Record<string, any>;
  facts?: Record<string, any>;
  sustainability_impact?: string;
  affiliate_links?: Record<string, string>[];
  related_product_ids?: number[];
  created_at?: string;
}

export interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  abstract: string;
  publication_date?: string;
  journal?: string;
  doi?: string;
  url?: string;
  pdf_url?: string;
  image_url?: string;
  plant_type_id?: number;
  plant_part_id?: number;
  industry_id?: number;
  keywords?: string[];
  citations?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Stats {
  totalProducts: number;
  totalIndustries: number;
  totalPlantTypes: number;
  totalPlantParts: number;
  totalResearchPapers: number;
}

export interface User {
  id: number;
  username: string;
  password?: string;
}