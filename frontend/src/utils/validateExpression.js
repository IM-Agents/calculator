export function isValidExpression(expression) {
  const trimmed = expression?.trim();
  return Boolean(trimmed);
}

export function canAppendDecimal(expression) {
  const token = expression.split(/[^0-9.]/).at(-1);
  return !token.includes(".");
}
