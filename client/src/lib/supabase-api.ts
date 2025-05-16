import supabase from './supabase-client';
import type { PlantType, PlantPart, Industry, HempProduct, ResearchPaper, Stats } from '../types/schema';

// Plant Types API
export async function getPlantTypes(): Promise<PlantType[]> {
  const { data, error } = await supabase
    .from('plant_types')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getPlantType(id: number): Promise<PlantType | null> {
  const { data, error } = await supabase
    .from('plant_types')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// Plant Parts API
export async function getPlantParts(): Promise<PlantPart[]> {
  const { data, error } = await supabase
    .from('plant_parts')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getPlantPartsByType(plantTypeId: number): Promise<PlantPart[]> {
  const { data, error } = await supabase
    .from('plant_parts')
    .select('*')
    .eq('plant_type_id', plantTypeId);
  
  if (error) throw error;
  return data || [];
}

export async function getPlantPart(id: number): Promise<PlantPart | null> {
  const { data, error } = await supabase
    .from('plant_parts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// Industries API
export async function getIndustries(): Promise<Industry[]> {
  const { data, error } = await supabase
    .from('industries')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getIndustry(id: number): Promise<Industry | null> {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// Hemp Products API
export async function getHempProducts(): Promise<HempProduct[]> {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getHempProduct(id: number): Promise<HempProduct | null> {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getHempProductsByPart(plantPartId: number): Promise<HempProduct[]> {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*')
    .eq('plant_part_id', plantPartId);
  
  if (error) throw error;
  return data || [];
}

export async function getHempProductsByIndustry(industryId: number): Promise<HempProduct[]> {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*')
    .eq('industry_id', industryId);
  
  if (error) throw error;
  return data || [];
}

export async function getHempProductsByPartAndIndustry(
  plantPartId: number, 
  industryId: number
): Promise<HempProduct[]> {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*')
    .eq('plant_part_id', plantPartId)
    .eq('industry_id', industryId);
  
  if (error) throw error;
  return data || [];
}

export async function getPaginatedHempProducts(
  page: number = 1, 
  limit: number = 10,
  plantPartId?: number,
  industryId?: number
): Promise<{ products: HempProduct[], total: number }> {
  let query = supabase
    .from('hemp_products')
    .select('*', { count: 'exact' });
  
  if (plantPartId) {
    query = query.eq('plant_part_id', plantPartId);
  }
  
  if (industryId) {
    query = query.eq('industry_id', industryId);
  }
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  const { data, error, count } = await query
    .range(from, to);
  
  if (error) throw error;
  return { 
    products: data || [], 
    total: count || 0 
  };
}

export async function searchHempProducts(query: string): Promise<HempProduct[]> {
  const { data, error } = await supabase
    .from('hemp_products')
    .select('*')
    .ilike('name', `%${query}%`)
    .or(`description.ilike.%${query}%`);
  
  if (error) throw error;
  return data || [];
}

// Research Papers API
export async function getResearchPapers(): Promise<ResearchPaper[]> {
  const { data, error } = await supabase
    .from('research_papers')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getResearchPaper(id: number): Promise<ResearchPaper | null> {
  const { data, error } = await supabase
    .from('research_papers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getResearchPapersByPlantType(plantTypeId: number): Promise<ResearchPaper[]> {
  const { data, error } = await supabase
    .from('research_papers')
    .select('*')
    .eq('plant_type_id', plantTypeId);
  
  if (error) throw error;
  return data || [];
}

export async function getResearchPapersByPlantPart(plantPartId: number): Promise<ResearchPaper[]> {
  const { data, error } = await supabase
    .from('research_papers')
    .select('*')
    .eq('plant_part_id', plantPartId);
  
  if (error) throw error;
  return data || [];
}

export async function getResearchPapersByIndustry(industryId: number): Promise<ResearchPaper[]> {
  const { data, error } = await supabase
    .from('research_papers')
    .select('*')
    .eq('industry_id', industryId);
  
  if (error) throw error;
  return data || [];
}

export async function searchResearchPapers(query: string): Promise<ResearchPaper[]> {
  const { data, error } = await supabase
    .from('research_papers')
    .select('*')
    .ilike('title', `%${query}%`)
    .or(`abstract.ilike.%${query}%`)
    .or(`authors.ilike.%${query}%`);
  
  if (error) throw error;
  return data || [];
}

// Statistics API
export async function getStats(): Promise<Stats> {
  const productsCount = await supabase
    .from('hemp_products')
    .select('*', { count: 'exact', head: true });
    
  const industriesCount = await supabase
    .from('industries')
    .select('*', { count: 'exact', head: true });
    
  const plantTypesCount = await supabase
    .from('plant_types')
    .select('*', { count: 'exact', head: true });
    
  const plantPartsCount = await supabase
    .from('plant_parts')
    .select('*', { count: 'exact', head: true });

  const researchPapersCount = await supabase
    .from('research_papers')
    .select('*', { count: 'exact', head: true });
    
  return {
    totalProducts: productsCount.count || 0,
    totalIndustries: industriesCount.count || 0,
    totalPlantTypes: plantTypesCount.count || 0,
    totalPlantParts: plantPartsCount.count || 0,
    totalResearchPapers: researchPapersCount.count || 0
  };
}