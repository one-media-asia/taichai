require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const Stripe = require('stripe');

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const paidCustomers = new Set();
const paidSessions = new Set();

app.use(express.json());
app.use(cookieParser());

function getSessionKey(req) {
  return req.cookies && req.cookies.taichi_session ? req.cookies.taichi_session : 'anonymous';
}

function markPaid(req, res, sessionId) {
  const sessionKey = getSessionKey(req);
  paidCustomers.add(sessionKey);
  if (sessionId) {
    paidSessions.add(sessionId);
  }

  res.cookie('taichi_access', 'granted', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 365
  });

  res.cookie('taichi_session', sessionKey, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 365
  });

  return res.json({ authorized: true, ok: true });
}

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe is not configured' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1UBpKQHfLuEywLiXgwgLD2xS',
        quantity: 1
      }],
      success_url: `${baseUrl}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/gate.html`,
      metadata: {
        product: 'tai-chi-week'
      }
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error:', err.message);
    return res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

app.post('/api/mark-paid', async (req, res) => {
  try {
    const sessionId = req.body && req.body.sessionId;
    const customerEmail = req.body && req.body.email;

    if (stripe && sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === 'paid' || session.status === 'complete') {
        return markPaid(req, res, sessionId);
      }
      return res.status(402).json({ authorized: false, error: 'Payment not verified' });
    }

    if (stripe && customerEmail) {
      return markPaid(req, res, sessionId || 'email-verified');
    }

    return markPaid(req, res, sessionId || 'local-fallback');
  } catch (err) {
    console.error('mark-paid error:', err.message);
    return res.status(500).json({ authorized: false, error: 'Payment verification failed' });
  }
});

app.get('/api/check-access', (req, res) => {
  const sessionKey = getSessionKey(req);
  const hasAccess = paidCustomers.has(sessionKey) || req.cookies.taichi_access === 'granted' || paidSessions.has(req.query.session_id || '');
  return res.json({ authorized: !!hasAccess });
});

app.get('/health', (req, res) => {
  res.json({ ok: true, stripeConfigured: !!stripe });
});

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Tai Chi server running on http://localhost:${port}`);
});
