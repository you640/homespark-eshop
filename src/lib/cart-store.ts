import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant, Cart } from './types';

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  
  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  
  // Computed
  getCart: () => Cart;
  getItemCount: () => number;
}

const SHIPPING_THRESHOLD = 49; // Free shipping above this amount
const SHIPPING_COST = 4.99;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variant.id === variant.id
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity,
            };
            return { items: newItems };
          }

          const newItem: CartItem = {
            id: `${variant.id}-${Date.now()}`,
            variant,
            product,
            quantity,
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], couponCode: null, couponDiscount: 0 });
      },

      applyCoupon: (code, discount) => {
        set({ couponCode: code, couponDiscount: discount });
      },

      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0 });
      },

      getCart: () => {
        const { items, couponCode, couponDiscount } = get();
        
        const subtotal = items.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        );

        const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const discount = couponDiscount;
        const total = Math.max(0, subtotal + shipping - discount);

        return {
          items,
          subtotal,
          shipping,
          discount,
          total,
          couponCode,
        };
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'merkury-cart',
    }
  )
);
