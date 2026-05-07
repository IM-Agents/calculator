import { evaluateExpression, mapError } from './parserService.js';

export function calculate(payload) {
  try {
    const result = evaluateExpression(payload.expression, payload.angleMode);
    const formatted = formatNumber(result);
    return {
      success: true,
      data: {
        expression: payload.expression.trim(),
        result,
        formattedResult: formatted,
      },
    };
  } catch (err) {
    const code = err.code || err.message;
    if (code === 'EMPTY_INPUT') {
      return {
        success: false,
        error: { code: 'EMPTY_INPUT', message: 'Please enter a calculation before evaluating.' },
      };
    }
    const mapped = mapError(err);
    return { success: false, error: mapped };
  }
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return String(n);
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-10)) return n.toExponential(6);
  const rounded = Math.round(n * 1e12) / 1e12;
  return String(rounded);
}
