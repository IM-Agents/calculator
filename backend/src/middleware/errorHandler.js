export function notFoundHandler(_req, res) {
  res.status(404).json({
    code: "NOT_FOUND",
    message: "Route not found."
  });
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status ?? 500;
  const code = error.code ?? "INTERNAL_SERVER_ERROR";
  const message = error.message ?? "Unexpected server error.";

  res.status(status).json({ code, message });
}
