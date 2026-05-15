import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';

export default function Sukromie() {
  return (
    <Layout>
      <SEO title="Ochrana osobných údajov" canonical="/sukromie" />
      <div className="section-container py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Ochrana osobných údajov (GDPR)</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Správca údajov</h2>
            <p>
              Správcom vašich osobných údajov je spoločnosť <strong>KsiX s.r.o.</strong>, so sídlom Lužná 5, 851 04 Bratislava, 
              IČO: 51907518 (ďalej len „Správca“).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. Účel spracovania</h2>
            <p>Vaše osobné údaje spracovávame za účelom:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Vybavenia vašej objednávky a plnenia kúpnej zmluvy.</li>
              <li>Zasielania noviniek a marketingových informácií (ak ste udelili súhlas).</li>
              <li>Zlepšovania našich služieb a zabezpečenia funkčnosti webu.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. Rozsah spracovávaných údajov</h2>
            <p>
              Spracovávame údaje potrebné k nákupu: meno, priezvisko, dodacia adresa, fakturačná adresa, e-mail, telefónne číslo 
              a informácie o vašich nákupoch.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Príjemcovia údajov</h2>
            <p>
              Vaše údaje poskytujeme len v nevyhnutnom rozsahu našim partnerom:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Doručovacie služby a kuriéri (pre dodanie tovaru).</li>
              <li>Poskytovatelia platobných služieb (Stripe).</li>
              <li>Poskytovatelia analytických a marketingových nástrojov.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Vaše práva</h2>
            <p>
              Máte právo na prístup k svojim údajom, právo na ich opravu, vymazanie („právo na zabudnutie“), právo na obmedzenie 
              spracovania a právo vzniesť námietku proti spracovaniu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">6. Cookies</h2>
            <p>
              Tento web používa súbory cookies na zlepšenie používateľského zážitku a analýzu návštevnosti. Nastavenia cookies 
              môžete zmeniť vo svojom prehliadači.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
