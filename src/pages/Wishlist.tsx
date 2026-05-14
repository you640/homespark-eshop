import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  return (
    <Layout>
      <Helmet>
        <title>Môj zoznam želaní – MerkuryMarket</title>
      </Helmet>
      <div className="section-container py-12 md:py-32 text-center">
        <div className="inline-flex p-6 bg-primary/5 rounded-full mb-8 animate-float">
          <Heart className="h-16 w-16 text-primary/40" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Váš zoznam želaní</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Zatiaľ tu nič nemáte. Uložte si produkty, ktoré vás zaujali, aby ste ich neskôr ľahšie našli.
        </p>
        <button 
          onClick={() => window.location.href = '/kategoria/vsetko'}
          className="btn-hero"
        >
          Začať nakupovať
        </button>
      </div>
    </Layout>
  );
}
