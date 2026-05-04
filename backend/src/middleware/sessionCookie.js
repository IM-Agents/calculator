const { randomUUID } = require('crypto');

const COOKIE_NAME = 'calc_sid';
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const UUID_V4_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function sessionCookieMiddleware(req, res, next) {
  let sid = req.cookies && req.cookies[COOKIE_NAME];
  if (!sid || typeof sid !== 'string' || !UUID_V4_RE.test(sid)) {
    sid = randomUUID();
    res.cookie(COOKIE_NAME, sid, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: ONE_YEAR_MS,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  req.calcSessionId = sid;
  next();
}

module.exports = { sessionCookieMiddleware, COOKIE_NAME };
