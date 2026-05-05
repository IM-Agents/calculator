const { evaluateExpression } = require('../utils/parser')

function calculate({ expression, angleMode }) {
  if (expression === null || expression === undefined) {
    const error = new Error('Expression is required.')
    error.status = 400
    error.code = 'EMPTY_EXPRESSION'
    throw error
  }

  if (typeof expression !== 'string' || expression.trim() === '') {
    const error = new Error('Expression cannot be blank.')
    error.status = 400
    error.code = 'INVALID_EXPRESSION'
    throw error
  }

  try {
    return evaluateExpression(expression, angleMode || 'DEG')
  } catch (rawError) {
    const error = new Error(rawError.message || 'Invalid expression.')
    error.status = 400
    error.code = 'INVALID_EXPRESSION'
    throw error
  }
}

module.exports = { calculate }
