const SCALE = 1e12;
/** Above this magnitude, `n * SCALE` overflows; skip scale-rounding and return a finite value as-is. */
const MAX_MAGNITUDE_FOR_SCALE = Number.MAX_VALUE / SCALE;

export function normalizeNumber(n) {
  if (!Number.isFinite(n)) return n;
  if (Math.abs(n) > MAX_MAGNITUDE_FOR_SCALE) {
    return Object.is(n, -0) ? 0 : n;
  }
  const scaled = n * SCALE;
  if (!Number.isFinite(scaled)) {
    return Object.is(n, -0) ? 0 : n;
  }
  const rounded = Math.round(scaled) / SCALE;
  if (!Number.isFinite(rounded)) {
    return Object.is(n, -0) ? 0 : n;
  }
  return Object.is(rounded, -0) ? 0 : rounded;
}
