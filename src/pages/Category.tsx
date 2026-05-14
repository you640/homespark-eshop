import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Grid3X3, Grid2X2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { SORT_OPTIONS } from '@/lib/types';
import { useProducts } from '@/hooks/useProducts';
import { cn } from '@/lib/utils';

const CATEGORY_NAMES: Record<string, string> = {
  'vsetko': 'Všetky produkty',
  'nabytok': 'Nábytok',
  'dlazba-podlahy': 'Dlažba a podlahy',
  'kupelne': 'Kúpeľne',
  'dvere': 'Dvere',
  'kurenie': 'Kúrenie',
  'zahrada': 'Záhrada',
  'naradie': 'Náradie',
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState('popularity');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const categoryName = CATEGORY_NAMES[slug || 'vsetko'] || 'Produkty';
  const { data: products = [], isLoading } = useProducts(slug);

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean) as string[])).sort(),
    [products]
  );

  const filteredProducts = products.filter((product) => {
    if (inStockOnly && (product.variant?.stock ?? 0) === 0) return false;
    if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) return false;
    if (product.price_from < priceRange[0] || product.price_from > priceRange[1]) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.price_from - b.price_from;
      case 'price_desc': return b.price_from - a.price_from;
      case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'rating': return b.rating - a.rating;
      default: return b.rating_count - a.rating_count;
    }
  });


  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price range */}
      <div className="filter-section">
        <h3 className="font-semibold mb-4">Cena</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={5000}
          step={10}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{priceRange[0]}€</span>
          <span>{priceRange[1]}€</span>
        </div>
      </div>

      {/* Brands */}
      <div className="filter-section">
        <h3 className="font-semibold mb-4">Značka</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                  }
                }}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="filter-section border-b-0">
        <h3 className="font-semibold mb-4">Dostupnosť</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <span className="text-sm">Iba skladom</span>
        </label>
      </div>

      {/* Clear filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPriceRange([0, 2000]);
          setSelectedBrands([]);
          setInStockOnly(false);
        }}
      >
        Vymazať filtre
      </Button>
    </div>
  );

  return (
    <Layout>
      <Helmet>
        <title>{`${categoryName} – MerkuryMarket`}</title>
        <meta name="description" content={`${categoryName} v MerkuryMarket. Kvalita za skvelé ceny, doprava zadarmo nad 49€.`} />
        <link rel="canonical" href={`https://abode-forge-store.lovable.app/kategoria/${slug ?? 'vsetko'}`} />
      </Helmet>
      <div className="section-container py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Domov</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{categoryName}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-display font-bold mb-6">Filtre</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold">{categoryName}</h1>
                <p className="text-muted-foreground mt-1">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'produkt' : sortedProducts.length < 5 ? 'produkty' : 'produktov'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtre
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtre</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Zoradiť" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Grid toggle - desktop */}
                <div className="hidden md:flex items-center border rounded-lg">
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      'p-2 transition-colors',
                      gridCols === 3 ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                    aria-label="3 stĺpce"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={cn(
                      'p-2 transition-colors',
                      gridCols === 4 ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                    aria-label="4 stĺpce"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className={cn(
                'grid gap-4 md:gap-6',
                gridCols === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              )}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={product.variant}
                    image={product.image}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  Žiadne produkty nezodpovedajú vašim filtrom.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedBrands([]);
                    setInStockOnly(false);
                  }}
                >
                  Vymazať filtre
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
