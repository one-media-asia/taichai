const Stripe = require('stripe');

function getBaseUrl(req) {
  const directBaseUrl = process.env.BASE_URL || process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  if (directBaseUrl) {
    return directBaseUrl.startsWith('http://') || directBaseUrl.startsWith('https://')
      ? directBaseUrl.replace(/\/$/, '')
      : `https://${directBaseUrl.replace(/\/$/, '')}`;
  }

  const forwardedProto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'localhost:3000';
  return `${forwardedProto}://${host}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const stripe = new Stripe(stripeSecretKey);
  const baseUrl = getBaseUrl(req);
  const prices = { eur: 199, usd: 219, gbp: 169 };
  const currency = String(req.body?.currency || 'eur').toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(prices, currency)) {
    return res.status(400).json({ error: 'Unsupported currency' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          unit_amount: prices[currency],
          product_data: { name: 'Tai Chi Week Planner' }
        },
        quantity: 1
      }],
      success_url: `${baseUrl}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/gate.html`,
      metadata: { product: 'tai-chi-week' }
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error:', err.message);
    return res.status(500).json({ error: 'Unable to create checkout session' });
  }
};
