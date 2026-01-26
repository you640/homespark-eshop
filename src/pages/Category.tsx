import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Filter, Grid3X3, Grid2X2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { SORT_OPTIONS } from '@/lib/types';
import type { Product, ProductVariant, ProductImage, Category } from '@/lib/types';
import { cn } from '@/lib/utils';

// Demo data matching homepage
const DEMO_PRODUCTS: (Product & { variant: ProductVariant; image: ProductImage })[] = [
  { id: '1', name: 'Rohová sedačka VIENNA', slug: 'rohova-sedacka-vienna', description: '', short_description: 'Moderná rohová sedačka', category_id: '1', brand: 'HomeLux', price_from: 899, currency: 'EUR', rating: 4.8, rating_count: 124, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v1', product_id: '1', sku: 'VIE-001', title: 'Sivá', price: 899, compare_at_price: 1199, stock: 5, attributes: { color: 'Sivá' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i1', product_id: '1', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', alt_text: 'Rohová sedačka', sort_order: 0, created_at: '' } },
  { id: '2', name: 'Jedálenský stôl NORDIC', slug: 'jedalensky-stol-nordic', description: '', short_description: 'Dubový jedálenský stôl', category_id: '1', brand: 'WoodCraft', price_from: 449, currency: 'EUR', rating: 4.6, rating_count: 89, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v2', product_id: '2', sku: 'NOR-001', title: 'Dub', price: 449, compare_at_price: null, stock: 12, attributes: { color: 'Dub' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i2', product_id: '2', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600', alt_text: 'Jedálenský stôl', sort_order: 0, created_at: '' } },
  { id: '3', name: 'Laminátová podlaha DUB RUSTIKÁLNY', slug: 'laminatova-podlaha-dub', description: '', short_description: '8mm laminát, AC4', category_id: '2', brand: 'FloorMaster', price_from: 12.99, currency: 'EUR', rating: 4.5, rating_count: 256, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v3', product_id: '3', sku: 'LAM-001', title: 'Rustikálny dub', price: 12.99, compare_at_price: 16.99, stock: 500, attributes: { material: 'Laminát' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i3', product_id: '3', url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=600', alt_text: 'Laminátová podlaha', sort_order: 0, created_at: '' } },
  { id: '4', name: 'Sprchový kút MODERN 90x90', slug: 'sprchovy-kut-modern', description: '', short_description: 'Bezrámový sprchový kút', category_id: '3', brand: 'AquaDesign', price_from: 329, currency: 'EUR', rating: 4.7, rating_count: 67, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v4', product_id: '4', sku: 'SPR-001', title: '90x90 cm', price: 329, compare_at_price: 399, stock: 8, attributes: { size: '90x90 cm' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i4', product_id: '4', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600', alt_text: 'Sprchový kút', sort_order: 0, created_at: '' } },
  { id: '5', name: 'Záhradný set BALI', slug: 'zahradny-set-bali', description: '', short_description: 'Ratanový záhradný nábytok', category_id: '6', brand: 'GardenPro', price_from: 699, currency: 'EUR', rating: 4.9, rating_count: 45, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v5', product_id: '5', sku: 'BAL-001', title: 'Hnedá', price: 699, compare_at_price: 899, stock: 3, attributes: { color: 'Hnedá' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i5', product_id: '5', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600', alt_text: 'Záhradný set', sort_order: 0, created_at: '' } },
  { id: '6', name: 'Interiérové dvere HARMONY', slug: 'interierove-dvere-harmony', description: '', short_description: 'Biele lakované dvere', category_id: '4', brand: 'DoorStyle', price_from: 159, currency: 'EUR', rating: 4.4, rating_count: 112, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v6', product_id: '6', sku: 'HAR-001', title: 'Biela 80cm', price: 159, compare_at_price: null, stock: 25, attributes: { color: 'Biela', size: '80 cm' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i6', product_id: '6', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt_text: 'Interiérové dvere', sort_order: 0, created_at: '' } },
  { id: '7', name: 'Radiátor ELEGANCE 600x1000', slug: 'radiator-elegance', description: '', short_description: 'Dizajnový rebríkový radiátor', category_id: '5', brand: 'HeatMax', price_from: 189, currency: 'EUR', rating: 4.6, rating_count: 78, is_active: true, is_featured: false, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v7', product_id: '7', sku: 'RAD-001', title: 'Biela', price: 189, compare_at_price: 229, stock: 15, attributes: { color: 'Biela' }, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i7', product_id: '7', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', alt_text: 'Radiátor', sort_order: 0, created_at: '' } },
  { id: '8', name: 'Elektrická vŕtačka PRO 800W', slug: 'elektricka-vrtacka-pro', description: '', short_description: 'Príklepová vŕtačka', category_id: '7', brand: 'ToolMaster', price_from: 79, currency: 'EUR', rating: 4.7, rating_count: 203, is_active: true, is_featured: true, meta_title: null, meta_description: null, created_at: '', updated_at: '', variant: { id: 'v8', product_id: '8', sku: 'VRT-001', title: 'Štandard', price: 79, compare_at_price: 99, stock: 42, attributes: {}, is_active: true, sort_order: 0, created_at: '', updated_at: '' }, image: { id: 'i8', product_id: '8', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600', alt_text: 'Elektrická vŕtačka', sort_order: 0, created_at: '' } },
];

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

const BRANDS = ['HomeLux', 'WoodCraft', 'FloorMaster', 'AquaDesign', 'GardenPro', 'DoorStyle', 'HeatMax', 'ToolMaster'];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState('popularity');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const categoryName = CATEGORY_NAMES[slug || 'vsetko'] || 'Produkty';

  // Filter products
  const filteredProducts = DEMO_PRODUCTS.filter(product => {
    if (inStockOnly && product.variant.stock === 0) return false;
    if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) return false;
    if (product.price_from < priceRange[0] || product.price_from > priceRange[1]) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price_from - b.price_from;
      case 'price_desc':
        return b.price_from - a.price_from;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.rating_count - a.rating_count; // popularity
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
          max={2000}
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
          {BRANDS.map((brand) => (
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
            {sortedProducts.length > 0 ? (
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
