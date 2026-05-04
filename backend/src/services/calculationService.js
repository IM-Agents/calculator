const { evaluateExpression } = require('../utils/parser');

function normalizeAngleMode(mode) {
  return mode === 'RAD' ? 'RAD' : 'DEG';
}

function calculate(expression, angleMode) {
  const mode = normalizeAngleMode(angleMode);
  const result = evaluateExpression(expression, mode);
  return { expression: expression.trim(), result: result, angleMode: mode };
}

module.exports = { calculate, normalizeAngleMode };
