/**
 * Returns true if expression should be blocked from evaluate (empty only).
 * Numeric 0 is never treated as empty.
 */
export function isEvaluateEmpty(expression) {
  if (expression === null || expression === undefined) return true
  if (typeof expression !== 'string') return false
  return expression.trim() === ''
}

export function wouldDuplicateDecimal(expression, nextChar) {
  if (nextChar !== '.') return false
  const trimmed = expression.replace(/\s+$/, '')
  let i = trimmed.length - 1
  while (i >= 0 && /[0-9.]/.test(trimmed[i])) {
    if (trimmed[i] === '.') return true
    i -= 1
  }
  return false
}

export function lastOperatorAllowsDecimal(expression) {
  const t = expression.replace(/\s+$/, '')
  if (t === '') return true
  const last = t[t.length - 1]
  return /[0-9.]/.test(last) || last === ')'
}
