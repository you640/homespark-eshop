## 1. Tlačidlo „Kopírovať všetko" pre Payment Linky

### Stránka produktu (`src/pages/Product.tsx`)
- Pri viac ako 1 linku zobraziť v hlavičke sekcie tlačidlo **„Kopírovať všetko"** (ikona `Copy`).
- Funkcia naformátuje všetky linky do textu vo formáte:
  ```
  {label} – {amount €}
  {url}
  
  {label} – {amount €}
  {url}
  ```
- Po kliknutí: `navigator.clipboard.writeText(...)` + toast „Skopírovaných X odkazov".

### Admin dashboard (`src/pages/Admin.tsx`)
- Pri každom produkte, ak má 2+ linky, pridať vedľa tlačidla „Nový Payment Link" druhé tlačidlo **„Kopírovať všetky"**, ktoré skopíruje všetky linky daného produktu (rovnaký formát).
- Navrchu stránky tlačidlo **„Kopírovať všetky linky (všetky produkty)"** – zoskupí výstup po produktoch:
  ```
  === {Názov produktu} ===
  {label} – {amount €}
  {url}
  ```

---

## 2. Príprava na produkčné nasadenie

### A. Branding & obsah
- **`index.html`**: zmena `<title>` a `og:title` z „BrickHaus Eshop (Demo)" → finálny názov (default: **„MerkuryMarket"** podľa memory; ak chceš iný, dáš vedieť po schválení).
- **`vite.config.ts`** PWA manifest: `name`, `short_name`, `description` zladiť s novým brandom; `theme_color` ponechať alebo upraviť.
- Odstrániť všetky „(Demo)" reťazce z UI.

### B. SEO (per-route)
- Doinštalovať `react-helmet-async`, obaliť app v `HelmetProvider`.
- Pridať `<Helmet>` na: `Index`, `Category`, `Product`, `Cart`, `Checkout`, `Login`, `Register`, `OrderSuccess` – každý s vlastným `title`, `description`, `canonical`, `og:*`.
- Na `Product` doplniť JSON-LD typu `Product` (name, image, price, availability).
- Vytvoriť `public/sitemap.xml` (statický základ) a `public/robots.txt` skontrolovať/upraviť (allow + sitemap URL).

### C. Stripe v produkčnom režime
- Si už dodal **live** kľúč (`pk_live_...`/sk_live), takže Stripe je v live móde – ✅.
- **Doplniť**: v `Checkout.tsx` po úspešnom `create-checkout-session` vyčistiť košík **až** po overení v `OrderSuccess` (už je tak).
- Skontrolovať že `success_url`/`cancel_url` používajú produkčnú doménu cez `req.headers.get("origin")` – ✅, funguje automaticky z prehliadača.
- Pridať poznámku do dashboardu, že linky sa vytvárajú v reálnom Stripe účte (ostré platby).

### D. Bezpečnosť
- Spustiť **security scan** (Supabase linter + security scanner) a opraviť kritické nálezy (RLS, exposed data).
- Overiť RLS na `product_payment_links` – aktuálne `Anyone can view payment links` (SELECT = true). To je OK ak chceš, aby boli verejne viditeľné na stránke produktu (pre zákazníkov). Ak nie, treba zmeniť na admin-only + samostatný verejný view.
- Skontrolovať že `verify-payment` neumožní falošný update objednávky (volá Stripe ako single source of truth – ✅).

### E. Produkčný build & deploy check
- Edge funkcie deploynúť (`create-checkout-session`, `verify-payment`, `admin-create-payment-link`, `admin-delete-payment-link`) a overiť logy.
- Test end-to-end: pridanie produktu do košíka → checkout → live Stripe → success → objednávka v DB má status `paid`.
- Test admin: vytvorenie payment linku → otvorenie URL → testovacia platba.

### F. Drobnosti / odporúčania (oznámim, neimplementujem bez súhlasu)
- Zvážiť custom doménu (teraz `abode-forge-store.lovable.app`).
- Pridať Cookie consent (už existuje `CookieConsent.tsx` – overiť, že je vo `Layout`).
- GDPR: stránky „Obchodné podmienky", „Ochrana osobných údajov", „Reklamácie" – chýbajú, **odporúčam doplniť**.
- Email notifikácie pre zákazníka po objednávke (cez Lovable Email) – chýba, **odporúčam doplniť**.

---

## Otázky pred spustením
1. **Finálny názov brandu** pre title/PWA/SEO? (default = „MerkuryMarket" z memory)
2. **Doména** pre canonical/sitemap – `abode-forge-store.lovable.app` alebo plánuješ vlastnú?
3. Mám hneď doplniť aj **stránky GDPR/obchodné podmienky** a **potvrdzovacie emaily**, alebo to nechať na ďalšiu iteráciu?
