import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
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
    }, 150);
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
        'product-card group block cursor-pointer',
        isPulsing && 'scale-[0.98]',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        {image?.url ? (
          <img
            src={image.url}
            alt={image.alt_text || product.name}
            className="img-reveal h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted/10">
            <span className="text-5xl opacity-20">📦</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="badge-premium bg-destructive text-white">-{discountPercent}%</span>
          )}
          {product.is_featured && (
            <span className="badge-premium bg-foreground text-background">Novinka</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/40 shadow-sm
                     opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
          aria-label="Pridať do zoznamu želaní"
        >
          <Heart className="h-4 w-4 text-foreground" />
        </button>

        {/* Add to cart — slide up on hover (desktop) */}
        {variant && inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors shadow-lg"
            >
              <ShoppingCart className="h-4 w-4" />
              Do košíka
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {product.brand && (
          <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mb-1.5">
            {product.brand}
          </p>
        )}

        <h3 className="font-sans font-semibold text-[15px] text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {product.rating > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({product.rating_count})</span>
          </div>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground tracking-tight">{formatPrice(price)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(comparePrice)}</span>
          )}
        </div>

        {!inStock && (
          <Badge variant="outline" className="mt-2 text-destructive border-destructive text-xs">
            Vypredané
          </Badge>
        )}

        {/* Mobile add-to-cart */}
        {variant && inStock && (
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 mt-3 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl md:hidden hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Do košíka
          </button>
        )}
      </div>
    </div>
  );
}
