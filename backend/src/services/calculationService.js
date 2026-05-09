import { evaluateExpression } from "../utils/parser.js";
import { addHistoryItem } from "./historyService.js";

const VALID_MODES = new Set(["DEG", "RAD"]);

export function calculate({ expression, angleMode }, sessionId) {
  const normalizedExpression = typeof expression === "string" ? expression.trim() : "";
  if (!normalizedExpression) {
    const error = new Error("Expression cannot be empty.");
    error.code = "EMPTY_EXPRESSION";
    error.status = 400;
    throw error;
  }

  const mode = VALID_MODES.has(angleMode) ? angleMode : "DEG";
  const result = evaluateExpression(normalizedExpression, mode);
  const historyItem = addHistoryItem(sessionId, normalizedExpression, result);

  return {
    expression: normalizedExpression,
    result,
    angleMode: mode,
    historyItem
  };
}
