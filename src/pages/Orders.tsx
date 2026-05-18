import { Link } from 'react-router-dom';
import { PackageCheck } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Orders() {
  const { user } = useAuth();

  return (
    <Layout>
      <SEO title="Moje objednávky" noIndex />
      <div className="section-container py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Moje objednávky</h1>
        <div className="mt-8 max-w-xl rounded-xl border bg-card p-6">
          <PackageCheck className="h-10 w-10 text-primary" />
          {user ? (
            <>
              <h2 className="mt-4 text-xl font-semibold">História objednávok</h2>
              <p className="mt-2 text-muted-foreground">
                Objednávky vytvorené po zapnutí produkčnej evidencie sa zobrazia tu.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/kategoria/vsetko">Pokračovať v nákupe</Link>
              </Button>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-xl font-semibold">Prihlásenie je potrebné</h2>
              <p className="mt-2 text-muted-foreground">
                Prihláste sa a získate prístup k svojim objednávkam.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/prihlasenie">Prihlásiť sa</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
