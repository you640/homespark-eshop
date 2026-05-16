import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

interface LineItem {
  name: string;
  price: number; // in EUR (e.g. 29.90)
  quantity: number;
  image?: string;
}

interface CheckoutBody {
  email: string;
  items: LineItem[];
  shipping: number;
  discount: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, items, shipping, discount } = req.body as CheckoutBody;

    if (!email || !items?.length) {
      return res.status(400).json({ error: 'Email and items are required' });
    }

    // Build Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if > 0
    if (shipping > 0) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Doprava',
          },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    // Build coupon/discount if applicable
    const discounts: { coupon: string }[] = [];
    if (discount > 0) {
      // Create an inline coupon for this session
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(discount * 100),
        currency: 'eur',
        duration: 'once',
        name: 'Zľava',
      });
      discounts.push({ coupon: coupon.id });
    }

    // Determine the origin for redirects
    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'https://homespark-eshop.vercel.app';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items,
      ...(discounts.length > 0 ? { discounts } : {}),
      success_url: `${origin}/objednavka/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/objednavka/cancel`,
      locale: 'sk',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['SK', 'CZ', 'HU', 'PL', 'AT', 'DE'],
      },
      metadata: {
        source: 'homespark-eshop',
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
