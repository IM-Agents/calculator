export function canEvaluate(expression) {
  return typeof expression === "string" && expression.trim().length > 0;
}

export function balanceClosingParens(expression) {
  let depth = 0;
  for (const ch of expression) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth < 0) return expression;
  }
  if (depth <= 0) return expression;
  return expression + ")".repeat(depth);
}

const trailingNumber = /(-?\d+(?:\.\d*)?)$/;

export function toggleSignOnTrailingNumber(expression) {
  if (!expression) return expression;
  const m = expression.match(trailingNumber);
  if (!m) return expression;
  const full = m[0];
  const start = m.index;
  const negated = String(-Number(full));
  return expression.slice(0, start) + negated;
}
