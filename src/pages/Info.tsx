import { Link } from 'react-router-dom';
import type { ComponentType, ReactNode } from 'react';
import { Mail, MapPin, Package, RotateCcw, Truck } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

export function About() {
  return (
    <InfoShell title="O nás">
      <p>
        Homespark vyberá smart home zariadenia, osvetlenie a bytové doplnky pre moderné bývanie.
      </p>
      <p>
        Sústreďujeme sa na jednoduchý výber, zrozumiteľné ceny a doručenie po celom Slovensku.
      </p>
    </InfoShell>
  );
}

export function Contact() {
  return (
    <InfoShell title="Kontakt">
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard icon={Mail} title="E-mail">info@homespark.sk</InfoCard>
        <InfoCard icon={MapPin} title="Centrála">Bratislava, Slovensko</InfoCard>
      </div>
      <Button asChild>
        <Link to="/predajne">Zobraziť predajne</Link>
      </Button>
    </InfoShell>
  );
}

export function Shipping() {
  return (
    <InfoShell title="Doprava a platba">
      <InfoCard icon={Truck} title="Doprava">
        Doprava je zadarmo pri objednávke nad 49 EUR. Pri nižšej hodnote košíka je doprava 4,99 EUR.
      </InfoCard>
      <InfoCard icon={Package} title="Platba">
        Aktuálne podporujeme bezpečnú platbu kartou cez Stripe.
      </InfoCard>
    </InfoShell>
  );
}

export function Returns() {
  return (
    <InfoShell title="Vrátenie tovaru">
      <InfoCard icon={RotateCcw} title="30 dní na vrátenie">
        Nepoškodený tovar môžete pri vybraných produktoch vrátiť do 30 dní od doručenia.
      </InfoCard>
      <Button variant="outline" asChild>
        <Link to="/podmienky">Obchodné podmienky</Link>
      </Button>
    </InfoShell>
  );
}

export function Tracking() {
  return (
    <InfoShell title="Sledovanie zásielky">
      <InfoCard icon={Package} title="Stav zásielky">
        Informácie o doručení dostanete e-mailom po spracovaní objednávky.
      </InfoCard>
      <Button asChild>
        <Link to="/ucet/objednavky">Moje objednávky</Link>
      </Button>
    </InfoShell>
  );
}

function InfoShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Layout>
      <SEO title={title} />
      <div className="section-container py-8 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-display font-bold">{title}</h1>
          <div className="mt-6 space-y-5 text-muted-foreground">{children}</div>
        </div>
      </div>
    </Layout>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="mt-3 font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm">{children}</p>
    </div>
  );
}
