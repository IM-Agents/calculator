const SCALE = 1e12;

export function normalizeNumber(n) {
  if (!Number.isFinite(n)) return n;
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
