import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FOOTER_LINKS = {
  shop: [
    { label: 'Nábytok', href: '/kategoria/nabytok' },
    { label: 'Dlažba a podlahy', href: '/kategoria/dlazba-podlahy' },
    { label: 'Kúpeľne', href: '/kategoria/kupelne' },
    { label: 'Záhrada', href: '/kategoria/zahrada' },
    { label: 'Náradie', href: '/kategoria/naradie' },
  ],
  customer: [
    { label: 'Môj účet', href: '/ucet' },
    { label: 'Moje objednávky', href: '/ucet/objednavky' },
    { label: 'Zoznam želaní', href: '/wishlist' },
    { label: 'Sledovanie zásielky', href: '/sledovanie' },
  ],
  info: [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Kontakt', href: '/kontakt' },
    { label: 'Doprava a platba', href: '/doprava' },
    { label: 'Vrátenie tovaru', href: '/vratenie' },
    { label: 'Ochrana súkromia', href: '/sukromie' },
    { label: 'Obchodné podmienky', href: '/podmienky' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter section */}
      <div className="bg-primary">
        <div className="section-container py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-display font-bold text-primary-foreground">
                Prihláste sa k odberu noviniek
              </h3>
              <p className="mt-1 text-primary-foreground/80">
                Získajte zľavu 10% na prvý nákup a informácie o akciách
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Váš e-mail"
                className="flex-1 bg-primary-foreground text-foreground border-0"
              />
              <Button 
                type="submit" 
                variant="secondary"
                className="shrink-0 font-semibold"
              >
                Prihlásiť
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold text-primary">
                MerkuryMarket
              </span>
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Váš spoľahlivý partner pre všetko do domácnosti. Kvalitný nábytok, podlahy, kúpeľne a záhradné vybavenie za skvelé ceny.
            </p>
            <div className="flex gap-3 mt-6">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Nakupovať</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Zákazník</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.customer.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-background/70">Zákaznícka linka</p>
                  <a href="tel:+421123456789" className="font-medium hover:text-primary transition-colors">
                    +421 123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-background/70">E-mail</p>
                  <a href="mailto:info@merkurymarket.sk" className="font-medium hover:text-primary transition-colors">
                    info@merkurymarket.sk
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-background/70">Centrála</p>
                  <p className="font-medium">Bratislava, Slovensko</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © 2024 MerkuryMarket Eshop (Demo). Všetky práva vyhradené.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-background/60">
            {FOOTER_LINKS.info.slice(3).map((link) => (
              <Link 
                key={link.href}
                to={link.href}
                className="hover:text-background transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
