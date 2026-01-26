// E-commerce types for MerkuryMarket

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  subcategories?: Category[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  category_id: string | null;
  brand: string | null;
  price_from: number;
  currency: string;
  rating: number;
  rating_count: number;
  is_active: boolean;
  is_featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  variants?: ProductVariant[];
  images?: ProductImage[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  title: string;
  price: number;
  compare_at_price: number | null;
  stock: number;
  attributes: Record<string, string>;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  variant: ProductVariant;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode: string | null;
}

export interface Address {
  id?: string;
  user_id?: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  is_default?: boolean;
}

export interface Order {
  id: string;
  user_id: string | null;
  email: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  payment_method: PaymentMethod;
  shipping_address: Address;
  billing_address: Address | null;
  notes: string | null;
  coupon_code: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id: string | null;
  name_snapshot: string;
  sku_snapshot: string | null;
  price_snapshot: number;
  quantity: number;
  attributes_snapshot: Record<string, string>;
  created_at: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'stripe' | 'cash_on_delivery';
export type CouponType = 'percentage' | 'fixed';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  min_cart_total: number;
  max_uses: number | null;
  used_count: number;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  button_text: string | null;
  sort_order: number;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  author_id: string | null;
  published_at: string | null;
  is_published: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceMin: number | null;
  priceMax: number | null;
  inStock: boolean;
  minRating: number | null;
  attributes: Record<string, string[]>;
}

export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'popularity', label: 'Najpopulárnejšie' },
  { value: 'newest', label: 'Najnovšie' },
  { value: 'price_asc', label: 'Cena: od najnižšej' },
  { value: 'price_desc', label: 'Cena: od najvyššej' },
  { value: 'rating', label: 'Najlepšie hodnotené' },
];
