const EPSILON = 1e-12;

export function toRadians(value, angleMode) {
  return angleMode === "DEG" ? (value * Math.PI) / 180 : value;
}

export function ensureFinite(value) {
  if (!Number.isFinite(value)) {
    const error = new Error("Result is not a finite number.");
    error.code = "INVALID_EXPRESSION";
    error.status = 400;
    throw error;
  }
  return value;
}

export function divide(left, right) {
  if (Math.abs(right) < EPSILON) {
    const error = new Error("Cannot divide by zero.");
    error.code = "DIVISION_BY_ZERO";
    error.status = 422;
    throw error;
  }
  return left / right;
}

export function sqrt(value) {
  if (value < 0) {
    const error = new Error("Cannot calculate square root of a negative number.");
    error.code = "NEGATIVE_SQRT";
    error.status = 422;
    throw error;
  }
  return Math.sqrt(value);
}

export function log10(value) {
  if (value <= 0) {
    const error = new Error("Logarithm input must be greater than zero.");
    error.code = "INVALID_LOG_INPUT";
    error.status = 422;
    throw error;
  }
  return Math.log10(value);
}

export function ln(value) {
  if (value <= 0) {
    const error = new Error("Natural logarithm input must be greater than zero.");
    error.code = "INVALID_LOG_INPUT";
    error.status = 422;
    throw error;
  }
  return Math.log(value);
}
