// Span positions align with backend `parser.js` tokenize rules.
function tokenizeWithSpans(input) {
  const s = String(input);
  const tokens = [];
  let i = 0;

  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) {
      i += 1;
      continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s[i + 1]))) {
      const start = i;
      while (i < s.length && /[0-9.]/.test(s[i])) {
        i += 1;
      }
      tokens.push({ type: 'NUMBER', start, end: i });
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      const start = i;
      while (i < s.length && /[a-zA-Z]/.test(s[i])) {
        i += 1;
      }
      tokens.push({ type: 'IDENT', start, end: i });
      continue;
    }
    if ('+-*/^%()'.includes(c)) {
      const start = i;
      i += 1;
      tokens.push({ type: c, start, end: i });
      continue;
    }
    i += 1;
  }
  return tokens;
}

function skipSpacesLeft(str, i) {
  let j = i;
  while (j >= 0 && /\s/.test(str[j])) {
    j -= 1;
  }
  return j;
}

/**
 * If the last numeric literal is preceded by a binary + or - (addition-level),
 * flip that operator and keep the literal digits — e.g. `5-3` <-> `5+3`.
 * Returns null if a different rewrite (numeric negation) should apply.
 */
function tryFlipBinaryOperatorBeforeLastNumber(str, lastNum) {
  const opIdx = skipSpacesLeft(str, lastNum.start - 1);
  if (opIdx < 0) return null;
  const op = str[opIdx];
  if (op !== '+' && op !== '-') return null;
  const prevIdx = skipSpacesLeft(str, opIdx - 1);
  if (prevIdx < 0) return null;
  const prev = str[prevIdx];
  if (!/[0-9)]/.test(prev)) return null;
  const flippedOp = op === '-' ? '+' : '-';
  return str.slice(0, opIdx) + flippedOp + str.slice(opIdx + 1);
}

function formatNegatedNumber(n) {
  const flipped = -n;
  if (Object.is(flipped, -0) || flipped === 0) {
    return '0';
  }
  return String(flipped);
}

export function toggleTrailingNumberSign(expr) {
  if (expr == null || expr === '') {
    return '-0';
  }
  const str = String(expr);
  const tokens = tokenizeWithSpans(str);
  let lastNum = null;
  for (let t = tokens.length - 1; t >= 0; t -= 1) {
    if (tokens[t].type === 'NUMBER') {
      lastNum = tokens[t];
      break;
    }
  }
  if (!lastNum) {
    return str;
  }
  const binaryFlipped = tryFlipBinaryOperatorBeforeLastNumber(str, lastNum);
  if (binaryFlipped != null) {
    return binaryFlipped;
  }
  const slice = str.slice(lastNum.start, lastNum.end);
  const n = Number(slice);
  if (Number.isNaN(n)) {
    return str;
  }
  let nextNum = formatNegatedNumber(n);
  let prefix = str.slice(0, lastNum.start);
  if (prefix.endsWith('-') && nextNum.startsWith('-')) {
    prefix = prefix.slice(0, -1);
    nextNum = nextNum.slice(1);
  }
  return prefix + nextNum + str.slice(lastNum.end);
}
