const MAX_LEN = 28;

export function formatDisplayValue(value) {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'number') {
    const s = String(value);
    if (s.length <= MAX_LEN) return s;
    return value.toExponential(8);
  }
  const str = String(value);
  if (str.length <= MAX_LEN) return str;
  return `…${str.slice(-(MAX_LEN - 1))}`;
}
