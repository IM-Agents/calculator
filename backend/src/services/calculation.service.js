import { evaluateExpression, mapParserError } from '../utils/parser.js';
import { addHistoryItem } from './history.service.js';

/**
 * @param {string} expression
 * @param {'deg' | 'rad'} angleMode
 */
export function evaluate(expression, angleMode) {
  try {
    const trimmed = String(expression).trim();
    if (!trimmed) {
      return {
        ok: false,
        error: {
          code: 'INVALID_EXPRESSION',
          message: 'Expression is required.',
        },
      };
    }
    const result = evaluateExpression(trimmed, angleMode);
    addHistoryItem(trimmed, result);
    return {
      ok: true,
      data: {
        expression: trimmed,
        result,
        angleMode,
      },
    };
  } catch (e) {
    const { code, message } = mapParserError(e);
    return {
      ok: false,
      error: { code, message },
    };
  }
}
