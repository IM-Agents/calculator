import { clearHistory, listHistory } from "../services/historyService.js";

export function getHistory(_req, res) {
  return res.status(200).json({
    success: true,
    data: { items: listHistory() },
  });
}

export function deleteHistory(_req, res) {
  clearHistory();
  return res.status(200).json({
    success: true,
    data: { cleared: true },
  });
}
