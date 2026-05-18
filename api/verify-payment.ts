import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const STRIPE_API_VERSION = '2026-04-22.dahlia';

function getStripeClient() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return null;
  return new Stripe(stripeKey, { apiVersion: STRIPE_API_VERSION });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return res.status(503).json({ error: 'Platby nie sú nakonfigurované' });
  }

  try {
    const { session_id } = req.body as { session_id: string };

    if (!session_id || typeof session_id !== 'string' || !session_id.startsWith('cs_')) {
      return res.status(400).json({ error: 'session_id is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    return res.status(200).json({
      status: session.payment_status, // 'paid' | 'unpaid' | 'no_payment_required'
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
    });
  } catch (err) {
    console.error('Stripe verify error:', err);
    return res.status(500).json({ error: 'Nepodarilo sa overiť platbu' });
  }
}
