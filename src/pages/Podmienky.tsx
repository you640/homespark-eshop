import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';

export default function Podmienky() {
  return (
    <Layout>
      <SEO title="Obchodné podmienky" canonical="/podmienky" />
      <div className="section-container py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Všeobecné obchodné podmienky</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Úvodné ustanovenia</h2>
            <p>
              Tieto všeobecné obchodné podmienky (ďalej len „VOP“) upravujú práva a povinnosti medzi spoločnosťou 
              <strong> EB-EU s. r. o.</strong>, so sídlom Kukučínova 22, 974 01 Banská Bystrica, IČO: 51 226 511 (ďalej len „Predávajúci“) 
              a kupujúcim pri predaji tovaru prostredníctvom internetového obchodu Homespark.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. Objednávka a kúpna zmluva</h2>
            <p>
              Kupujúci objednáva tovar prostredníctvom e-shopu. Odoslaním objednávky kupujúci potvrdzuje, že sa oboznámil 
              s týmito VOP a súhlasí s nimi. Kúpna zmluva vzniká potvrdením objednávky zo strany Predávajúceho.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. Ceny a platobné podmienky</h2>
            <p>
              Všetky ceny v e-shope sú uvádzané vrátane DPH. Predávajúci si vyhradzuje právo na zmenu cien. 
              Kupujúci môže platiť prostredníctvom platobnej brány Stripe (kreditné karty, Apple Pay, Google Pay) 
              alebo inými dostupnými metódami v košíku.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Dodacie podmienky</h2>
            <p>
              Predávajúci dodáva tovar v rámci Slovenskej republiky. Doprava je zadarmo pri objednávke nad 49€. 
              Dodacia lehota je zvyčajne 2-5 pracovných dní, ak nie je uvedené inak.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Odstúpenie od zmluvy</h2>
            <p>
              Spotrebiteľ má právo odstúpiť od zmluvy bez udania dôvodu v lehote 14 dní od prevzatia tovaru. 
              Homespark rozširuje túto lehotu na <strong>30 dní</strong> pre vybrané produkty. Tovar musí byť vrátený 
              nepoužitý a v pôvodnom obale.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">6. Reklamácie a záruka</h2>
            <p>
              Na všetok tovar sa vzťahuje zákonná záručná doba 24 mesiacov. Reklamácie sa vybavujú v súlade s Reklamačným poriadkom 
              Predávajúceho a platnými právnymi predpismi SR.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
