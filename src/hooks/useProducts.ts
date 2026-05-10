import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product, ProductVariant, ProductImage, Category } from '@/lib/types';

export type ProductWithDetails = Product & {
  variant?: ProductVariant;
  image?: ProductImage;
};

async function fetchProducts(categorySlug?: string): Promise<ProductWithDetails[]> {
  let query = supabase
    .from('products')
    .select('*, category:categories!inner(slug, name), product_variants(*), product_images(*)')
    .eq('is_active', true);

  if (categorySlug && categorySlug !== 'vsetko') {
    query = query.eq('categories.slug', categorySlug);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map((p: any) => ({
    ...p,
    variant: p.product_variants?.[0],
    image: p.product_images?.[0],
  }));
}

export function useProducts(categorySlug?: string) {
  return useQuery({
    queryKey: ['products', categorySlug || 'all'],
    queryFn: () => fetchProducts(categorySlug),
  });
}

export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async (): Promise<ProductWithDetails[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_variants(*), product_images(*)')
        .eq('is_active', true)
        .order('rating_count', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data || []).map((p: any) => ({
        ...p,
        variant: p.product_variants?.[0],
        image: p.product_images?.[0],
      }));
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as Category[];
    },
  });
}
