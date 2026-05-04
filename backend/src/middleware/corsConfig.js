const DEFAULT_DEV_ORIGINS = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

function parseAllowlist() {
  const raw = process.env.CORS_ORIGIN;
  if (!raw || raw.trim() === '') {
    return null;
  }
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

function createCorsOptions() {
  const allowlist = parseAllowlist();

  return {
    credentials: true,
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      const allowed = allowlist || DEFAULT_DEV_ORIGINS;
      if (allowed.has(origin)) {
        callback(null, origin);
        return;
      }
      callback(null, false);
    },
  };
}

module.exports = { createCorsOptions, DEFAULT_DEV_ORIGINS };
