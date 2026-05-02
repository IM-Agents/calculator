import { validateEvaluateBody, validateHistoryPost } from '../validators/calculator.validator.js';
import { evaluateRequest } from '../services/calculator.service.js';
import * as historyService from '../services/history.service.js';

export function health(req, res) {
  res.json({ success: true, message: 'Calculator API is healthy' });
}

export function evaluate(req, res, next) {
  try {
    const payload = validateEvaluateBody(req.body);
    const data = evaluateRequest(payload);
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
}

export function getHistory(req, res, next) {
  try {
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(req.query.limit || '50'), 10) || 50),
    );
    res.json({ success: true, data: historyService.listHistory(limit) });
  } catch (e) {
    next(e);
  }
}

export function postHistory(req, res, next) {
  try {
    const item = validateHistoryPost(req.body);
    const row = historyService.addHistoryEntry(item);
    res.status(201).json({ success: true, data: row });
  } catch (e) {
    next(e);
  }
}
