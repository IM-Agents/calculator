/**
 * Centralized environment-derived settings for the API.
 * Read `process.env` here only—not scattered across bootstrap modules.
 */

function parseCorsOrigins() {
  const raw = process.env.CORS_ORIGIN;
  if (typeof raw === 'string' && raw.trim()) {
    const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
    if (list.length > 0) {
      return list;
    }
  }
  return ['http://localhost:5173', 'http://localhost:3000'];
}

function resolveListenPort() {
  const raw = process.env.CALCULATOR_API_PORT ?? process.env.PORT;
  if (raw === undefined || raw === null || String(raw).trim() === '') {
    return 3001;
  }
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > 65535) {
    return 3001;
  }
  return n;
}

function resolveNodeEnv() {
  const raw = process.env.NODE_ENV;
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim();
  }
  return 'development';
}

const nodeEnv = resolveNodeEnv();

export const env = Object.freeze({
  listenPort: resolveListenPort(),
  corsOrigins: Object.freeze(parseCorsOrigins()),
  nodeEnv,
  /** Set `Secure` on session cookies when running in production (HTTPS). */
  cookieSecure: nodeEnv === 'production',
});
