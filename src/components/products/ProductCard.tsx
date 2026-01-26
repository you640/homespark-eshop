import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product, ProductVariant, ProductImage } from '@/lib/types';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  variant?: ProductVariant;
  image?: ProductImage;
  className?: string;
}

export function ProductCard({ product, variant, image, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const price = variant?.price ?? product.price_from;
  const comparePrice = variant?.compare_at_price;
  const hasDiscount = comparePrice && comparePrice > price;
  const discountPercent = hasDiscount ? getDiscountPercentage(comparePrice, price) : 0;
  const inStock = variant ? variant.stock > 0 : true;

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
      action: {
        label: 'Zobraziť košík',
        onClick: () => window.location.href = '/kosik',
      },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Pridané do zoznamu želaní');
  };

  return (
    <Link 
      to={`/produkt/${product.slug}`}
      className={cn('product-card group block', className)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {image?.url ? (
          <img
            src={image.url}
            alt={image.alt_text || product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted">
            <span className="text-4xl text-muted-foreground/30">📦</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="badge-sale">-{discountPercent}%</span>
          )}
          {product.is_featured && (
            <span className="badge-new">Novinka</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
          aria-label="Pridať do zoznamu želaní"
        >
          <Heart className="h-5 w-5" />
        </button>

        {/* Quick add button - desktop only */}
        {variant && inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform hidden md:block">
            <Button 
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Do košíka
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}

        {/* Name */}
        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({product.rating_count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2 flex-wrap">
          <span className="price-current">{formatPrice(price)}</span>
          {hasDiscount && (
            <span className="price-original">{formatPrice(comparePrice)}</span>
          )}
        </div>

        {/* Stock status */}
        {!inStock && (
          <Badge variant="outline" className="mt-2 text-destructive border-destructive">
            Vypredané
          </Badge>
        )}

        {/* Mobile add button */}
        {variant && inStock && (
          <Button 
            onClick={handleAddToCart}
            className="w-full mt-3 md:hidden"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Do košíka
          </Button>
        )}
      </div>
    </Link>
  );
}
