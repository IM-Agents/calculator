import { ANGLE_MODES, UNARY_FUNCS, ERROR_CODES } from '../utils/constants.js';
import { CalculatorError } from '../utils/errors.js';

function assertAngleMode(angleMode) {
  if (!ANGLE_MODES.includes(angleMode)) {
    throw new CalculatorError(
      ERROR_CODES.VALIDATION_ERROR,
      `angleMode must be one of: ${ANGLE_MODES.join(', ')}`,
    );
  }
}

export function validateEvaluateBody(body) {
  if (!body || typeof body !== 'object') {
    throw new CalculatorError(
      ERROR_CODES.VALIDATION_ERROR,
      'Request body must be a JSON object.',
    );
  }
  const angleMode = body.angleMode === 'rad' ? 'rad' : 'deg';
  assertAngleMode(angleMode);

  if (typeof body.expression === 'string') {
    const expr = body.expression.trim();
    if (!expr) {
      throw new CalculatorError(
        ERROR_CODES.EMPTY_INPUT,
        'Expression cannot be empty.',
      );
    }
    return { type: 'expression', expression: expr, angleMode };
  }

  if (body.operation != null && Array.isArray(body.operands)) {
    const op = String(body.operation).trim().toLowerCase();
    if (!UNARY_FUNCS.has(op)) {
      throw new CalculatorError(
        ERROR_CODES.UNSUPPORTED_OPERATION,
        `Unsupported operation: ${body.operation}`,
      );
    }
    if (body.operands.length !== 1) {
      throw new CalculatorError(
        ERROR_CODES.VALIDATION_ERROR,
        'Structured requests require exactly one operand for unary functions.',
      );
    }
    const x = body.operands[0];
    if (typeof x !== 'number' || !Number.isFinite(x)) {
      throw new CalculatorError(
        ERROR_CODES.VALIDATION_ERROR,
        'Operand must be a finite number.',
      );
    }
    return { type: 'structured', operation: op, operands: [x], angleMode };
  }

  throw new CalculatorError(
    ERROR_CODES.VALIDATION_ERROR,
    'Provide either a non-empty expression string or operation + operands.',
  );
}

export function validateHistoryPost(body) {
  if (!body || typeof body !== 'object') {
    throw new CalculatorError(
      ERROR_CODES.VALIDATION_ERROR,
      'Request body must be a JSON object.',
    );
  }
  if (typeof body.expression !== 'string' || !body.expression.trim()) {
    throw new CalculatorError(
      ERROR_CODES.VALIDATION_ERROR,
      'expression is required.',
    );
  }
  if (typeof body.result !== 'number' || !Number.isFinite(body.result)) {
    throw new CalculatorError(
      ERROR_CODES.VALIDATION_ERROR,
      'result must be a finite number.',
    );
  }
  const angleMode = body.angleMode === 'rad' ? 'rad' : 'deg';
  assertAngleMode(angleMode);
  return {
    expression: body.expression.trim(),
    result: body.result,
    angleMode,
  };
}
