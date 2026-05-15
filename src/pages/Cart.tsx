import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout/Layout';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import { SEO } from '@/components/seo/SEO';

const FREE_SHIPPING_THRESHOLD = 49;

export default function Cart() {
  const { items, updateQuantity, removeItem, getCart, applyCoupon, removeCoupon } = useCartStore();
  const cart = getCart();
  const [couponInput, setCouponInput] = useState('');

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      toast.info('Produkt bol odstránený z košíka');
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    // Demo coupon validation
    if (couponInput.toUpperCase() === 'ZIMA2024') {
      applyCoupon('ZIMA2024', 10);
      toast.success('Kupón bol úspešne uplatnený!');
      setCouponInput('');
    } else if (couponInput.toUpperCase() === 'WELCOME10') {
      applyCoupon('WELCOME10', cart.subtotal * 0.1);
      toast.success('Kupón bol úspešne uplatnený!');
      setCouponInput('');
    } else {
      toast.error('Neplatný kupón');
    }
  };

  const progressToFreeShipping = Math.min((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cart.subtotal, 0);

  if (items.length === 0) {
    return (
      <Layout hideMobileCart>
        <div className="section-container py-16 md:py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Váš košík je prázdny
            </h1>
            <p className="text-muted-foreground mb-8">
              Vyzerá to, že ste ešte nič nepridali do košíka. Preskúmajte naše produkty a nájdite niečo pre seba!
            </p>
            <Button size="lg" asChild>
              <Link to="/">
                Začať nakupovať
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideMobileCart>
      <SEO title="Nákupný košík" noIndex={true} />
      <div className="section-container py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">
          Nákupný košík ({items.length} {items.length === 1 ? 'položka' : items.length < 5 ? 'položky' : 'položiek'})
        </h1>

        {/* Free shipping progress */}
        {cart.shipping > 0 && (
          <div className="mb-8 p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-5 w-5 text-primary" />
              <p className="font-medium">
                Do dopravy zadarmo vám chýba <strong>{formatPrice(amountToFreeShipping)}</strong>
              </p>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {cart.shipping === 0 && cart.subtotal > 0 && (
          <div className="mb-8 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3">
            <Truck className="h-5 w-5 text-success" />
            <p className="font-medium text-success">
              🎉 Máte dopravu zadarmo!
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-card rounded-xl border p-4 md:p-6 flex gap-4"
              >
                {/* Image */}
                <Link 
                  to={`/produkt/${item.product.slug}`}
                  className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted"
                >
                  {item.product.images?.[0]?.url ? (
                    <img 
                      src={item.product.images[0].url} 
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-3xl">📦</span>
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link 
                        to={`/produkt/${item.product.slug}`}
                        className="font-semibold hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.variant.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SKU: {item.variant.sku}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(item.id);
                        toast.info('Produkt bol odstránený');
                      }}
                      className="shrink-0 p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Odstrániť z košíka"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Znížiť množstvo"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Zvýšiť množstvo"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {formatPrice(item.variant.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.variant.price)} / ks
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Súhrn objednávky</h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Zľavový kupón</label>
                <div className="flex gap-2">
                  <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Kód kupónu"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Použiť
                  </Button>
                </div>
                {cart.couponCode && (
                  <div className="mt-2 flex items-center justify-between p-2 bg-success/10 rounded-lg">
                    <span className="text-sm text-success font-medium">
                      {cart.couponCode} uplatnený
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-destructive hover:underline"
                    >
                      Odstrániť
                    </button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Skúste: ZIMA2024, WELCOME10
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medzisúčet</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doprava</span>
                  <span className={cart.shipping === 0 ? 'text-success' : ''}>
                    {cart.shipping === 0 ? 'Zadarmo' : formatPrice(cart.shipping)}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Zľava</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Celkom</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>

              <Button size="lg" className="w-full mt-6" asChild>
                <Link to="/pokladna">
                  Pokračovať k platbe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Bezpečná platba • 30 dní na vrátenie
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
