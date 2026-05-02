import { calculate } from '../services/calculationService.js';

export function postCalculate(req, res, next) {
  try {
    const { expression, angleMode } = req.body || {};
    if (expression === undefined || expression === null) {
      const err = new Error('Expression is required.');
      err.code = 'INVALID_EXPRESSION';
      err.statusCode = 400;
      next(err);
      return;
    }
    const mode = angleMode === 'RAD' ? 'RAD' : 'DEG';
    const data = calculate(String(expression), mode);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
