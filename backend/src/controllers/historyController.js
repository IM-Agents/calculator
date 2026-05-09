import { clearHistory, getHistory } from "../services/historyService.js";
import { ensureSessionId } from "./calculationController.js";

export function readHistory(req, res) {
  const sessionId = ensureSessionId(req, res);
  res.status(200).json({
    success: true,
    data: { items: getHistory(sessionId) }
  });
}

export function deleteHistory(req, res) {
  const sessionId = ensureSessionId(req, res);
  clearHistory(sessionId);
  res.status(200).json({
    success: true,
    data: { cleared: true }
  });
}
