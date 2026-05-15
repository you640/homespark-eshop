import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useCartStore } from "@/lib/cart-store";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "paid" | "pending" | "error";

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const clearCart = useCartStore((s) => s.clearCart);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setError("Chýba session_id");
      return;
    }
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { session_id: sessionId },
        });
        if (error) throw error;
        if (data?.status === "paid") {
          setStatus("paid");
          clearCart();
        } else {
          setStatus("pending");
        }
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : "Neznáma chyba");
      }
    })();
  }, [sessionId, clearCart]);

  return (
    <Layout hideMobileCart>
      <SEO title="Objednávka úspešná" noIndex={true} />
      <div className="section-container py-16 md:py-24 text-center max-w-md mx-auto">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 mx-auto mb-6 animate-spin text-primary" />
            <h1 className="text-2xl font-display font-bold mb-2">Overujem platbu…</h1>
            <p className="text-muted-foreground">Chvíľu strpenia.</p>
          </>
        )}

        {status === "paid" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Ďakujeme za objednávku!</h1>
            <p className="text-muted-foreground mb-8">
              Vaša platba bola úspešne spracovaná. Potvrdenie sme vám poslali na email.
            </p>
            <Button size="lg" asChild>
              <Link to="/">Pokračovať v nakupovaní</Link>
            </Button>
          </>
        )}

        {status === "pending" && (
          <>
            <Loader2 className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h1 className="text-2xl font-display font-bold mb-2">Platba sa spracováva</h1>
            <p className="text-muted-foreground mb-6">
              Vaša platba ešte nebola dokončená. Skúste obnoviť stránku o pár sekúnd.
            </p>
            <Button onClick={() => window.location.reload()}>Obnoviť</Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">Chyba pri overení</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild>
              <Link to="/kosik">Späť do košíka</Link>
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}
