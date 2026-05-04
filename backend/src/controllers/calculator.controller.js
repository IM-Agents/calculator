import { evaluate } from '../services/calculation.service.js';
import {
  getHistory,
  clearHistory,
} from '../services/history.service.js';

export function postEvaluate(req, res) {
  const { expression, angleMode } = req.body ?? {};
  if (typeof expression !== 'string' || !expression.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_EXPRESSION',
        message: 'Expression is required and must be a non-empty string.',
      },
    });
  }
  if (angleMode !== 'deg' && angleMode !== 'rad') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_ANGLE_MODE',
        message: 'angleMode must be "deg" or "rad".',
      },
    });
  }

  const out = evaluate(expression, angleMode);
  if (!out.ok) {
    return res.status(400).json({
      success: false,
      error: out.error,
    });
  }
  return res.json({ success: true, data: out.data });
}

export function getHistoryHandler(_req, res) {
  res.json({ success: true, data: getHistory() });
}

export function deleteHistoryHandler(_req, res) {
  clearHistory();
  res.json({ success: true, message: 'History cleared successfully.' });
}
