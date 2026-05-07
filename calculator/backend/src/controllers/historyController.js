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
  const numericStringPattern = /^-?\d+(\.\d+)?$/;
  const parsedResult =
    typeof result === 'number'
      ? result
      : typeof result === 'string' && numericStringPattern.test(result.trim())
        ? Number.parseFloat(result.trim())
        : Number.NaN;

  if (!Number.isFinite(parsedResult)) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'result must be a finite number.' },
    });
  }
  historyService.addHistory(expression.trim(), parsedResult);
  return res.status(201).json({ success: true, data: historyService.listHistory() });
}

export function deleteHistory(_req, res) {
  historyService.clearHistory();
  return res.json({ success: true, data: null });
}
