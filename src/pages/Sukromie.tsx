import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';

export default function Sukromie() {
  return (
    <Layout>
      <Helmet>
        <title>Ochrana súkromia – MerkuryMarket</title>
      </Helmet>
      <div className="section-container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Ochrana osobných údajov</h1>
        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Prevádzkovateľ</h2>
            <p>Vaše osobné údaje spracúva spoločnosť:</p>
            <ul className="list-none pl-0 mt-2 space-y-1">
              <li><strong>Obchodné meno:</strong> KsiX s.r.o.</li>
              <li><strong>Sídlo:</strong> Lužná 5, 851 04 Bratislava - mestská časť Petržalka</li>
              <li><strong>IČO:</strong> 51907518</li>
              <li><strong>DIČ:</strong> 2120826686</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Účel spracovania</h2>
            <p>Osobné údaje spracúvame za účelom vybavenia objednávok, marketingu a analýzy návštevnosti...</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
