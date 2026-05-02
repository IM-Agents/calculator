import { ERROR_CODES } from './constants.js';

export class CalculatorError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'CalculatorError';
    this.code = code;
  }
}

export function toErrorResponse(err) {
  if (err instanceof CalculatorError) {
    return {
      success: false,
      error: { code: err.code, message: err.message },
    };
  }
  return {
    success: false,
    error: {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: err?.message || 'An unexpected error occurred.',
    },
  };
}
