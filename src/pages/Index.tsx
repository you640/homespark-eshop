import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { useCategories, useFeaturedProducts, useProducts } from '@/hooks/useProducts';
import { SEO } from '@/components/seo/SEO';

const FEATURES = [
  { icon: Truck, title: 'Doprava zadarmo', description: 'Pri objednávke nad 49€' },
  { icon: Shield, title: 'Záruka kvality', description: '2 roky na všetky produkty' },
  { icon: Headphones, title: 'Zákaznícka podpora', description: 'K dispozícii 7 dní v týždni' },
  { icon: RotateCcw, title: 'Vrátenie do 30 dní', description: 'Bez komplikácií' },
];

export default function Index() {
  const { data: categories = [] } = useCategories();
  const { data: featuredProducts = [] } = useFeaturedProducts(8);
  const { data: allProducts = [] } = useProducts();
  
  // Simulated new products (just taking a different slice)
  const newProducts = allProducts.slice(10, 18);

  return (
    <Layout>
      <SEO 
        title="Homespark | Prémiový domov a bývanie" 
        description="Kvalitný nábytok, smart home, dizajnové osvetlenie a dekorácie za skvelé ceny."
        canonical="/"
      />

      {/* Features Bar */}
      <section className="bg-card border-y">
        <div className="section-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3 group">
                <div className="shrink-0 p-3 rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-current" />
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
      <section className="section-container py-12 md:py-16 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Kategórie produktov
            </h2>
            <p className="text-muted-foreground mt-1">Nájdite všetko čo potrebujete</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex hover:bg-primary/10 hover:text-primary transition-colors">
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
      <section className="section-container pb-12 md:pb-16 animate-slide-up">
        <div className="promo-block glass text-center md:text-left md:flex md:items-center md:justify-between !bg-gradient-to-r !from-primary !to-amber-500 shadow-2xl">
          <div className="text-primary-foreground">
            <h3 className="text-2xl md:text-4xl font-display font-bold">
              ⚡ Luxusné bývanie s Homespark
            </h3>
            <p className="mt-3 text-primary-foreground/90 max-w-lg text-lg">
              Prémiové dekorácie a smart doplnky pre váš domov s rýchlym doručením.
            </p>
          </div>
          <button 
            className="mt-6 md:mt-0 font-semibold bg-white text-primary px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            <Link to="/kategoria/vsetko" className="flex items-center">
              Zobraziť ponuku
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </button>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-container pb-12 md:pb-16 animate-slide-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Najpredávanejšie produkty (Bestsellers)
            </h2>
            <p className="text-muted-foreground mt-1">To najlepšie a najžiadanejšie od nás</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex hover:bg-primary/10 hover:text-primary transition-colors">
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

      {/* Novinky */}
      <section className="section-container pb-12 md:pb-16 animate-slide-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Horúce novinky
            </h2>
            <p className="text-muted-foreground mt-1">Najnovšie trendy pre váš interiér</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex hover:bg-primary/10 hover:text-primary transition-colors">
            <Link to="/kategoria/vsetko?sort=newest">
              Všetky novinky
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="products-grid">
          {newProducts.map((product) => (
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
      <section className="bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1000x1000/000000/333333?text=Pattern')] bg-repeat opacity-5"></div>
        <div className="section-container py-16 md:py-24 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Nepremeškajte žiadnu exkluzívnu ponuku
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Prihláste sa na odber noviniek a získajte zľavu 10% na váš prvý nákup na Homespark.sk
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Váš e-mail"
              className="flex-1 px-5 py-4 rounded-full border-0 glass bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
            />
            <button className="btn-premium px-8 rounded-full">
              Prihlásiť sa
            </button>
          </div>
        </div>
      </section>

    </Layout>
  );
}
