## Cieľ

Doplniť Stripe platby tak, aby:
1. Checkout cez `/pokladna` reálne fungoval end-to-end (platba → uloženie objednávky → potvrdenie).
2. Vznikol jednoduchý **admin dashboard**, kde si ku každému produktu (resp. variante) vieš vytvoriť vlastný **Stripe Payment Link** a uložiť/skopírovať ho.

---

## 1. Doplnenie checkoutu (existujúca edge funkcia + nová verify funkcia)

**Problém teraz:** `create-checkout-session` vytvorí Stripe session, ale objednávka sa nikdy neuloží do DB a stránka `/objednavka/success` len vyčistí košík. Žiadny záznam v `orders` ani v Stripe Dashboard pod tvojím účtom neuvidíš spárovaný.

**Riešenie (bez webhookov, podľa Lovable best-practice):**

- **Edge funkcia `create-checkout-session`** (úprava existujúcej):
  - Pred vytvorením session vloží do tabuľky `orders` riadok so statusom `pending` (subtotal, shipping, discount, total, email, payment_method='stripe', shipping_address={}).
  - Vloží `order_items` s snapshotmi (name, price, quantity, sku, variant_id).
  - Pošle `metadata: { order_id }` do Stripe session.
  - `success_url` bude obsahovať `?session_id={CHECKOUT_SESSION_ID}&order_id=<uuid>`.

- **Nová edge funkcia `verify-payment`**:
  - Vstup: `session_id`.
  - Cez Stripe SDK overí `payment_status === 'paid'`.
  - Update `orders.status` → `paid` (alebo `failed`/`pending`).
  - Vráti status pre frontend.

- **Stránka `/objednavka/success`**:
  - Po načítaní zavolá `verify-payment` so `session_id`.
  - Zobrazí stav (Loading → Úspech / Čaká na platbu).
  - Vyčistí košík len pri `paid`.

- **Cancel route `/objednavka/cancel`** (nová):
  - Stripe sem presmeruje pri zrušení platby. Zobrazí "Platba zrušená" + tlačidlo Späť do košíka.

---

## 2. Admin Dashboard – Payment Links per produkt

**Nová tabuľka `product_payment_links`**:
```text
id, product_id, variant_id (nullable), 
stripe_product_id, stripe_price_id, stripe_payment_link_id,
url (public link), label, amount, currency,
created_at, updated_at
```
RLS: SELECT všetkým (verejné), INSERT/UPDATE/DELETE iba `admin` rola.

**Nová edge funkcia `admin-create-payment-link`** (vyžaduje admin rolu):
- Vstup: `product_id`, voliteľne `variant_id`, `name`, `amount` (EUR), `description`, `image_url`.
- Vytvorí Stripe Product → Stripe Price → Stripe Payment Link.
- Uloží do `product_payment_links` a vráti `url`.

**Nová edge funkcia `admin-delete-payment-link`**:
- Deaktivuje Payment Link na Stripe (`active: false`) a zmaže riadok z DB.

**Nová stránka `/admin`** (chránená `has_role(uid, 'admin')`):
- Zoznam produktov s ich existujúcimi Payment Linkami.
- Pri každom produkte tlačidlo **„Vytvoriť Payment Link"** → modal s formulárom:
  - Variant selector (ak má produkt varianty).
  - Cena (predvyplnená z variantu).
  - Popis / label.
  - Submit → zavolá `admin-create-payment-link`.
- Pre existujúce linky: **Kopírovať URL**, **Otvoriť**, **Zmazať**.

**Login do admina:**
- Pridáme route `/admin` chránenú `useAuth` + kontrolou role z tabuľky `user_roles`.
- Návod ako si pridať admin rolu (cez SQL Editor) bude v README + krátka inštrukcia v UI ak nie si admin.

---

## 3. Drobnosti

- Header dostane link na `/admin` (zobrazený len ak je user admin).
- README aktualizujem s testovacími Stripe kartami (`4242 4242 4242 4242`).
- Toast notifikácie pre úspech/chybu pri všetkých Stripe akciách.

---

## Technické detaily

- **Migrácia DB:** nová tabuľka `product_payment_links` + RLS policies + trigger `update_updated_at_column`.
- **Edge funkcie (3 nové + 1 úprava):**
  - `create-checkout-session` (úprava — vkladá pending order)
  - `verify-payment` (nová — overuje session a aktualizuje order)
  - `admin-create-payment-link` (nová — vyžaduje admin)
  - `admin-delete-payment-link` (nová — vyžaduje admin)
- **Stripe SDK:** `npm:stripe@^17` cez Deno, API verzia `2024-12-18.acacia`.
- **Nové frontend súbory:**
  - `src/pages/Admin.tsx`
  - `src/pages/OrderCancel.tsx`
  - `src/components/admin/PaymentLinkDialog.tsx`
  - `src/hooks/useIsAdmin.ts`
- **Routy v `App.tsx`:** `/admin`, `/objednavka/cancel`.
- Bez webhookov (podľa Lovable Stripe best-practice — verifikácia cez `verify-payment` na success stránke je dostatočná pre demo a netreba konfigurovať webhook secret).

---

## Otvorená otázka

Aby si sa vedel prihlásiť do `/admin`, potrebuješ admin rolu. Stačí mi tvoj email s ktorým sa registruješ a po nasadení migrácie ti pošlem 1 SQL príkaz, ktorý si spustíš (alebo to spravím sám cez insert tool, keď mi povieš email).
