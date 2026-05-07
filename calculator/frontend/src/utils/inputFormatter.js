export function canAppendDecimal(expression) {
  const trailing = getTrailingNumericSlice(expression);
  if (!trailing) return true;
  return !trailing.includes('.');
}

function getTrailingNumericSlice(expr) {
  const m = expr.match(/(\d+\.?\d*)$/);
  return m ? m[1] : '';
}
