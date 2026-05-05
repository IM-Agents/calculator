import { ApiError } from "../utils/errors.js";
import { evaluateExpression } from "../utils/parser.js";

export function calculate({ expression, angleMode = "DEG" }) {
  if (expression === null || expression === undefined) {
    throw new ApiError(400, "EMPTY_EXPRESSION", "Expression is required.");
  }
  if (typeof expression !== "string") {
    throw new ApiError(400, "INVALID_EXPRESSION", "Expression must be a string.");
  }
  const sanitized = expression.trim();
  if (!sanitized) {
    throw new ApiError(400, "EMPTY_EXPRESSION", "Expression must not be blank.");
  }
  if (!["DEG", "RAD"].includes(angleMode)) {
    throw new ApiError(400, "INVALID_ANGLE_MODE", "angleMode must be DEG or RAD.");
  }

  const result = evaluateExpression(sanitized, angleMode);
  return { expression: sanitized, result };
}
