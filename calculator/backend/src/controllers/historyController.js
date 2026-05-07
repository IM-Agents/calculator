import * as historyService from '../services/historyService.js';

function getSessionId(req) {
  return req.get('x-session-id') || req.ip;
}

export function getHistory(_req, res) {
  const sessionId = getSessionId(_req);
  return res.json({ success: true, data: historyService.listHistory(sessionId) });
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
  const sessionId = getSessionId(req);
  historyService.addHistory(sessionId, expression.trim(), parsedResult);
  return res.status(201).json({ success: true, data: historyService.listHistory(sessionId) });
}

export function deleteHistory(req, res) {
  historyService.clearHistory(getSessionId(req));
  return res.json({ success: true, data: null });
}
