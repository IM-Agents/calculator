/**
 * Environment-backed configuration. Deployment-specific browser origins
 * must be set via FRONTEND_URL (comma-separated list allowed).
 */

const DEFAULT_LOCAL_FRONTEND_ORIGIN = 'http://localhost:5173';

function splitOrigins(value) {
  if (typeof value !== 'string' || value.length === 0) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/** @returns {string[]} */
export function getFrontendOriginsFromEnv() {
  return splitOrigins(process.env.FRONTEND_URL);
}

/**
 * Origins allowed for CORS: FRONTEND_URL entries, or local Vite default when unset.
 * @returns {string[]}
 */
export function getCorsAllowedOrigins() {
  const fromEnv = getFrontendOriginsFromEnv();
  if (fromEnv.length > 0) return fromEnv;
  return [DEFAULT_LOCAL_FRONTEND_ORIGIN];
}

/**
 * Value for `cors({ origin })`: a single string, or an array when multiple origins are configured.
 * @returns {string | string[]}
 */
export function getCorsOriginOption() {
  const origins = getCorsAllowedOrigins();
  if (origins.length === 1) return origins[0];
  return origins;
}

/**
 * Primary UI origin (first configured origin, or local dev default).
 * @returns {string}
 */
export function getUiOrigin() {
  const origins = getCorsAllowedOrigins();
  return origins[0];
}
