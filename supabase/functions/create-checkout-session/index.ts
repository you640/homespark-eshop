import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";

interface LineItemInput {
  name: string;
  description?: string;
  price: number; // EUR
  quantity: number;
  image?: string;
}

interface RequestBody {
  items: LineItemInput[];
  email: string;
  shipping?: number; // EUR
  discount?: number; // EUR
  successUrl?: string;
  cancelUrl?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: "Stripe nie je nakonfigurované" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: RequestBody = await req.json();
    if (!body.items?.length || !body.email) {
      return new Response(
        JSON.stringify({ error: "Chýbajú položky alebo email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });
    const origin = req.headers.get("origin") ?? "http://localhost:5173";

    const line_items = body.items.map((it) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: it.name,
          ...(it.description ? { description: it.description } : {}),
          ...(it.image ? { images: [it.image] } : {}),
        },
        unit_amount: Math.round(it.price * 100),
      },
      quantity: it.quantity,
    }));

    if (body.shipping && body.shipping > 0) {
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Doprava" },
          unit_amount: Math.round(body.shipping * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: body.email,
      line_items,
      ...(body.discount && body.discount > 0
        ? {
            discounts: [
              {
                coupon: (await stripe.coupons.create({
                  amount_off: Math.round(body.discount * 100),
                  currency: "eur",
                  duration: "once",
                  name: "Zľava",
                })).id,
              },
            ],
          }
        : {}),
      success_url: body.successUrl ?? `${origin}/objednavka/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: body.cancelUrl ?? `${origin}/kosik`,
    });

    return new Response(JSON.stringify({ url: session.url, id: session.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Neznáma chyba";
    console.error("create-checkout-session error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
