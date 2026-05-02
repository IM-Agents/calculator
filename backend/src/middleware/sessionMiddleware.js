import { randomUUID } from 'node:crypto';

const COOKIE_NAME = 'calc_sid';
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 400;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function parseCookies(header) {
  const out = {};
  if (!header || typeof header !== 'string') return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    try {
      out[k] = decodeURIComponent(v);
    } catch {
      out[k] = v;
    }
  }
  return out;
}

function isValidSessionId(v) {
  return typeof v === 'string' && v.length <= 64 && UUID_RE.test(v);
}

function appendSetCookie(res, value) {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${COOKIE_MAX_AGE_SEC}`,
  ];
  res.append('Set-Cookie', parts.join('; '));
}

export function sessionMiddleware(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  let sid = cookies[COOKIE_NAME];
  if (!isValidSessionId(sid)) {
    sid = randomUUID();
    appendSetCookie(res, sid);
  }
  req.sessionId = sid;
  next();
}
