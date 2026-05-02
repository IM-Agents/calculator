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
  if (!Number.isFinite(n) || n <= 0) {
    return 3001;
  }
  return n;
}

export const env = Object.freeze({
  listenPort: resolveListenPort(),
  corsOrigins: Object.freeze(parseCorsOrigins()),
});
