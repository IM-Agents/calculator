export function errorHandler(err, _req, res, _next) {
  const status = err.status ?? 500;
  const message =
    status === 500 ? 'An unexpected error occurred.' : err.message;
  res.status(status).json({
    success: false,
    error: {
      code: err.code ?? 'INTERNAL_ERROR',
      message,
    },
  });
}
