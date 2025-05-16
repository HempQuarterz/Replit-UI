import { useQuery } from '@tanstack/react-query';
import * as api from '../lib/supabase-api';

// Plant Types Hooks
export function usePlantTypes() {
  return useQuery({
    queryKey: ['plant-types'],
    queryFn: api.getPlantTypes
  });
}

export function usePlantType(id: number | null) {
  return useQuery({
    queryKey: ['plant-type', id],
    queryFn: () => id ? api.getPlantType(id) : Promise.resolve(null),
    enabled: !!id
  });
}

// Plant Parts Hooks
export function usePlantParts() {
  return useQuery({
    queryKey: ['plant-parts'],
    queryFn: api.getPlantParts
  });
}

export function usePlantPartsByType(plantTypeId: number | null) {
  return useQuery({
    queryKey: ['plant-parts', 'by-type', plantTypeId],
    queryFn: () => plantTypeId ? api.getPlantPartsByType(plantTypeId) : Promise.resolve([]),
    enabled: !!plantTypeId
  });
}

export function usePlantPart(id: number | null) {
  return useQuery({
    queryKey: ['plant-part', id],
    queryFn: () => id ? api.getPlantPart(id) : Promise.resolve(null),
    enabled: !!id
  });
}

// Industries Hooks
export function useIndustries() {
  return useQuery({
    queryKey: ['industries'],
    queryFn: api.getIndustries
  });
}

export function useIndustry(id: number | null) {
  return useQuery({
    queryKey: ['industry', id],
    queryFn: () => id ? api.getIndustry(id) : Promise.resolve(null),
    enabled: !!id
  });
}

// Hemp Products Hooks
export function useHempProducts() {
  return useQuery({
    queryKey: ['hemp-products'],
    queryFn: api.getHempProducts
  });
}

export function useHempProduct(id: number | null) {
  return useQuery({
    queryKey: ['hemp-product', id],
    queryFn: () => id ? api.getHempProduct(id) : Promise.resolve(null),
    enabled: !!id
  });
}

export function useHempProductsByPart(plantPartId: number | null, industryId?: number | null, page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['hemp-products', 'by-part', plantPartId, industryId, page, limit],
    queryFn: async () => {
      if (!plantPartId) return { products: [], total: 0 };
      
      if (industryId) {
        const products = await api.getHempProductsByPartAndIndustry(plantPartId, industryId);
        return { products, total: products.length };
      }
      
      return api.getPaginatedHempProducts(page, limit, plantPartId);
    },
    enabled: !!plantPartId
  });
}

export function useHempProductsByIndustry(industryId: number | null) {
  return useQuery({
    queryKey: ['hemp-products', 'by-industry', industryId],
    queryFn: () => industryId ? api.getHempProductsByIndustry(industryId) : Promise.resolve([]),
    enabled: !!industryId
  });
}

export function useHempSearch(query: string) {
  return useQuery({
    queryKey: ['hemp-products', 'search', query],
    queryFn: () => query ? api.searchHempProducts(query) : Promise.resolve([]),
    enabled: query.length > 2
  });
}

// Research Papers Hooks
export function useResearchPapers() {
  return useQuery({
    queryKey: ['research-papers'],
    queryFn: api.getResearchPapers
  });
}

export function useResearchPaper(id: number | null) {
  return useQuery({
    queryKey: ['research-paper', id],
    queryFn: () => id ? api.getResearchPaper(id) : Promise.resolve(null),
    enabled: !!id
  });
}

export function useResearchPapersByPlantType(plantTypeId: number | null) {
  return useQuery({
    queryKey: ['research-papers', 'by-plant-type', plantTypeId],
    queryFn: () => plantTypeId ? api.getResearchPapersByPlantType(plantTypeId) : Promise.resolve([]),
    enabled: !!plantTypeId
  });
}

export function useResearchPapersByPlantPart(plantPartId: number | null) {
  return useQuery({
    queryKey: ['research-papers', 'by-plant-part', plantPartId],
    queryFn: () => plantPartId ? api.getResearchPapersByPlantPart(plantPartId) : Promise.resolve([]),
    enabled: !!plantPartId
  });
}

export function useResearchPapersByIndustry(industryId: number | null) {
  return useQuery({
    queryKey: ['research-papers', 'by-industry', industryId],
    queryFn: () => industryId ? api.getResearchPapersByIndustry(industryId) : Promise.resolve([]),
    enabled: !!industryId
  });
}

export function useSearchResearchPapers(query: string) {
  return useQuery({
    queryKey: ['research-papers', 'search', query],
    queryFn: () => query ? api.searchResearchPapers(query) : Promise.resolve([]),
    enabled: query.length > 2
  });
}

// Stats Hook
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: api.getStats
  });
}