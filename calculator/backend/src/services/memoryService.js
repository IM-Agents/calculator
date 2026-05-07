let memoryValue = 0;

export function getMemory() {
  return memoryValue;
}

export function applyMemoryAction(action, value) {
  switch (action) {
    case 'M+': {
      const v = Number(value);
      if (!Number.isFinite(v)) throw new Error('VALIDATION_ERROR');
      memoryValue += v;
      break;
    }
    case 'M-': {
      const v = Number(value);
      if (!Number.isFinite(v)) throw new Error('VALIDATION_ERROR');
      memoryValue -= v;
      break;
    }
    case 'MR':
      break;
    case 'MC':
      memoryValue = 0;
      break;
    default:
      throw new Error('VALIDATION_ERROR');
  }
  return memoryValue;
}
