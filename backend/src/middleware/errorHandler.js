function errorHandler(err, req, res, _next) {
  const code = err.code && typeof err.code === 'string' ? err.code : 'INTERNAL_ERROR';
  const statusFromCode = {
    EMPTY_EXPRESSION: 400,
    INVALID_EXPRESSION: 400,
    DIVISION_BY_ZERO: 422,
    NEGATIVE_SQRT: 422,
    INVALID_LOG_INPUT: 422,
    UNSUPPORTED_OPERATION: 422,
    INTERNAL_ERROR: 500,
  };
  const status = statusFromCode[code] || 500;
  const message =
    status === 500 && process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred.'
      : err.message || 'Unexpected error.';

  res.status(status).json({
    success: false,
    error: { code, message },
  });
}

module.exports = { errorHandler };
