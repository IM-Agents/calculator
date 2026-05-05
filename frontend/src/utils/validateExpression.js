export function hasDoubleDecimalInLastToken(expression) {
  if (expression == null) {
    return false;
  }
  let j = expression.length - 1;
  while (j >= 0 && /[0-9.]/.test(expression[j])) j -= 1;
  const token = expression.slice(j + 1);
  return (token.match(/\./g) || []).length > 1;
}

export function isEmptyForEvaluate(expression) {
  if (expression === undefined || expression === null) {
    return true;
  }
  if (typeof expression === 'number') {
    return false;
  }
  return String(expression).trim() === '';
}
