import { clearHistory, getHistory } from '../services/historyService.js';

export function getHistoryList(req, res) {
  res.status(200).json({
    success: true,
    data: { items: getHistory() },
  });
}

export function deleteHistory(req, res) {
  clearHistory();
  res.status(200).json({
    success: true,
    data: { cleared: true },
  });
}
