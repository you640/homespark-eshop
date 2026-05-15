import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories, useFeaturedProducts } from '@/hooks/useProducts';
import heroBanner from '@/assets/hero-banner.jpg';

const FEATURES = [
  { icon: Truck, title: 'Doprava zadarmo', description: 'Pri objednávke nad 49€' },
  { icon: Shield, title: 'Záruka kvality', description: '2 roky na všetky produkty' },
  { icon: Headphones, title: 'Zákaznícka podpora', description: 'K dispozícii 7 dní v týždni' },
  { icon: RotateCcw, title: 'Vrátenie do 30 dní', description: 'Bez komplikácií' },
];

export default function Index() {
  const { data: categories = [] } = useCategories();
  const { data: featuredProducts = [] } = useFeaturedProducts(8);

  return (
    <Layout>
      <Helmet>
        <title>MerkuryMarket – Všetko pre váš domov</title>
        <meta name="description" content="Kvalitný nábytok, podlahy, kúpeľne a záhradné vybavenie za skvelé ceny. Doprava zadarmo nad 49€." />
        <link rel="canonical" href="https://www.merkurymarket.sk/" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        </div>
        
        <div className="relative section-container py-10 md:py-16">
          <div className="max-w-md glass p-6 md:p-8 rounded-2xl animate-scale-in">
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              Kvalitný nábytok, podlahy, kúpeľne a záhradné vybavenie. 
              Tisíce produktov za najlepšie ceny s dopravou zadarmo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/kategoria/vsetko" className="btn-hero py-2 px-5 text-sm shadow-md hover:shadow-primary/30">
                Nakupovať
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary px-5 h-9"
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
          {categories.map((category) => (
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
          {featuredProducts.map((product) => (
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

    </Layout>
  );
}
