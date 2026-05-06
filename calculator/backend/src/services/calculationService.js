import { evaluateExpression } from "../utils/parser.js";
import { addHistoryItem } from "./historyService.js";

export function calculate(expression, angleMode) {
  const trimmedExpression = expression?.trim?.() ?? "";
  const normalizedAngleMode = angleMode === "RAD" ? "RAD" : "DEG";
  const result = evaluateExpression(trimmedExpression, normalizedAngleMode);
  const historyItem = addHistoryItem({
    expression: trimmedExpression,
    result,
    angleMode: normalizedAngleMode,
  });
  return {
    expression: trimmedExpression,
    result,
    angleMode: normalizedAngleMode,
    historyItem,
  };
}
