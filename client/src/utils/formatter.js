export function formatDisplayValue(value) {
  if (value === '' || value == null) return '0';
  const s = String(value);
  if (s.length > 18) {
    const n = Number(s);
    if (Number.isFinite(n)) return n.toPrecision(12);
  }
  return s;
}
