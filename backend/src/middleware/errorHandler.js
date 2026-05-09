export function notFoundHandler(_req, _res, next) {
  const error = new Error("Route not found.");
  error.code = "NOT_FOUND";
  error.status = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status ?? 500;
  const code = error.code ?? "INTERNAL_ERROR";
  const message = status === 500 ? "Something went wrong." : error.message;

  res.status(status).json({
    success: false,
    error: {
      code,
      message
    }
  });
}
