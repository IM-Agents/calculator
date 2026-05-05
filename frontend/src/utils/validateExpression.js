export function validateExpression(expression) {
  if (typeof expression !== 'string') {
    return 'Expression must be text.'
  }

  if (!expression.trim()) {
    return 'Expression cannot be empty.'
  }

  if (!/^[0-9+\-*/().,%^\sA-Za-z]+$/.test(expression)) {
    return 'Expression contains invalid characters.'
  }

  return ''
}
