/**
 * Map display symbols to API-safe expression fragments.
 */
export function toApiExpression(display) {
  return display
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'π')
}

/**
 * Toggle sign on in-progress expression (README behavior).
 */
export function toggleSignOnExpression(expr) {
  const s = expr.replace(/\s+$/, '')
  if (s === '') return s

  const endToken = /(-)?(\d+\.?\d*|\d*\.\d+)$/
  const m = s.match(endToken)
  if (!m) return s

  const full = m[0]
  const unaryMinus = Boolean(m[1])
  const num = m[2]
  const startIdx = s.length - full.length
  const opIdx = startIdx - 1

  const isBinaryPlusMinus = (idx) => {
    if (idx < 0) return false
    const op = s[idx]
    if (op !== '+' && op !== '-') return false
    if (idx === 0) return false
    const prev = s[idx - 1]
    return /[0-9)]/.test(prev)
  }

  if (!unaryMinus && isBinaryPlusMinus(opIdx)) {
    const flipped = s[opIdx] === '+' ? '-' : '+'
    return s.slice(0, opIdx) + flipped + num
  }

  if (unaryMinus) {
    return s.slice(0, startIdx) + num
  }

  if (s[startIdx - 1] === '(') {
    return `${s.slice(0, startIdx)}-${num}`
  }

  const neg = `-${num}`
  if (startIdx >= 1 && s.slice(startIdx - 2, startIdx) === '*-') {
    return `${s.slice(0, startIdx - 1)}${num}`
  }
  return `${s.slice(0, startIdx)}${neg}`
}
