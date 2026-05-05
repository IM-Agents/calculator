export function formatDisplay(value) {
  if (value === null || value === undefined || value === '') {
    return '0'
  }

  const number = Number(value)
  if (Number.isFinite(number)) {
    if (Math.abs(number) > 999999999 || (Math.abs(number) > 0 && Math.abs(number) < 0.000001)) {
      return number.toExponential(6)
    }
    return String(number)
  }

  return String(value)
}
