import { clearHistory, getHistory } from '../services/historyService.js';

export function getHistoryList(req, res) {
  res.status(200).json({
    success: true,
    data: { items: getHistory(req.sessionId) },
  });
}

export function deleteHistory(req, res) {
  clearHistory(req.sessionId);
  res.status(200).json({
    success: true,
    data: { cleared: true },
  });
}
