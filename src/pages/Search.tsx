import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';

export default function Search() {
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim();
  const { data: products = [], isLoading } = useProducts();

  const results = useMemo(() => {
    const normalized = query.toLowerCase();
    if (!normalized) return [];

    return products.filter((product) =>
      [
        product.name,
        product.description,
        product.short_description,
        product.brand,
        product.category_id,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized))
    );
  }, [products, query]);

  return (
    <Layout>
      <SEO title={query ? `Vyhľadávanie: ${query}` : 'Vyhľadávanie'} noIndex />
      <div className="section-container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">Vyhľadávanie</h1>
          <p className="text-muted-foreground mt-2">
            {query
              ? `${isLoading ? 'Hľadám' : `${results.length} výsledkov`} pre výraz "${query}"`
              : 'Zadajte hľadaný výraz v hornom vyhľadávaní.'}
          </p>
        </div>

        {query && results.length > 0 && (
          <div className="products-grid">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={product.variant}
                image={product.image}
              />
            ))}
          </div>
        )}

        {query && !isLoading && results.length === 0 && (
          <div className="max-w-md rounded-xl border bg-card p-6 text-center">
            <SearchIcon className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 font-semibold">Nenašli sa žiadne produkty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Skúste kratší výraz alebo si prezrite všetky produkty.
            </p>
            <Button className="mt-5" asChild>
              <Link to="/kategoria/vsetko">Všetky produkty</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
