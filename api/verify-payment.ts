import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.body as { session_id: string };

    if (!session_id) {
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
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
