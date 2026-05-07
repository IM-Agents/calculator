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
    if (err?.message === 'VALIDATION_ERROR' || err?.code === 'VALIDATION_ERROR') {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Invalid memory action or value.' },
      });
    }
    console.error('Unexpected memory operation error:', err);
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error.' },
    });
  }
}
