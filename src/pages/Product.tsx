import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { Helmet } from "react-helmet-async";
import { Loader2, ArrowLeft, Check, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { products as mockProducts } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";
import type { ProductVariant } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const SITE_URL = "https://homespark-eshop.vercel.app";

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState<typeof mockProducts[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      const p = mockProducts.find(p => p.id === slug);
      setProduct(p || null);
      setLoading(false);
    }, 400);
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Create a mock variant for the cart
    const variant: ProductVariant = {
      id: `var-${product.id}`,
      product_id: product.id,
      sku: product.id,
      title: 'Default',
      price: product.sellPrice,
      compare_at_price: Math.round(product.sellPrice * 1.2),
      stock: 50,
      attributes: {},
      is_active: true,
      sort_order: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Convert mock product to Cart expected product type
    const cartProduct = {
      ...product,
      price_from: product.sellPrice,
      brand: product.supplier,
    } as unknown as import('@/lib/types').Product;

    addItem(cartProduct, variant, 1);
    toast.success('Pridané do košíka', {
      description: product.name,
      action: { label: 'Zobraziť košík', onClick: () => (window.location.href = '/kosik') },
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-container py-24 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="section-container py-24 text-center glass rounded-2xl max-w-2xl mx-auto mt-12">
          <h1 className="text-3xl font-display font-bold mb-4">Produkt nenájdený</h1>
          <p className="text-muted-foreground mb-8">Ľutujeme, ale produkt, ktorý hľadáte, už nie je v ponuke alebo neexistuje.</p>
          <Button asChild className="btn-premium"><Link to="/">Späť na domov</Link></Button>
        </div>
      </Layout>
    );
  }

  const image = product.images?.[0];
  const canonical = `${SITE_URL}/produkt/${product.id}`;
  const desc = product.description;

  return (
    <Layout>
      <SEO 
        title={product.name} 
        description={desc}
        canonical={`/produkt/${product.id}`}
        ogImage={image}
        ogType="product"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: desc,
          ...(image ? { image: image } : {}),
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: product.sellPrice,
            availability: "https://schema.org/InStock",
            url: canonical,
          },
        })}</script>
      </Helmet>

      <div className="section-container py-8 md:py-12 animate-fade-in">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Späť do obchodu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Product Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-muted/20 rounded-3xl overflow-hidden glass p-4 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Bez obrázka
                </div>
              )}
            </div>
            
            {/* Thumbnails (mocked for now since we have placeholders) */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square bg-muted/20 rounded-xl overflow-hidden glass cursor-pointer border-2 border-transparent hover:border-primary transition-all">
                   <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">{product.supplier}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 fill-primary text-primary" />
                <Star className="h-5 w-5 fill-primary text-primary opacity-50" />
                <span className="text-sm font-medium ml-2">4.8 (124 recenzií)</span>
              </div>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <p className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                {formatPrice(product.sellPrice)}
              </p>
              <p className="text-xl text-muted-foreground line-through mb-1">
                {formatPrice(Math.round(product.sellPrice * 1.2))}
              </p>
              <Badge className="mb-2 bg-destructive text-destructive-foreground">Zľava 20%</Badge>
            </div>
            
            <div className="glass p-6 rounded-2xl mb-8">
              <h3 className="font-semibold mb-2">Popis produktu</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <ul className="space-y-3 mb-10 text-sm font-medium">
              <li className="flex items-center gap-3 text-foreground">
                <div className="p-1 rounded-full bg-green-500/10 text-green-500"><Check className="h-4 w-4" /></div>
                Skladom u dodávateľa ({product.supplier})
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <div className="p-1 rounded-full bg-green-500/10 text-green-500"><Check className="h-4 w-4" /></div>
                Doručenie do 3-5 pracovných dní
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <div className="p-1 rounded-full bg-green-500/10 text-green-500"><Check className="h-4 w-4" /></div>
                Záruka 24 mesiacov
              </li>
            </ul>

            <div className="mt-auto pt-8 border-t flex flex-col sm:flex-row gap-4">
              <button onClick={handleAddToCart} className="btn-premium flex-1 py-4 text-base">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Pridať do košíka
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
