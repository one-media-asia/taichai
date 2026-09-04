const Stripe = require('stripe');

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });

    req.on('error', reject);
  });
}

function setCookie(res, name, value, maxAgeSeconds = 31536000) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; SameSite=Lax${secure}`;
  const current = res.getHeader('Set-Cookie') || [];
  const next = Array.isArray(current) ? current.concat(cookie) : [current, cookie].filter(Boolean);
  res.setHeader('Set-Cookie', next);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  try {
    const body = await parseBody(req);
    const sessionId = body.sessionId;

    if (!sessionId) {
      return res.status(400).json({ authorized: false, error: 'Missing sessionId' });
    }

    const stripe = new Stripe(stripeSecretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const isPaid = session && (session.payment_status === 'paid' || session.status === 'complete');

    if (!isPaid) {
      return res.status(402).json({ authorized: false, error: 'Payment not verified' });
    }

    setCookie(res, 'taichi_access', 'granted');
    setCookie(res, 'taichi_session_id', sessionId);

    return res.status(200).json({ authorized: true, ok: true });
  } catch (err) {
    console.error('mark-paid error:', err.message);
    return res.status(500).json({ authorized: false, error: 'Payment verification failed' });
  }
};
