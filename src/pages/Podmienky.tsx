import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';

export default function Podmienky() {
  return (
    <Layout>
      <Helmet>
        <title>Obchodné podmienky – MerkuryMarket</title>
      </Helmet>
      <div className="section-container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Obchodné podmienky</h1>
        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Identifikácia prevádzkovateľa</h2>
            <p>Tento e-shop prevádzkuje spoločnosť:</p>
            <ul className="list-none pl-0 mt-2 space-y-1">
              <li><strong>Obchodné meno:</strong> KsiX s.r.o.</li>
              <li><strong>Sídlo:</strong> Lužná 5, 851 04 Bratislava - mestská časť Petržalka</li>
              <li><strong>IČO:</strong> 51907518</li>
              <li><strong>DIČ:</strong> 2120826686</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Úvodné ustanovenia</h2>
            <p>Tieto obchodné podmienky upravujú práva a povinnosti medzi predávajúcim a kupujúcim v rámci online predaja tovaru...</p>
          </section>
          <p className="text-muted-foreground mt-12 text-sm italic">
            Poznámka: Toto je vzorová stránka. V reálnej prevádzke by tu mali byť kompletné právne texty.
          </p>
        </div>
      </div>
    </Layout>
  );
}
