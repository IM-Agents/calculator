export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }
  const status = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message =
    status >= 500
      ? 'An unexpected error occurred. Please try again later.'
      : err.message || 'Request could not be processed.';
  res.status(status).json({
    success: false,
    error: { code, message },
  });
}
