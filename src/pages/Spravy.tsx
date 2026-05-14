import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';

export default function Spravy() {
  return (
    <Layout>
      <Helmet>
        <title>Inšpirácie & Tipy – MerkuryMarket</title>
      </Helmet>
      <div className="section-container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Inšpirácie & Tipy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Objavte svet bývania s MerkuryMarket. Pripravujeme pre vás tie najlepšie rady pre váš domov.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-3xl overflow-hidden animate-scale-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="aspect-video bg-muted flex items-center justify-center text-4xl">
                {['🏠', '🛁', '🌿'][i-1]}
              </div>
              <div className="p-8">
                <div className="h-2 w-20 bg-primary/20 rounded-full mb-4"></div>
                <div className="h-6 w-full bg-muted/60 rounded-lg mb-3"></div>
                <div className="h-6 w-2/3 bg-muted/60 rounded-lg mb-6"></div>
                <div className="h-4 w-full bg-muted/30 rounded-lg mb-2"></div>
                <div className="h-4 w-4/5 bg-muted/30 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
