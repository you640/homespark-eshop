import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ProductWithDetails } from '@/hooks/useProducts';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ProductWithDetails;
  variant?: ProductWithDetails['variant'];
  image?: ProductWithDetails['image'];
  className?: string;
}

export function ProductCard({ product, variant, image, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const [isPulsing, setIsPulsing] = useState(false);

  const price = variant?.price ?? product.price_from;
  const comparePrice = variant?.compare_at_price;
  const hasDiscount = comparePrice && comparePrice > price;
  const discountPercent = hasDiscount ? getDiscountPercentage(comparePrice, price) : 0;
  const inStock = variant ? variant.stock > 0 : true;

  const handleCardClick = () => {
    if (isPulsing) return;
    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
      navigate(`/produkt/${product.slug}`);
    }, 200);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) {
      toast.info('Vyberte variant produktu');
      return;
    }
    addItem(product, variant, 1);
    toast.success('Pridané do košíka', {
      description: product.name,
      action: { label: 'Zobraziť košík', onClick: () => (window.location.href = '/kosik') },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Pridané do zoznamu želaní');
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
      className={cn(
        'product-card glass hover-lift group block cursor-pointer',
        isPulsing && 'animate-pulse-scale',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/20 rounded-t-xl">
        {image?.url ? (
          <img
            src={image.url}
            alt={image.alt_text || product.name}
            className="img-reveal h-full w-full object-cover mix-blend-multiply dark:mix-blend-normal"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted/20">
            <span className="text-4xl text-muted-foreground/30">📦</span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && <span className="badge-premium bg-destructive text-destructive-foreground shadow-lg">-{discountPercent}%</span>}
          {product.is_featured && <span className="badge-premium bg-primary text-primary-foreground shadow-lg">Novinka</span>}
        </div>

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2.5 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 dark:hover:bg-black/40 hover:scale-110"
          aria-label="Pridať do zoznamu želaní"
        >
          <Heart className="h-5 w-5 text-foreground" />
        </button>

        {variant && inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hidden md:block bg-gradient-to-t from-background/90 to-transparent">
            <button 
              onClick={handleAddToCart} 
              className="btn-premium w-full shadow-lg backdrop-blur-md"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Do košíka
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between h-[180px]">
        <div>
          {product.brand && (
            <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-2">{product.brand}</p>
          )}

          <h3 className="font-display font-semibold text-lg text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {product.rating > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground ml-1">({product.rating_count})</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-foreground font-display tracking-tight">{formatPrice(price)}</span>
          {hasDiscount && <span className="text-sm text-muted-foreground line-through font-medium">{formatPrice(comparePrice)}</span>}
        </div>

        {!inStock && (
          <Badge variant="outline" className="mt-3 text-destructive border-destructive font-medium uppercase tracking-wider text-xs">
            Vypredané
          </Badge>
        )}

        {variant && inStock && (
          <button 
            onClick={handleAddToCart} 
            className="btn-premium w-full mt-4 md:hidden py-3"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Do košíka
          </button>
        )}
      </div>
    </div>
  );
}
