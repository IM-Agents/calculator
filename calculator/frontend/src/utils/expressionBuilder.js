export function appendChar(expression, char, options = {}) {
  const { allowDecimal = true } = options;
  if (char === '.' && !allowDecimal) return expression;
  return `${expression}${char}`;
}

export function applyPercentToLastNumber(expression) {
  if (!expression || !expression.trim()) return expression;
  return expression.replace(/(\d+\.?\d*)$/, '($1/100)');
}

export function toggleSign(expression) {
  if (!expression) return expression;
  if (expression.endsWith(')')) {
    return expression.startsWith('-(') ? expression.slice(1) : `-${expression}`;
  }
  const m = expression.match(/(-?)(\d+\.?\d*)$/);
  if (!m) return expression;
  const [, sign, num] = m;
  const flipped = sign === '-' ? num : `-${num}`;
  return expression.slice(0, expression.length - m[0].length) + flipped;
}

export function memoryOperandValue(expression, displayResult, pendingFreshNumber) {
  if (
    pendingFreshNumber &&
    displayResult !== '' &&
    Number.isFinite(Number(displayResult))
  ) {
    return Number(displayResult);
  }
  const trimmed = expression.trim();
  if (/^-?\d+\.?\d*$/.test(trimmed)) {
    return Number.parseFloat(trimmed);
  }
  return NaN;
}
