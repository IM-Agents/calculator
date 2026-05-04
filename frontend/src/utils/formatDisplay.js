export function formatResult(value) {
  if (value === null || value === undefined) return ''
  if (typeof value !== 'number' || !Number.isFinite(value)) return String(value)
  const abs = Math.abs(value)
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) {
    return value.toExponential(6)
  }
  const s = String(Math.round(value * 1e12) / 1e12)
  return s
}

export function truncateExpression(text, maxLen = 48) {
  if (!text) return ''
  if (text.length <= maxLen) return text
  return `…${text.slice(-(maxLen - 1))}`
}
