import { useQuery } from '@tanstack/react-query';
import { products as mockProducts } from '@/data/products';
import type { Product, ProductVariant, ProductImage, Category } from '@/lib/types';

export type ProductWithDetails = Product & {
  variant?: ProductVariant;
  image?: ProductImage;
};

// Map our simplified mock product to the complex ProductWithDetails expected by the app
const mappedProducts: ProductWithDetails[] = mockProducts.map((p, index) => {
  const variant: ProductVariant = {
    id: `var-${p.id}`,
    product_id: p.id,
    sku: p.id,
    title: 'Default',
    price: p.sellPrice,
    compare_at_price: Math.round(p.sellPrice * 1.2), // Fake 20% discount
    stock: 50,
    attributes: {},
    is_active: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const images: ProductImage[] = p.images.map((url, i) => ({
    id: `img-${p.id}-${i}`,
    product_id: p.id,
    url: url,
    alt_text: p.name,
    sort_order: i,
    created_at: new Date().toISOString(),
  }));

  return {
    id: p.id,
    name: p.name,
    slug: p.id, // using id as slug for simplicity
    description: p.description,
    short_description: p.description.substring(0, 50) + '...',
    category_id: p.category, // cheating a bit, using category name as ID
    brand: p.supplier,
    price_from: p.sellPrice,
    currency: 'EUR',
    rating: 4 + Math.random(), // random rating between 4 and 5
    rating_count: Math.floor(Math.random() * 100) + 5,
    is_active: true,
    is_featured: index % 5 === 0, // make every 5th product featured
    meta_title: p.name,
    meta_description: p.description,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variant: variant,
    image: images[0],
    variants: [variant],
    images: images,
  } as ProductWithDetails;
});

async function fetchProducts(categorySlug?: string): Promise<ProductWithDetails[]> {
  if (categorySlug && categorySlug !== 'vsetko') {
    // Basic filter by category name
    return mappedProducts.filter(p => p.category_id?.toLowerCase() === categorySlug.toLowerCase());
  }
  return mappedProducts;
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
      // Return highly rated / random products as featured
      return [...mappedProducts].sort((a, b) => b.rating_count - a.rating_count).slice(0, limit);
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      // Extract unique categories from our mock data
      const uniqueCats = Array.from(new Set(mockProducts.map(p => p.category)));
      return uniqueCats.map((catName, index) => ({
        id: `cat-${index}`,
        name: catName,
        slug: catName.toLowerCase(),
        description: null,
        image_url: null,
        parent_id: null,
        sort_order: index,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    },
  });
}
