export function normalizeNumber(n) {
  if (!Number.isFinite(n)) return n;
  const rounded = Math.round(n * 1e12) / 1e12;
  return Object.is(rounded, -0) ? 0 : rounded;
}
