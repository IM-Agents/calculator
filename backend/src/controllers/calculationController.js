const { v4: uuidv4 } = require('uuid')
const { calculate } = require('../services/calculationService')
const { addHistoryEntry } = require('../services/historyService')

function calculateExpression(req, res, next) {
  try {
    const { expression, angleMode } = req.body
    const result = calculate({ expression, angleMode })
    const entry = {
      id: uuidv4(),
      expression: expression.trim(),
      result,
      createdAt: new Date().toISOString()
    }

    addHistoryEntry(req.calcSessionId, entry)
    res.json({ result, entry })
  } catch (error) {
    next(error)
  }
}

module.exports = { calculateExpression }
