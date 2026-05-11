import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";
import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";

interface LineItemInput {
  name: string;
  description?: string;
  price: number; // EUR
  quantity: number;
  image?: string;
  variant_id?: string;
  sku?: string;
}

interface RequestBody {
  items: LineItemInput[];
  email: string;
  shipping?: number;
  discount?: number;
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
      return new Response(JSON.stringify({ error: "Stripe nie je nakonfigurované" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: RequestBody = await req.json();
    if (!body.items?.length || !body.email) {
      return new Response(JSON.stringify({ error: "Chýbajú položky alebo email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Service-role client for inserting orders (bypasses RLS, safe in edge function)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Try to identify user from auth header (optional — guest checkout supported)
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const userClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data } = await userClient.auth.getUser();
      userId = data.user?.id ?? null;
    }

    const subtotal = body.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = body.shipping ?? 0;
    const discount = body.discount ?? 0;
    const total = subtotal + shipping - discount;

    // Create pending order
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        email: body.email,
        status: "pending",
        payment_method: "stripe",
        subtotal,
        shipping,
        discount,
        total,
        shipping_address: {},
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      console.error("order insert err", orderErr);
      throw new Error(orderErr?.message ?? "Nepodarilo sa vytvoriť objednávku");
    }

    // Create order items
    const orderItems = body.items.map((it) => ({
      order_id: order.id,
      variant_id: it.variant_id ?? null,
      name_snapshot: it.name,
      sku_snapshot: it.sku ?? null,
      price_snapshot: it.price,
      quantity: it.quantity,
      attributes_snapshot: {},
    }));
    const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
    if (itemsErr) console.error("order_items insert err", itemsErr);

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

    if (shipping > 0) {
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Doprava" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: body.email,
      line_items,
      metadata: { order_id: order.id },
      ...(discount > 0
        ? {
            discounts: [
              {
                coupon: (await stripe.coupons.create({
                  amount_off: Math.round(discount * 100),
                  currency: "eur",
                  duration: "once",
                  name: "Zľava",
                })).id,
              },
            ],
          }
        : {}),
      success_url:
        body.successUrl ??
        `${origin}/objednavka/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: body.cancelUrl ?? `${origin}/objednavka/cancel?order_id=${order.id}`,
    });

    return new Response(JSON.stringify({ url: session.url, id: session.id, order_id: order.id }), {
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
