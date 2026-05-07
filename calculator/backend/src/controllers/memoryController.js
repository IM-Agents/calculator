import * as memoryService from '../services/memoryService.js';

export function getMemory(_req, res) {
  return res.json({ success: true, data: { memoryValue: memoryService.getMemory() } });
}

export function postMemory(req, res) {
  try {
    const { action, value } = req.body || {};
    const next = memoryService.applyMemoryAction(action, value);
    return res.json({ success: true, data: { memoryValue: next } });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid memory action or value.' },
    });
  }
}
