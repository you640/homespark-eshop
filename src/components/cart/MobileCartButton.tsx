import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';

export function MobileCartButton() {
  const location = useLocation();
  const cart = useCartStore((state) => state.getCart());
  
  // Hide on cart and checkout pages, or if cart is empty
  const hiddenPaths = ['/kosik', '/pokladna', '/prihlasenie', '/registracia'];
  if (hiddenPaths.some(path => location.pathname.startsWith(path)) || cart.items.length === 0) {
    return null;
  }

  return (
    <Link to="/kosik" className="mobile-cart-button">
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-foreground text-primary text-xs font-bold flex items-center justify-center">
            {cart.items.length}
          </span>
        </div>
        <div className="text-left">
          <p className="text-sm opacity-90">Košík</p>
          <p className="font-bold">{formatPrice(cart.total)}</p>
        </div>
      </div>
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}
