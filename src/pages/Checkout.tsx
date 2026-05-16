import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { Loader2, ArrowLeft, CreditCard, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useCartStore } from "@/lib/cart-store";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getCart } = useCartStore();
  const cart = getCart();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");

  if (items.length === 0) {
    return (
      <Layout hideMobileCart>
        <div className="section-container py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Košík je prázdny</h1>
          <Button asChild><Link to="/">Začať nakupovať</Link></Button>
        </div>
      </Layout>
    );
  }

  const handlePay = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Zadajte platný email");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          shipping: cart.shipping,
          discount: cart.discount,
          items: items.map((i) => ({
            name: `${i.product.name}${i.variant.title !== 'Default' ? ` – ${i.variant.title}` : ''}`,
            price: i.variant.price,
            quantity: i.quantity,
            image: i.product.images?.[0]?.url,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Nepodarilo sa vytvoriť platobnú session");
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Nepodarilo sa vytvoriť platobnú session");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Neznáma chyba";
      toast.error(`Chyba platby: ${msg}`);
      setLoading(false);
    }
  };

  return (
    <Layout hideMobileCart>
      <SEO title="Pokladňa" noIndex={true} />
      <div className="section-container py-8 md:py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Späť do košíka
        </button>

        <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">Pokladňa</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="bg-card rounded-xl border p-6">
              <h2 className="font-semibold mb-4">Kontaktné údaje</h2>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.sk" />
                <p className="text-xs text-muted-foreground">Na tento email pošleme potvrdenie objednávky.</p>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-card rounded-xl border p-6">
              <h2 className="font-semibold mb-2">Spôsob platby</h2>
              <div className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg bg-primary/5">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Platba kartou (Stripe)</p>
                  <p className="text-xs text-muted-foreground">Visa, Mastercard, Apple Pay, Google Pay</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Po kliknutí na "Zaplatiť" budete presmerovaný na zabezpečenú stránku Stripe.
              </p>
            </div>

            {/* Security badges */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                <span>SSL zabezpečenie</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-4 w-4" />
                <span>PCI DSS kompatibilné</span>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-24 space-y-4">
              <h2 className="font-semibold">Súhrn objednávky</h2>
              <div className="space-y-2 max-h-64 overflow-auto text-sm">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between gap-2">
                    <span className="line-clamp-1">{it.product.name} × {it.quantity}</span>
                    <span className="shrink-0">{formatPrice(it.variant.price * it.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Medzisúčet</span><span>{formatPrice(cart.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Doprava</span><span>{cart.shipping === 0 ? "Zadarmo" : formatPrice(cart.shipping)}</span></div>
                {cart.discount > 0 && <div className="flex justify-between text-green-600"><span>Zľava</span><span>-{formatPrice(cart.discount)}</span></div>}
                <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Celkom</span><span>{formatPrice(cart.total)}</span></div>
              </div>
              <Button size="lg" className="w-full" onClick={handlePay} disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Presmerovávam na Stripe...</> : <>Zaplatiť {formatPrice(cart.total)}</>}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Bezpečná platba cez Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
