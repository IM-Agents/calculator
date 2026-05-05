const { applyFunction } = require('./mathHelpers')

function sanitizeExpression(expression) {
  return expression
    .replace(/\s+/g, '')
    .replace(/pi/g, String(Math.PI))
    .replace(/\be\b/g, String(Math.E))
    .replace(/(\d+(\.\d+)?)%/g, '($1/100)')
}

function evaluateExpression(expression, angleMode) {
  const sanitized = sanitizeExpression(expression)
  if (!/^[0-9+\-*/().,^A-Za-z]+$/.test(sanitized)) {
    throw new Error('Expression contains invalid characters.')
  }

  const transformed = sanitized
    .replace(/\^/g, '**')
    .replace(/(sin|cos|tan|sqrt|log|ln)\(([^()]+)\)/g, (_, fn, value) => {
      const output = applyFunction(fn, Number(value), angleMode)
      return `(${output})`
    })

  const evaluator = new Function(`return (${transformed});`)
  const result = evaluator()
  if (!Number.isFinite(result)) {
    throw new Error('Result is not finite.')
  }
  return result
}

module.exports = { evaluateExpression }
