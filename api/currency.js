const countryCurrencies = {
  AT: 'eur', BE: 'eur', CY: 'eur', DE: 'eur', EE: 'eur', ES: 'eur', FI: 'eur', FR: 'eur',
  GR: 'eur', IE: 'eur', IT: 'eur', LT: 'eur', LU: 'eur', LV: 'eur', MT: 'eur', NL: 'eur', PT: 'eur',
  SI: 'eur', SK: 'eur', HR: 'eur', GB: 'gbp', UK: 'gbp',
  US: 'usd',
};

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const country = String(
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    req.headers['cloudfront-viewer-country'] ||
    ''
  ).toUpperCase();

  return res.status(200).json({ currency: countryCurrencies[country] || 'eur' });
};
