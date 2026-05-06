import { evaluateExpression } from "../utils/parser.js";
import { addHistoryItem } from "./historyService.js";

export function calculate(expression, angleMode) {
  const result = evaluateExpression(expression, angleMode);
  const historyItem = addHistoryItem({ expression: expression.trim(), result });
  return {
    expression: expression.trim(),
    result,
    angleMode: angleMode === "RAD" ? "RAD" : "DEG",
    historyItem,
  };
}
