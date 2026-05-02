import { CalculatorError, toErrorResponse } from '../utils/errors.js';
import { ERROR_CODES } from '../utils/constants.js';

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }
  const status =
    err instanceof CalculatorError &&
    err.code === ERROR_CODES.VALIDATION_ERROR
      ? 400
      : err instanceof CalculatorError
        ? 400
        : 500;
  res.status(status).json(toErrorResponse(err));
}
