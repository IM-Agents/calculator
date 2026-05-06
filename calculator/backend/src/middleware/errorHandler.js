const CODE_STATUS = {
  EMPTY_EXPRESSION: 400,
  INVALID_EXPRESSION: 400,
  DIVISION_BY_ZERO: 422,
  NEGATIVE_SQRT: 422,
  INVALID_LOG_INPUT: 422,
  UNSUPPORTED_OPERATION: 422,
  INTERNAL_ERROR: 500,
};

const CODE_MESSAGES = {
  EMPTY_EXPRESSION: "Expression cannot be empty.",
  INVALID_EXPRESSION: "The expression is invalid.",
  DIVISION_BY_ZERO: "Cannot divide by zero.",
  NEGATIVE_SQRT: "Square root of a negative number is not supported.",
  INVALID_LOG_INPUT: "Logarithm requires a positive argument.",
  UNSUPPORTED_OPERATION: "This operation cannot be computed.",
  INTERNAL_ERROR: "Unexpected server error.",
};

export function errorHandler(err, _req, res, _next) {
  const code =
    typeof err?.message === "string" && CODE_STATUS[err.message]
      ? err.message
      : "INTERNAL_ERROR";

  const status = CODE_STATUS[code] ?? 500;
  const message = CODE_MESSAGES[code] ?? CODE_MESSAGES.INTERNAL_ERROR;

  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
    },
  });
}
