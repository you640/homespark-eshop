import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useCartStore } from "@/lib/cart-store";

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    if (sessionId) clearCart();
  }, [sessionId, clearCart]);

  return (
    <Layout hideMobileCart>
      <div className="section-container py-16 md:py-24 text-center max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-success" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">Ďakujeme za objednávku!</h1>
        <p className="text-muted-foreground mb-8">
          Vaša platba bola úspešne spracovaná. Potvrdenie sme vám poslali na email.
        </p>
        {sessionId && <p className="text-xs text-muted-foreground mb-6 font-mono break-all">ID: {sessionId}</p>}
        <Button size="lg" asChild><Link to="/">Pokračovať v nakupovaní</Link></Button>
      </div>
    </Layout>
  );
}
