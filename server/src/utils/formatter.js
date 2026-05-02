const SCALE = 1e12;

export function normalizeNumber(n) {
  if (!Number.isFinite(n)) return n;
  if (Math.abs(n) > Number.MAX_VALUE / SCALE) {
    return Object.is(n, -0) ? 0 : n;
  }
  const scaled = n * SCALE;
  if (!Number.isFinite(scaled)) {
    return Object.is(n, -0) ? 0 : n;
  }
  const rounded = Math.round(scaled) / SCALE;
  return Object.is(rounded, -0) ? 0 : rounded;
}
