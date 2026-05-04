const { calculate } = require('../services/calculationService');
const historyService = require('../services/historyService');

function classifyExpressionError(expression) {
  if (expression === null || expression === undefined) {
    return { status: 400, code: 'EMPTY_EXPRESSION', message: 'Expression is required.' };
  }
  if (typeof expression !== 'string') {
    return { status: 400, code: 'INVALID_EXPRESSION', message: 'Expression must be a string.' };
  }
  if (expression.trim() === '') {
    return { status: 400, code: 'EMPTY_EXPRESSION', message: 'Expression cannot be empty.' };
  }
  return null;
}

function postCalculate(req, res, next) {
  try {
    const { expression, angleMode } = req.body || {};
    const bad = classifyExpressionError(expression);
    if (bad) {
      res.status(bad.status).json({
        success: false,
        error: { code: bad.code, message: bad.message },
      });
      return;
    }

    const mode = angleMode === 'RAD' || angleMode === 'DEG' ? angleMode : 'DEG';
    const data = calculate(expression, mode);
    const historyItem = historyService.addEntry(req.calcSessionId, data.expression, data.result);

    res.json({
      success: true,
      data: {
        expression: data.expression,
        result: data.result,
        angleMode: data.angleMode,
        historyItem,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { postCalculate };
