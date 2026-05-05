export function validateExpression(expression) {
  if (expression === null || expression === undefined) return false;
  if (typeof expression !== "string") return false;
  return expression.trim().length > 0;
}
