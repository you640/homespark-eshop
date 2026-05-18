import { Link } from 'react-router-dom';
import { User, Package, Heart } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Account() {
  const { user, signOut } = useAuth();

  return (
    <Layout>
      <SEO title="Môj účet" noIndex />
      <div className="section-container py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Môj účet</h1>

        {!user ? (
          <div className="mt-8 max-w-lg rounded-xl border bg-card p-6">
            <User className="h-10 w-10 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Prihláste sa do svojho účtu</h2>
            <p className="mt-2 text-muted-foreground">
              Po prihlásení budete mať rýchly prístup k objednávkam a obľúbeným produktom.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link to="/prihlasenie">Prihlásiť sa</Link></Button>
              <Button variant="outline" asChild><Link to="/registracia">Registrovať sa</Link></Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 md:col-span-3">
              <p className="text-sm text-muted-foreground">Prihlásený účet</p>
              <p className="mt-1 font-semibold">{user.email}</p>
              <Button variant="outline" className="mt-4" onClick={() => signOut()}>
                Odhlásiť sa
              </Button>
            </div>
            <Button variant="outline" className="h-auto justify-start gap-3 p-5" asChild>
              <Link to="/ucet/objednavky">
                <Package className="h-5 w-5" />
                Moje objednávky
              </Link>
            </Button>
            <Button variant="outline" className="h-auto justify-start gap-3 p-5" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                Zoznam želaní
              </Link>
            </Button>
            <Button variant="outline" className="h-auto justify-start gap-3 p-5" asChild>
              <Link to="/kosik">Nákupný košík</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
