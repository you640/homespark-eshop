import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";
import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe nie je nakonfigurované");

    const { session_id } = await req.json();
    if (!session_id) throw new Error("Chýba session_id");

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const orderId = session.metadata?.order_id;
    let newStatus: "paid" | "pending" | "cancelled" = "pending";
    if (session.payment_status === "paid") newStatus = "paid";
    else if (session.status === "expired") newStatus = "cancelled";

    if (orderId) {
      await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    }

    return new Response(
      JSON.stringify({
        status: newStatus,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        order_id: orderId,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Neznáma chyba";
    console.error("verify-payment error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
