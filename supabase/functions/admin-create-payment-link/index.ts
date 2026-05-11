import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";
import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";

interface Body {
  product_id: string;
  variant_id?: string;
  name: string;
  amount: number; // EUR
  description?: string;
  image_url?: string;
  label?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe nie je nakonfigurované");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: userData } = await userClient.auth.getUser();
    const user = userData.user;
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden – admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: Body = await req.json();
    if (!body.product_id || !body.name || !body.amount) {
      throw new Error("Chýbajú povinné polia");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });

    const product = await stripe.products.create({
      name: body.name,
      ...(body.description ? { description: body.description } : {}),
      ...(body.image_url ? { images: [body.image_url] } : {}),
      metadata: {
        product_id: body.product_id,
        ...(body.variant_id ? { variant_id: body.variant_id } : {}),
      },
    });

    const price = await stripe.prices.create({
      product: product.id,
      currency: "eur",
      unit_amount: Math.round(body.amount * 100),
    });

    const link = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
    });

    const { data: row, error: insErr } = await admin
      .from("product_payment_links")
      .insert({
        product_id: body.product_id,
        variant_id: body.variant_id ?? null,
        stripe_product_id: product.id,
        stripe_price_id: price.id,
        stripe_payment_link_id: link.id,
        url: link.url,
        label: body.label ?? body.name,
        amount: body.amount,
        currency: "eur",
      })
      .select()
      .single();

    if (insErr) throw new Error(insErr.message);

    return new Response(JSON.stringify({ link: row }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Neznáma chyba";
    console.error("admin-create-payment-link error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
