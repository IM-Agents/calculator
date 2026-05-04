const DEG2RAD = Math.PI / 180;

function toRadians(value, angleMode) {
  if (angleMode === 'RAD') return value;
  return value * DEG2RAD;
}

function sin(angleMode, x) {
  return Math.sin(toRadians(x, angleMode));
}

function cos(angleMode, x) {
  return Math.cos(toRadians(x, angleMode));
}

function tan(angleMode, x) {
  const r = Math.tan(toRadians(x, angleMode));
  if (!Number.isFinite(r)) {
    const err = new Error('Tangent undefined for this angle.');
    err.code = 'UNSUPPORTED_OPERATION';
    throw err;
  }
  return r;
}

function sqrt(x) {
  if (x < 0) {
    const err = new Error('Cannot take square root of a negative number.');
    err.code = 'NEGATIVE_SQRT';
    throw err;
  }
  return Math.sqrt(x);
}

function log10(x) {
  if (x <= 0) {
    const err = new Error('Logarithm input must be positive.');
    err.code = 'INVALID_LOG_INPUT';
    throw err;
  }
  return Math.log10(x);
}

function ln(x) {
  if (x <= 0) {
    const err = new Error('Natural logarithm input must be positive.');
    err.code = 'INVALID_LOG_INPUT';
    throw err;
  }
  return Math.log(x);
}

function normalizeResult(n) {
  if (!Number.isFinite(n)) {
    const err = new Error('Result is not a finite number.');
    err.code = 'UNSUPPORTED_OPERATION';
    throw err;
  }
  const rounded = Math.round(n * 1e12) / 1e12;
  return Object.is(rounded, -0) ? 0 : rounded;
}

module.exports = {
  sin,
  cos,
  tan,
  sqrt,
  log10,
  ln,
  normalizeResult,
};
