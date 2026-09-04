const Stripe = require('stripe');

function parseCookies(header = '') {
  return (header || '').split(';').reduce((acc, rawCookie) => {
    const cookie = rawCookie.trim();
    if (!cookie) return acc;

    const separatorIndex = cookie.indexOf('=');
    const name = separatorIndex >= 0 ? cookie.slice(0, separatorIndex) : cookie;
    const value = separatorIndex >= 0 ? cookie.slice(separatorIndex + 1) : '';
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  const sessionId = cookies.taichi_session_id;

  if (!sessionId) {
    return res.status(200).json({ authorized: false });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  try {
    const stripe = new Stripe(stripeSecretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const isPaid = session && (session.payment_status === 'paid' || session.status === 'complete');

    return res.status(200).json({ authorized: !!isPaid });
  } catch (err) {
    console.error('check-access error:', err.message);
    return res.status(200).json({ authorized: false });
  }
};
