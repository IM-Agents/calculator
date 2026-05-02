import { evaluateExpression } from '../utils/parser.js';
import { addHistoryItem } from './historyService.js';

export function calculate(expression, angleMode, sessionId) {
  const result = evaluateExpression(expression, angleMode);
  const historyItem = addHistoryItem(sessionId, {
    expression: expression.trim(),
    result,
  });
  return {
    expression: expression.trim(),
    result,
    angleMode,
    historyItem,
  };
}
