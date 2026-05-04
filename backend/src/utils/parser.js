const FUNCS = new Set(['sin', 'cos', 'tan', 'sqrt', 'log', 'ln']);
const CONSTS = new Map([
  ['pi', Math.PI],
  ['e', Math.E],
]);

const PREC = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
  u: 4,
};

function isDigit(c) {
  return c >= '0' && c <= '9';
}

function isIdentStart(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
}

function isIdentPart(c) {
  return isIdentStart(c) || isDigit(c);
}

/**
 * @param {string} input
 * @returns {{ type: string, value?: string|number }[]}
 */
export function tokenize(input) {
  const s = input.replace(/\s+/g, '');
  if (!s.length) throw new Error('EMPTY');

  const tokens = [];
  let i = 0;

  const unaryContext = () => {
    if (tokens.length === 0) return true;
    const prev = tokens[tokens.length - 1];
    return (
      prev.type === 'OP' ||
      prev.type === 'LPAREN' ||
      prev.type === 'COMMA' ||
      prev.type === 'U'
    );
  };

  while (i < s.length) {
    const c = s[i];

    if (c === '(') {
      tokens.push({ type: 'LPAREN' });
      i += 1;
      continue;
    }
    if (c === ')') {
      tokens.push({ type: 'RPAREN' });
      i += 1;
      continue;
    }
    if (c === ',') {
      tokens.push({ type: 'COMMA' });
      i += 1;
      continue;
    }

    if (c === '+' || c === '*' || c === '/' || c === '%' || c === '^') {
      tokens.push({ type: 'OP', value: c });
      i += 1;
      continue;
    }

    if (c === '-') {
      if (unaryContext()) {
        tokens.push({ type: 'U' });
      } else {
        tokens.push({ type: 'OP', value: '-' });
      }
      i += 1;
      continue;
    }

    if (isDigit(c) || (c === '.' && i + 1 < s.length && isDigit(s[i + 1]))) {
      let j = i;
      let dotSeen = c === '.';
      j += 1;
      while (j < s.length) {
        if (isDigit(s[j])) {
          j += 1;
          continue;
        }
        if (s[j] === '.' && !dotSeen) {
          dotSeen = true;
          j += 1;
          continue;
        }
        break;
      }
      const raw = s.slice(i, j);
      if (raw === '.') throw new Error('BAD_NUMBER');
      const n = Number(raw);
      if (!Number.isFinite(n)) throw new Error('BAD_NUMBER');
      tokens.push({ type: 'NUM', value: n });
      i = j;
      continue;
    }

    if (isIdentStart(c)) {
      let j = i + 1;
      while (j < s.length && isIdentPart(s[j])) j += 1;
      const name = s.slice(i, j).toLowerCase();
      i = j;
      if (FUNCS.has(name)) {
        if (i >= s.length || s[i] !== '(') throw new Error('FUNC_PAREN');
        tokens.push({ type: 'FUNC', value: name });
        tokens.push({ type: 'LPAREN' });
        i += 1;
        continue;
      }
      if (CONSTS.has(name)) {
        tokens.push({ type: 'NUM', value: CONSTS.get(name) });
        continue;
      }
      throw new Error('UNKNOWN_IDENT');
    }

    throw new Error('BAD_CHAR');
  }

  return tokens;
}

function toRpn(tokens) {
  const out = [];
  const stack = [];

  const popOps = (op) => {
    while (stack.length) {
      const top = stack[stack.length - 1];
      if (top === '(') break;
      if (top.type === 'FUNC') {
        out.push(stack.pop());
        continue;
      }
      if (top === 'U') {
        if (PREC.u > PREC[op]) {
          out.push(stack.pop());
          continue;
        }
        break;
      }
      if (top.type === 'OP') {
        const t = top.value;
        const pTop = PREC[t];
        const pCur = op === 'U' ? PREC.u : PREC[op];
        if (pTop > pCur || (pTop === pCur && op !== '^')) {
          out.push(stack.pop());
          continue;
        }
        break;
      }
      break;
    }
  };

  for (let k = 0; k < tokens.length; k++) {
    const tok = tokens[k];
    if (tok.type === 'NUM') {
      out.push(tok);
      continue;
    }
    if (tok.type === 'FUNC') {
      stack.push(tok);
      continue;
    }
    if (tok.type === 'LPAREN') {
      stack.push('(');
      continue;
    }
    if (tok.type === 'RPAREN') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        out.push(stack.pop());
      }
      if (!stack.length || stack.pop() !== '(') throw new Error('PAREN');
      if (stack.length && stack[stack.length - 1]?.type === 'FUNC') {
        out.push(stack.pop());
      }
      continue;
    }
    if (tok.type === 'COMMA') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        out.push(stack.pop());
      }
      if (!stack.length || stack[stack.length - 1] !== '(')
        throw new Error('COMMA');
      continue;
    }
    if (tok.type === 'U') {
      popOps('U');
      stack.push('U');
      continue;
    }
    if (tok.type === 'OP') {
      popOps(tok.value);
      stack.push(tok);
      continue;
    }
    throw new Error('TOKEN');
  }

  while (stack.length) {
    const t = stack.pop();
    if (t === '(') throw new Error('PAREN');
    out.push(t);
  }
  return out;
}

function applyUnaryMinus(a) {
  return -a;
}

function applyOp(op, a, b) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) throw new Error('DIV0');
      return a / b;
    case '%':
      if (b === 0) throw new Error('DIV0');
      return a % b;
    case '^':
      return a ** b;
    default:
      throw new Error('OP');
  }
}

function applyFunc(name, x, angleMode) {
  switch (name) {
    case 'sqrt':
      if (x < 0) throw new Error('SQRT_NEG');
      return Math.sqrt(x);
    case 'sin':
      return Math.sin(angleMode === 'deg' ? (x * Math.PI) / 180 : x);
    case 'cos':
      return Math.cos(angleMode === 'deg' ? (x * Math.PI) / 180 : x);
    case 'tan': {
      const rad = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
      const c = Math.cos(rad);
      if (Math.abs(c) < 1e-15) throw new Error('TAN_UNDEF');
      return Math.tan(rad);
    }
    case 'log':
      if (x <= 0) throw new Error('LOG_DOMAIN');
      return Math.log10(x);
    case 'ln':
      if (x <= 0) throw new Error('LOG_DOMAIN');
      return Math.log(x);
    default:
      throw new Error('FUNC');
  }
}

/**
 * @param {string} expression
 * @param {'deg' | 'rad'} angleMode
 * @returns {number}
 */
export function evaluateExpression(expression, angleMode) {
  const tokens = tokenize(expression);
  const rpn = toRpn(tokens);
  const st = [];

  for (const tok of rpn) {
    if (tok.type === 'NUM') {
      st.push(tok.value);
      continue;
    }
    if (tok === 'U') {
      if (st.length < 1) throw new Error('STACK');
      st.push(applyUnaryMinus(st.pop()));
      continue;
    }
    if (tok.type === 'OP') {
      if (st.length < 2) throw new Error('STACK');
      const b = st.pop();
      const a = st.pop();
      st.push(applyOp(tok.value, a, b));
      continue;
    }
    if (tok.type === 'FUNC') {
      if (st.length < 1) throw new Error('STACK');
      const x = st.pop();
      st.push(applyFunc(tok.value, x, angleMode));
      continue;
    }
    throw new Error('RPN');
  }

  if (st.length !== 1) throw new Error('STACK');
  const result = st[0];
  if (typeof result !== 'number' || !Number.isFinite(result)) {
    throw new Error('NAN');
  }
  return result;
}

const CODE_MAP = {
  EMPTY: 'INVALID_EXPRESSION',
  BAD_NUMBER: 'INVALID_EXPRESSION',
  BAD_CHAR: 'INVALID_EXPRESSION',
  UNKNOWN_IDENT: 'INVALID_EXPRESSION',
  FUNC_PAREN: 'INVALID_EXPRESSION',
  PAREN: 'INVALID_EXPRESSION',
  COMMA: 'INVALID_EXPRESSION',
  TOKEN: 'INVALID_EXPRESSION',
  RPN: 'INVALID_EXPRESSION',
  STACK: 'INVALID_EXPRESSION',
  OP: 'INVALID_EXPRESSION',
  FUNC: 'INVALID_EXPRESSION',
  DIV0: 'DOMAIN_ERROR',
  SQRT_NEG: 'DOMAIN_ERROR',
  LOG_DOMAIN: 'DOMAIN_ERROR',
  TAN_UNDEF: 'DOMAIN_ERROR',
  NAN: 'DOMAIN_ERROR',
};

const MSG_MAP = {
  EMPTY: 'The expression could not be evaluated.',
  BAD_NUMBER: 'Invalid number in expression.',
  BAD_CHAR: 'Unsupported character in expression.',
  UNKNOWN_IDENT: 'Unknown symbol in expression.',
  FUNC_PAREN: 'Function must be followed by parentheses.',
  PAREN: 'Mismatched parentheses.',
  COMMA: 'Invalid comma placement.',
  TOKEN: 'Invalid expression.',
  RPN: 'Invalid expression.',
  STACK: 'Invalid expression.',
  OP: 'Invalid expression.',
  FUNC: 'Invalid expression.',
  DIV0: 'Division by zero is not allowed.',
  SQRT_NEG: 'Square root of a negative number is not defined.',
  LOG_DOMAIN: 'Logarithm is only defined for positive numbers.',
  TAN_UNDEF: 'Tangent is undefined for this angle.',
  NAN: 'Result is not a finite number.',
};

export function mapParserError(err) {
  const key = err?.message ?? 'TOKEN';
  const code = CODE_MAP[key] ?? 'INVALID_EXPRESSION';
  const message = MSG_MAP[key] ?? 'The expression could not be evaluated.';
  return { code, message };
}
