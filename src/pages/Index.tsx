import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, RotateCcw, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { useCategories, useFeaturedProducts, useProducts } from '@/hooks/useProducts';
import { SEO } from '@/components/seo/SEO';

const FEATURES = [
  { icon: Truck, title: 'Doprava zadarmo', desc: 'Pri objednávke nad 49 €' },
  { icon: Shield, title: 'Záruka 2 roky', desc: 'Na všetky produkty' },
  { icon: Headphones, title: 'Podpora 7/7', desc: 'Radi vám poradíme' },
  { icon: RotateCcw, title: '30 dní na vrátenie', desc: 'Bez komplikácií' },
];

export default function Index() {
  const { data: categories = [] } = useCategories();
  const { data: featuredProducts = [] } = useFeaturedProducts(8);
  const { data: allProducts = [] } = useProducts();

  const newProducts = allProducts.slice(10, 18);

  return (
    <Layout>
      <SEO
        title="Homespark | Prémiový domov a bývanie"
        description="Smart home, dizajnové osvetlenie a moderné bytové doplnky. Rýchle doručenie po celom Slovensku."
        canonical="/"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero-section">
        <div className="section-container py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Sparkles className="h-4 w-4" />
                Nová kolekcia 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tight">
                Štýlový domov
                <span className="block text-gradient mt-1">začína tu.</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Objavte starostlivo vybrané smart zariadenia, dizajnové svietidlá
                a prémiové doplnky pre váš moderný domov.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/kategoria/vsetko" className="btn-premium text-base">
                  Preskúmať kolekciu
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/kategoria/smart home"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wider uppercase rounded-xl border-2 border-foreground/10 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  Smart Home
                  <Zap className="h-4 w-4" />
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground ml-1">4.9</span>
                </div>
                <span className="h-4 w-px bg-border" />
                <span>2 000+ spokojných zákazníkov</span>
              </div>
            </div>

            {/* Right — Featured products preview */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-slide-up">
              {featuredProducts.slice(0, 4).map((product, i) => (
                <Link
                  key={product.id}
                  to={`/produkt/${product.slug}`}
                  className={`group relative bg-white dark:bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    i === 0 ? 'row-span-2' : ''
                  }`}
                >
                  <div className={`${i === 0 ? 'aspect-[3/4]' : 'aspect-square'} bg-muted/30 flex items-center justify-center p-4`}>
                    {product.image?.url ? (
                      <img
                        src={product.image.url}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-6xl opacity-30">📦</div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-card dark:via-card/95">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
                    <p className="font-display font-semibold text-sm mt-1 line-clamp-1">{product.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES BAR ═══════════════ */}
      <section className="border-y bg-card/50">
        <div className="section-container py-6 md:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="shrink-0 p-3 rounded-xl bg-primary/8">
                  <f.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="section-container py-14 md:py-20 animate-fade-in">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Prehľadávajte</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Kategórie</h2>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex text-sm font-semibold hover:text-primary transition-colors">
            <Link to="/kategoria/vsetko">
              Všetky produkty
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

      {/* ═══════════════ PROMO BANNER ═══════════════ */}
      <section className="section-container pb-14 md:pb-20">
        <div className="promo-banner">
          <div className="relative z-10 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-2">Limitovaná akcia</p>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Zľavy až 20 % na Smart Home
              </h3>
              <p className="mt-3 text-white/80 max-w-md text-lg">
                Inteligentná domácnosť nemusí byť drahá. Objavte naše najlepšie smart produkty.
              </p>
            </div>
            <Link
              to="/kategoria/smart home"
              className="mt-8 md:mt-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Nakupovať teraz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ BESTSELLERS ═══════════════ */}
      <section className="section-container pb-14 md:pb-20 animate-slide-up">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Najobľúbenejšie</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Bestsellery</h2>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex text-sm font-semibold hover:text-primary transition-colors">
            <Link to="/kategoria/vsetko?sort=popularity">
              Zobraziť všetko
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

      {/* ═══════════════ NOVINKY ═══════════════ */}
      <section className="bg-muted/40">
        <div className="section-container py-14 md:py-20 animate-slide-up">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Čerstvé v ponuke</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Novinky</h2>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-sm font-semibold hover:text-primary transition-colors">
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
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="section-container py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Newsletter</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Nepremeškajte žiadnu ponuku
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Prihláste sa na odber a získajte zľavu <strong className="text-foreground">10 %</strong> na prvý nákup.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Váš e-mail"
              className="flex-1 px-5 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            <button className="btn-premium rounded-xl px-6">
              Odoberať
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Žiadny spam. Odhlásiť sa môžete kedykoľvek.
          </p>
        </div>
      </section>

    </Layout>
  );
}
