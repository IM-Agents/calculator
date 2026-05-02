export function toRadians(value, angleMode) {
  if (angleMode === 'RAD') return value;
  return (value * Math.PI) / 180;
}

export function sinSafe(arg, angleMode) {
  const r = toRadians(arg, angleMode);
  const y = Math.sin(r);
  if (Number.isNaN(y)) {
    const err = new Error('Invalid input for sin.');
    err.code = 'UNSUPPORTED_OPERATION';
    err.statusCode = 422;
    throw err;
  }
  return y;
}

export function cosSafe(arg, angleMode) {
  const r = toRadians(arg, angleMode);
  const y = Math.cos(r);
  if (Number.isNaN(y)) {
    const err = new Error('Invalid input for cos.');
    err.code = 'UNSUPPORTED_OPERATION';
    err.statusCode = 422;
    throw err;
  }
  return y;
}

export function tanSafe(arg, angleMode) {
  const r = toRadians(arg, angleMode);
  const c = Math.cos(r);
  if (Math.abs(c) < 1e-15) {
    const err = new Error('Tangent is undefined for this angle.');
    err.code = 'UNSUPPORTED_OPERATION';
    err.statusCode = 422;
    throw err;
  }
  return Math.sin(r) / c;
}

export function sqrtSafe(x) {
  if (x < 0) {
    const err = new Error('Cannot take the square root of a negative number.');
    err.code = 'NEGATIVE_SQRT';
    err.statusCode = 422;
    throw err;
  }
  return Math.sqrt(x);
}

export function log10Safe(x) {
  if (x <= 0) {
    const err = new Error('Logarithm is only defined for positive numbers.');
    err.code = 'INVALID_LOG_INPUT';
    err.statusCode = 422;
    throw err;
  }
  return Math.log10(x);
}

export function lnSafe(x) {
  if (x <= 0) {
    const err = new Error('Natural logarithm is only defined for positive numbers.');
    err.code = 'INVALID_LOG_INPUT';
    err.statusCode = 422;
    throw err;
  }
  return Math.log(x);
}

export function normalizeNumber(n) {
  if (!Number.isFinite(n)) {
    const err = new Error('Result is not a finite number.');
    err.code = 'UNSUPPORTED_OPERATION';
    err.statusCode = 422;
    throw err;
  }
  const rounded = Math.round(n * 1e12) / 1e12;
  return Object.is(rounded, -0) ? 0 : rounded;
}
