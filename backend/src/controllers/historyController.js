import { clearHistory, getHistory } from "../services/historyService.js";

export function getHistoryItems(req, res) {
  res.status(200).json({ items: getHistory(req.sessionId) });
}

export function deleteHistoryItems(req, res) {
  clearHistory(req.sessionId);
  res.status(204).send();
}
