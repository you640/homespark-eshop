import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';

export function MobileCartButton() {
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const itemCount = useCartStore((state) => state.getItemCount());
  
  // Hide on cart and checkout pages, or if cart is empty
  const hiddenPaths = ['/kosik', '/pokladna', '/prihlasenie', '/registracia'];
  if (hiddenPaths.some(path => location.pathname.startsWith(path)) || items.length === 0) {
    return null;
  }

  const total = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  return (
    <Link to="/kosik" className="mobile-cart-button">
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-foreground text-primary text-xs font-bold flex items-center justify-center">
            {itemCount}
          </span>
        </div>
        <div className="text-left">
          <p className="text-sm opacity-90">Košík</p>
          <p className="font-bold">{formatPrice(total)}</p>
        </div>
      </div>
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}