export function appendChar(expression, char, options = {}) {
  const { allowDecimal = true } = options;
  if (char === '.' && !allowDecimal) return expression;
  return `${expression}${char}`;
}

export function applyPercentToLastNumber(expression) {
  if (!expression || !expression.trim()) return expression;
  return expression.replace(/((?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)$/, '($1/100)');
}

export function toggleSign(expression) {
  if (!expression) return expression;
  if (expression.endsWith(')')) {
    let balance = 0;
    let openIndex = -1;
    for (let i = expression.length - 1; i >= 0; i--) {
      const ch = expression[i];
      if (ch === ')') balance++;
      if (ch === '(') {
        balance--;
        if (balance === 0) {
          openIndex = i;
          break;
        }
      }
    }
    if (openIndex !== -1) {
      const suffixStart = openIndex > 0 && expression[openIndex - 1] === '-' ? openIndex - 1 : openIndex;
      const suffix = expression.slice(suffixStart);
      const toggledSuffix = suffix.startsWith('-(') ? suffix.slice(1) : `-${suffix}`;
      return expression.slice(0, suffixStart) + toggledSuffix;
    }
  }
  const m = expression.match(/(-?)((?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)$/);
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
  if (/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(trimmed)) {
    return Number.parseFloat(trimmed);
  }
  return NaN;
}
