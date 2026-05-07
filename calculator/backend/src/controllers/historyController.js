import * as historyService from '../services/historyService.js';

export function getHistory(_req, res) {
  return res.json({ success: true, data: historyService.listHistory() });
}

export function postHistory(req, res) {
  const { expression, result } = req.body || {};
  if (typeof expression !== 'string' || expression.trim() === '') {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'expression is required.' },
    });
  }
  const r = Number(result);
  if (!Number.isFinite(r)) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'result must be a finite number.' },
    });
  }
  historyService.addHistory(expression.trim(), r);
  return res.status(201).json({ success: true, data: historyService.listHistory() });
}

export function deleteHistory(_req, res) {
  historyService.clearHistory();
  return res.json({ success: true, message: 'History cleared successfully' });
}
