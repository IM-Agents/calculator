import { evaluateExpression, mapParserError } from '../utils/parser.js';
import { addHistoryItem } from './history.service.js';

/**
 * @param {string} expression
 * @param {'deg' | 'rad'} angleMode
 */
export function evaluate(expression, angleMode) {
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

  let result;
  try {
    result = evaluateExpression(trimmed, angleMode);
  } catch (e) {
    const { code, message } = mapParserError(e);
    return {
      ok: false,
      error: { code, message },
    };
  }

  try {
    addHistoryItem(trimmed, result);
  } catch {
    return {
      ok: false,
      error: {
        code: 'HISTORY_WRITE_FAILED',
        message: 'Could not persist calculation history.',
      },
    };
  }

  return {
    ok: true,
    data: {
      expression: trimmed,
      result,
      angleMode,
    },
  };
}
