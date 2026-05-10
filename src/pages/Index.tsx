import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/categories/CategoryCard';
import type { Category, Product, ProductVariant, ProductImage } from '@/lib/types';
import heroBanner from '@/assets/hero-banner.jpg';

// Demo categories
const DEMO_CATEGORIES: Category[] = [
  { id: '1', name: 'Nábytok', slug: 'nabytok', description: 'Kvalitný nábytok pre každú izbu', image_url: null, parent_id: null, sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', name: 'Dlažba a podlahy', slug: 'dlazba-podlahy', description: 'Podlahové krytiny a dlažba', image_url: null, parent_id: null, sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', name: 'Kúpeľne', slug: 'kupelne', description: 'Vybavenie kúpeľní', image_url: null, parent_id: null, sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', name: 'Dvere', slug: 'dvere', description: 'Interiérové a vchodové dvere', image_url: null, parent_id: null, sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', name: 'Kúrenie', slug: 'kurenie', description: 'Vykurovacie systémy', image_url: null, parent_id: null, sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', name: 'Záhrada', slug: 'zahrada', description: 'Záhradný nábytok a náradie', image_url: null, parent_id: null, sort_order: 6, is_active: true, created_at: '', updated_at: '' },
];

// Demo products
const DEMO_PRODUCTS: (Product & { variant: ProductVariant; image: ProductImage })[] = [
  {
    id: '1', name: 'Rohová sedačka VIENNA', slug: 'rohova-sedacka-vienna', description: '', short_description: 'Moderná rohová sedačka', category_id: '1', brand: 'HomeLux', price_from: 899, currency: 'EUR', rating: 4.8, rating_count: 124, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v1', product_id: '1', sku: 'VIE-001', title: 'Sivá', price: 899, compare_at_price: 1199, stock: 5, attributes: { color: 'Sivá' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i1', product_id: '1', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', alt_text: 'Rohová sedačka', sort_order: 0, created_at: '' }
  },
  {
    id: '2', name: 'Jedálenský stôl NORDIC', slug: 'jedalensky-stol-nordic', description: '', short_description: 'Dubový jedálenský stôl', category_id: '1', brand: 'WoodCraft', price_from: 449, currency: 'EUR', rating: 4.6, rating_count: 89, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v2', product_id: '2', sku: 'NOR-001', title: 'Dub', price: 449, compare_at_price: null, stock: 12, attributes: { color: 'Dub' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i2', product_id: '2', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600', alt_text: 'Jedálenský stôl', sort_order: 0, created_at: '' }
  },
  {
    id: '3', name: 'Laminátová podlaha DUB RUSTIKÁLNY', slug: 'laminatova-podlaha-dub', description: '', short_description: '8mm laminát, AC4', category_id: '2', brand: 'FloorMaster', price_from: 12.99, currency: 'EUR', rating: 4.5, rating_count: 256, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v3', product_id: '3', sku: 'LAM-001', title: 'Rustikálny dub', price: 12.99, compare_at_price: 16.99, stock: 500, attributes: { material: 'Laminát' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i3', product_id: '3', url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=600', alt_text: 'Laminátová podlaha', sort_order: 0, created_at: '' }
  },
  {
    id: '4', name: 'Sprchový kút MODERN 90x90', slug: 'sprchovy-kut-modern', description: '', short_description: 'Bezrámový sprchový kút', category_id: '3', brand: 'AquaDesign', price_from: 329, currency: 'EUR', rating: 4.7, rating_count: 67, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v4', product_id: '4', sku: 'SPR-001', title: '90x90 cm', price: 329, compare_at_price: 399, stock: 8, attributes: { size: '90x90 cm' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i4', product_id: '4', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600', alt_text: 'Sprchový kút', sort_order: 0, created_at: '' }
  },
  {
    id: '5', name: 'Záhradný set BALI', slug: 'zahradny-set-bali', description: '', short_description: 'Ratanový záhradný nábytok', category_id: '6', brand: 'GardenPro', price_from: 699, currency: 'EUR', rating: 4.9, rating_count: 45, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v5', product_id: '5', sku: 'BAL-001', title: 'Hnedá', price: 699, compare_at_price: 899, stock: 3, attributes: { color: 'Hnedá' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i5', product_id: '5', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600', alt_text: 'Záhradný set', sort_order: 0, created_at: '' }
  },
  {
    id: '6', name: 'Interiérové dvere HARMONY', slug: 'interierove-dvere-harmony', description: '', short_description: 'Biele lakované dvere', category_id: '4', brand: 'DoorStyle', price_from: 159, currency: 'EUR', rating: 4.4, rating_count: 112, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v6', product_id: '6', sku: 'HAR-001', title: 'Biela 80cm', price: 159, compare_at_price: null, stock: 25, attributes: { color: 'Biela', size: '80 cm' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i6', product_id: '6', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt_text: 'Interiérové dvere', sort_order: 0, created_at: '' }
  },
  {
    id: '7', name: 'Radiátor ELEGANCE 600x1000', slug: 'radiator-elegance', description: '', short_description: 'Dizajnový rebríkový radiátor', category_id: '5', brand: 'HeatMax', price_from: 189, currency: 'EUR', rating: 4.6, rating_count: 78, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v7', product_id: '7', sku: 'RAD-001', title: 'Biela', price: 189, compare_at_price: 229, stock: 15, attributes: { color: 'Biela' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i7', product_id: '7', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', alt_text: 'Radiátor', sort_order: 0, created_at: '' }
  },
  {
    id: '8', name: 'Elektrická vŕtačka PRO 800W', slug: 'elektricka-vrtacka-pro', description: '', short_description: 'Príklepová vŕtačka', category_id: '7', brand: 'ToolMaster', price_from: 79, currency: 'EUR', rating: 4.7, rating_count: 203, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '',
    variant: { id: 'v8', product_id: '8', sku: 'VRT-001', title: 'Štandard', price: 79, compare_at_price: 99, stock: 42, attributes: {}, is_active: true, sort_order: 0, created_at: '', updated_at: '' },
    image: { id: 'i8', product_id: '8', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600', alt_text: 'Elektrická vŕtačka', sort_order: 0, created_at: '' }
  },
];

const FEATURES = [
  { icon: Truck, title: 'Doprava zadarmo', description: 'Pri objednávke nad 49€' },
  { icon: Shield, title: 'Záruka kvality', description: '2 roky na všetky produkty' },
  { icon: Headphones, title: 'Zákaznícka podpora', description: 'K dispozícii 7 dní v týždni' },
  { icon: RotateCcw, title: 'Vrátenie do 30 dní', description: 'Bez komplikácií' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        </div>
        
        <div className="relative section-container py-16 md:py-24">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-6 animate-fade-in">
              🎉 Novoročný výpredaj - zľavy až 50%
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-background leading-tight animate-slide-up">
              Všetko pre váš
              <span className="text-primary"> dokonalý domov</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-background/80 leading-relaxed animate-slide-up">
              Kvalitný nábytok, podlahy, kúpeľne a záhradné vybavenie. 
              Tisíce produktov za najlepšie ceny s dopravou zadarmo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-slide-up">
              <Link to="/kategoria/vsetko" className="btn-hero">
                Nakupovať
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-background/30 text-background hover:bg-background/10 px-8"
              >
                <Link to="/spravy">
                  Inšpirácie & tipy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-card border-y">
        <div className="section-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="shrink-0 p-3 rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Kategórie produktov
            </h2>
            <p className="text-muted-foreground mt-1">Nájdite všetko čo potrebujete</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link to="/kategoria/vsetko">
              Všetky kategórie
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="categories-grid">
          {DEMO_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="section-container pb-12 md:pb-16">
        <div className="promo-block text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              ⚡ Blesková akcia na nábytok
            </h3>
            <p className="mt-2 text-primary-foreground/90 max-w-md">
              Až 40% zľava na vybraný nábytok do obývačky. Platí len tento víkend!
            </p>
          </div>
          <Button 
            size="lg" 
            variant="secondary" 
            asChild
            className="mt-6 md:mt-0 font-semibold"
          >
            <Link to="/kategoria/nabytok?akcia=true">
              Zobraziť akcie
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-container pb-12 md:pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Najpredávanejšie produkty
            </h2>
            <p className="text-muted-foreground mt-1">To najlepšie od nás</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link to="/kategoria/vsetko?sort=popularity">
              Všetky bestsellery
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="products-grid">
          {DEMO_PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant={product.variant}
              image={product.image}
            />
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-muted">
        <div className="section-container py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Nepremeškajte žiadnu akciu
          </h2>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
            Prihláste sa na odber noviniek a získajte 10% zľavu na prvý nákup
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Váš e-mail"
              className="flex-1 px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" className="font-semibold">
              Prihlásiť sa
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Notice */}
      <section className="bg-foreground/5 border-t">
        <div className="section-container py-8 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>BrickHaus Eshop (Demo)</strong> - Toto je demo verzia e-shopu. 
            Pre testovanie admin panelu použite: <code className="bg-muted px-2 py-1 rounded">admin@demo.sk</code> / <code className="bg-muted px-2 py-1 rounded">demo123</code>
          </p>
        </div>
      </section>
    </Layout>
  );
}
