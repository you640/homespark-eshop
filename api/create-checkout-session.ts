import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { products } from '../src/data/products';

const STRIPE_API_VERSION = '2026-04-22.dahlia';
const DEFAULT_ORIGIN = 'https://homespark-eshop.vercel.app';
const SHIPPING_THRESHOLD = 49;
const SHIPPING_COST = 4.99;
const MAX_QUANTITY = 99;

interface CheckoutItem {
  productId?: string;
  product_id?: string;
  quantity: number;
}

interface CheckoutBody {
  email: string;
  items: CheckoutItem[];
  couponCode?: string | null;
}

interface StripeLineItem {
  price_data: {
    currency: 'eur';
    product_data: {
      name: string;
      description?: string;
      images?: string[];
      metadata?: Record<string, string>;
    };
    unit_amount: number;
  };
  quantity: number;
}

function getStripeClient() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return null;
  return new Stripe(stripeKey, { apiVersion: STRIPE_API_VERSION });
}

function setNoStore(res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
}

function getRequestOrigin(req: VercelRequest) {
  const forwardedHost = req.headers['x-forwarded-host'];
  const host = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost || req.headers.host;

  if (host && /^[a-z0-9.-]+(?::\d+)?$/i.test(host)) {
    const isLocalhost = host.startsWith('localhost') || host.startsWith('127.0.0.1');
    const proto = isLocalhost ? 'http' : 'https';
    return `${proto}://${host}`;
  }

  return process.env.SITE_URL || DEFAULT_ORIGIN;
}

function normalizeEmail(email: unknown) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function calculateDiscount(couponCode: string | null | undefined, subtotal: number) {
  const code = couponCode?.trim().toUpperCase();
  if (!code) return { code: null, amount: 0 };
  if (code === 'ZIMA2024') return { code, amount: Math.min(10, subtotal) };
  if (code === 'WELCOME10') return { code, amount: Math.round(subtotal * 0.1 * 100) / 100 };
  throw new Error('Neplatný kupón');
}

function buildCart(items: CheckoutItem[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Košík je prázdny');
  }

  const lineItems = items.map((item) => {
    const productId = item.productId || item.product_id;
    const product = products.find((p) => p.id === productId);
    const quantity = Number(item.quantity);

    if (!product) throw new Error('Produkt neexistuje');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      throw new Error('Neplatné množstvo produktu');
    }

    return {
      product,
      quantity,
      total: product.sellPrice * quantity,
    };
  });

  const subtotal = Math.round(lineItems.reduce((sum, item) => sum + item.total, 0) * 100) / 100;
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  return { lineItems, subtotal, shipping };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setNoStore(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return res.status(503).json({ error: 'Platby nie sú nakonfigurované' });
  }

  try {
    const { email: rawEmail, items, couponCode } = req.body as CheckoutBody;
    const email = normalizeEmail(rawEmail);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Zadajte platný email' });
    }

    const cart = buildCart(items);
    const discount = calculateDiscount(couponCode, cart.subtotal);

    const line_items: StripeLineItem[] = cart.lineItems.map(({ product, quantity }) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
          description: product.description.slice(0, 500),
          images: product.images.slice(0, 1),
          metadata: {
            product_id: product.id,
            supplier: product.supplier,
          },
        },
        unit_amount: Math.round(product.sellPrice * 100),
      },
      quantity,
    }));

    if (cart.shipping > 0) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Doprava',
          },
          unit_amount: Math.round(cart.shipping * 100),
        },
        quantity: 1,
      });
    }

    const discounts: { coupon: string }[] = [];
    if (discount.amount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(discount.amount * 100),
        currency: 'eur',
        duration: 'once',
        name: discount.code ? `Zľava ${discount.code}` : 'Zľava',
      });
      discounts.push({ coupon: coupon.id });
    }

    const origin = getRequestOrigin(req);

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
        subtotal: cart.subtotal.toFixed(2),
        shipping: cart.shipping.toFixed(2),
        discount: discount.amount.toFixed(2),
        coupon_code: discount.code || '',
        item_count: String(cart.lineItems.reduce((sum, item) => sum + item.quantity, 0)),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    const message = err instanceof Error ? err.message : 'Nepodarilo sa vytvoriť platbu';
    return res.status(500).json({ error: message });
  }
}
