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
    const exprType = typeof expression;
    if (exprType !== 'string' && exprType !== 'number') {
      const err = new Error('Expression must be a string or number.');
      err.code = 'INVALID_EXPRESSION';
      err.statusCode = 400;
      next(err);
      return;
    }
    if (exprType === 'number' && !Number.isFinite(expression)) {
      const err = new Error('Expression must be a finite number.');
      err.code = 'INVALID_EXPRESSION';
      err.statusCode = 400;
      next(err);
      return;
    }
    const exprStr = exprType === 'number' ? String(expression) : String(expression).trim();
    if (exprStr === '') {
      const err = new Error('Expression cannot be empty.');
      err.code = 'EMPTY_EXPRESSION';
      err.statusCode = 400;
      next(err);
      return;
    }
    const mode = angleMode === 'RAD' ? 'RAD' : 'DEG';
    const data = calculate(exprStr, mode, req.sessionId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
