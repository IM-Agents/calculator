export function formatResult(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    if (Math.abs(value) > 1e15 || (Math.abs(value) < 1e-10 && value !== 0)) {
      return value.toExponential(6);
    }
    const rounded = Math.round(value * 1e12) / 1e12;
    if (Number.isInteger(rounded)) return String(rounded);
    return String(rounded);
  }
  return String(value);
}

export function toggleTrailingNumberSign(expr) {
  if (!expr || !expr.trim()) return expr;
  const re = /(-?\d+\.\d+|-?\d+\.|-?\.\d+|-?\d+)$/;
  const m = expr.match(re);
  if (!m) return expr;
  const numStr = m[1];
  const i = expr.lastIndexOf(numStr);
  const n = Number(numStr);
  if (!Number.isFinite(n)) return expr;
  const flipped = n === 0 ? numStr : String(-n);
  return expr.slice(0, i) + flipped;
}

export function appendDigit(expr, digit, lastWasEquals) {
  if (lastWasEquals) return digit;
  return expr + digit;
}

export function canAppendDecimal(expr, lastWasEquals) {
  const segment = lastWasEquals ? '' : expr;
  const tail = segment.split(/[^0-9.]/).pop() ?? '';
  return !tail.includes('.');
}
