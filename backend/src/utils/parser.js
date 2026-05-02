import {
  cosSafe,
  lnSafe,
  log10Safe,
  normalizeNumber,
  sinSafe,
  sqrtSafe,
  tanSafe,
} from './mathHelpers.js';

const CONSTANTS = new Set(['pi', 'e']);
const FUNCTIONS = new Set(['sin', 'cos', 'tan', 'sqrt', 'log', 'ln']);

function makeError(code, message, statusCode = 400) {
  const err = new Error(message);
  err.code = code;
  err.statusCode = statusCode;
  return err;
}

function tokenize(input) {
  const s = input.trim();
  const tokens = [];
  let i = 0;

  const peek = () => s[i];
  const consume = () => s[i++];

  while (i < s.length) {
    const c = peek();
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s[i + 1]))) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(peek())) {
        num += consume();
      }
      if (num === '.' || num.split('.').length > 2) {
        throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
      }
      const value = Number(num);
      if (Number.isNaN(value)) {
        throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
      }
      tokens.push({ type: 'NUMBER', value });
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      let id = '';
      while (i < s.length && /[a-zA-Z]/.test(peek())) {
        id += consume();
      }
      const lower = id.toLowerCase();
      tokens.push({ type: 'IDENT', value: lower });
      continue;
    }
    if ('+-*/^%()'.includes(c)) {
      tokens.push({ type: c, value: c });
      consume();
      continue;
    }
    throw makeError('INVALID_EXPRESSION', 'The expression contains unsupported characters.');
  }
  return tokens;
}

function parseExpression(tokens, angleMode) {
  let pos = 0;

  const peek = () => tokens[pos];
  const eof = () => pos >= tokens.length;

  function expect(type) {
    const t = peek();
    if (!t || t.type !== type) {
      throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
    }
    pos++;
    return t;
  }

  function parseAdd() {
    let left = parseMul();
    while (!eof()) {
      const t = peek();
      if (t.type === '+') {
        pos++;
        left = normalizeNumber(left + parseMul());
      } else if (t.type === '-') {
        pos++;
        left = normalizeNumber(left - parseMul());
      } else {
        break;
      }
    }
    return left;
  }

  function parseMul() {
    let left = parsePow();
    while (!eof()) {
      const t = peek();
      if (t.type === '*') {
        pos++;
        left = normalizeNumber(left * parsePow());
      } else if (t.type === '/') {
        pos++;
        const right = parsePow();
        if (right === 0) {
          throw makeError('DIVISION_BY_ZERO', 'Cannot divide by zero.', 422);
        }
        left = normalizeNumber(left / right);
      } else {
        break;
      }
    }
    return left;
  }

  function parsePow() {
    let left = parseUnary();
    if (!eof() && peek().type === '^') {
      pos++;
      const right = parsePow();
      left = normalizeNumber(left ** right);
    }
    return left;
  }

  function parseUnary() {
    if (!eof() && peek().type === '+') {
      pos++;
      return parseUnary();
    }
    if (!eof() && peek().type === '-') {
      pos++;
      return normalizeNumber(-parseUnary());
    }
    return parsePostfix();
  }

  function parsePostfix() {
    let value = parsePrimary();
    if (!eof() && peek().type === '%') {
      pos++;
      value = normalizeNumber(value / 100);
    }
    return value;
  }

  function parsePrimary() {
    const t = peek();
    if (!t) {
      throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
    }
    if (t.type === 'NUMBER') {
      pos++;
      return normalizeNumber(t.value);
    }
    if (t.type === '(') {
      pos++;
      const inner = parseAdd();
      if (eof() || peek().type !== ')') {
        throw makeError('INVALID_EXPRESSION', 'Mismatched parentheses.');
      }
      pos++;
      return inner;
    }
    if (t.type === 'IDENT') {
      const name = t.value;
      pos++;
      if (!eof() && peek().type === '(') {
        if (!FUNCTIONS.has(name)) {
          throw makeError('INVALID_EXPRESSION', 'Unknown function.');
        }
        pos++;
        const arg = parseAdd();
        if (eof() || peek().type !== ')') {
          throw makeError('INVALID_EXPRESSION', 'Mismatched parentheses.');
        }
        pos++;
        return applyFunction(name, arg, angleMode);
      }
      if (CONSTANTS.has(name)) {
        if (name === 'pi') return Math.PI;
        if (name === 'e') return Math.E;
      }
      throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
    }
    throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
  }

  const result = parseAdd();
  if (pos < tokens.length) {
    throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
  }
  return normalizeNumber(result);
}

function applyFunction(name, arg, angleMode) {
  switch (name) {
    case 'sin':
      return normalizeNumber(sinSafe(arg, angleMode));
    case 'cos':
      return normalizeNumber(cosSafe(arg, angleMode));
    case 'tan':
      return normalizeNumber(tanSafe(arg, angleMode));
    case 'sqrt':
      return normalizeNumber(sqrtSafe(arg));
    case 'log':
      return normalizeNumber(log10Safe(arg));
    case 'ln':
      return normalizeNumber(lnSafe(arg));
    default:
      throw makeError('UNSUPPORTED_OPERATION', 'Unsupported operation.');
  }
}

export function evaluateExpression(expression, angleMode) {
  if (typeof expression !== 'string' || !expression.trim()) {
    throw makeError('EMPTY_EXPRESSION', 'Expression cannot be empty.');
  }
  if (angleMode !== 'DEG' && angleMode !== 'RAD') {
    throw makeError('INVALID_EXPRESSION', 'Angle mode must be DEG or RAD.');
  }
  try {
    const tokens = tokenize(expression);
    if (tokens.length === 0) {
      throw makeError('EMPTY_EXPRESSION', 'Expression cannot be empty.');
    }
    return parseExpression(tokens, angleMode);
  } catch (e) {
    if (e.code) throw e;
    throw makeError('INVALID_EXPRESSION', 'The expression is invalid.');
  }
}
