import { calculate } from '../services/calculationService.js';
import * as historyService from '../services/historyService.js';
import { validateCalculateBody } from '../validators/calculationValidator.js';

export function postCalculate(req, res) {
  const validation = validateCalculateBody(req.body);
  if (!validation.ok) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: validation.errors.join(' '),
      },
    });
  }
  const { expression } = req.body;
  const result = calculate({
    expression,
    angleMode: validation.angleMode,
  });
  if (result.success && result.data) {
    historyService.addHistory(result.data.expression, result.data.result);
  }
  const status = result.success ? 200 : 400;
  return res.status(status).json(result);
}

export function getHealth(_req, res) {
  return res.json({ success: true, message: 'Calculator API is running' });
}
