
## Plán: Rebrand na BrickHaus + seed produktov + Stripe (BYOK) + klik efekt

### 1. Rebrand MerkuryMarket → BrickHaus
- `index.html`: title, meta description, OG/Twitter tagy → "BrickHaus Eshop (Demo)"
- `src/components/layout/Header.tsx`: logo text "MerkuryMarket" → "BrickHaus" (mobile sheet + desktop)
- `src/components/layout/Footer.tsx`: názov, copyright, kontakty
- `src/pages/Index.tsx`: hero/headline texty, sekcia s demo prihlasovacími údajmi
- `src/pages/Login.tsx` a `Register.tsx`: branding texty
- `README.md`: aktualizovať názov a demo credentials
- PWA manifest vo `vite.config.ts`: `name`, `short_name`, theme

Ponechávame tvoju paletu (warm home-improvement) – mení sa len názov, nie farby.

### 2. Seed demo dát do Supabase (5+ produktov × 7 kategórií = ~35-40 produktov)
Cez `supabase--insert` postupne naplníme:
- `categories` – 7 hlavných: Nábytok, Dlažba a podlahy, Kúpeľne, Dvere, Kúrenie, Záhrada, Náradie (slugy zladené s `Header.tsx`)
- `products` – min. 5 v každej kategórii (názov, slug, brand, price_from, rating, is_featured)
- `product_variants` – aspoň 1 default variant na produkt (sku, price, compare_at_price pre časť produktov, stock)
- `product_images` – placeholder URL z `/placeholder.svg` resp. unsplash placeholderov v storage bucketi `product-images`
- `banners` – 2-3 promo bannery pre homepage
- `coupons` – `WELCOME10` (10%) a `ZIMA2024` (15%, min. košík 100 €)

Homepage a Category page upravíme aby fetchovali z DB cez `@tanstack/react-query` (namiesto hardcoded dát).

### 3. Klik na produkt = pulse animácia, žiadna navigácia
V `src/components/products/ProductCard.tsx`:
- Zmeniť `<Link to="/produkt/...">` na `<button>` (alebo `<div role="button">`)
- Pridať `useState` pre `isPulsing`
- Pri kliknutí: `setIsPulsing(true)` → po 600 ms späť false
- Karta dostane triedu `animate-pulse` resp. vlastný keyframe `pulse-soft` (scale 1 → 1.02 → 1) z `tailwind.config.ts`
- Bez toastu, bez navigácie. Tlačidlo "Do košíka" funguje ďalej (stopPropagation)

Detail produktu `/produkt/:slug` zatiaľ vynecháme (pripravíme po napojení DB).

### 4. Stripe BYOK integrácia
Keďže si zvolil vlastný Stripe účet:
1. Spustím `stripe--enable_stripe` – Lovable ťa vyzve vložiť **STRIPE_SECRET_KEY** (z https://dashboard.stripe.com/apikeys, prihlásený ako space@rubberduck.space).
2. Po pridaní secretu vytvorím edge function `create-checkout-session`:
   - Prijme položky košíka + email
   - Vytvorí Stripe Checkout Session (mode: payment, line_items z variantov)
   - Vráti `url` na presmerovanie
3. Edge function `stripe-webhook` (verify_jwt = false) pre `checkout.session.completed` → zapíše objednávku do `orders` + `order_items`
4. Frontend: `/pokladna` (Checkout page) – formulár (email, adresa, payment method radio: Stripe / Dobierka), tlačidlo "Zaplatiť" volá `supabase.functions.invoke('create-checkout-session')` a redirectne na Stripe
5. Success/Cancel stránky `/objednavka/uspech` a `/objednavka/zrusena`

**Pozn.:** Webhook secret (`STRIPE_WEBHOOK_SECRET`) pridáš po deployi – dám ti URL endpointu na nakonfigurovanie v Stripe dashboarde.

### 5. Čo potrebujem od teba pre Stripe
Iba jednu vec teraz:
- **STRIPE_SECRET_KEY** – nájdeš ho na https://dashboard.stripe.com/apikeys (test mode kľúč začína `sk_test_...`). Pri spustení implementácie ti vyskočí bezpečný formulár.

Webhook secret pridáme v druhom kroku po nasadení edge funkcie.

### Poradie vykonania
1. Rebrand (rýchle textové zmeny)
2. Migrácia/seed dát + úprava Index/Category na fetch z DB
3. Pulse efekt na ProductCard
4. Stripe enable + edge functions + checkout flow

Po schválení plánu spustím implementáciu a vyžiadam STRIPE_SECRET_KEY.
