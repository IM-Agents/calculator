import { calculate } from "../services/calculationService.js";
import { addHistoryItem } from "../services/historyService.js";

export function calculateExpression(req, res, next) {
  try {
    const payload = calculate(req.body ?? {});
    addHistoryItem(req.sessionId, payload.expression, payload.result);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
