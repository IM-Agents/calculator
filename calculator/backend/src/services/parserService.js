import {
  sinWrapped,
  cosWrapped,
  tanWrapped,
} from './scientificService.js';

const MAX_LENGTH = 512;

const ALLOWED_PATTERN = /^[0-9+\-*/().,\s^a-zA-Z]+$/;

const CONSTANTS = {
  pi: Math.PI,
  e: Math.E,
};

const FUNCTIONS = new Set(['sqrt', 'sin', 'cos', 'tan', 'log', 'ln', 'abs']);

function mapError(err) {
  const msg = err?.message || '';
  if (msg === 'DIVIDE_BY_ZERO') return { code: 'DIVIDE_BY_ZERO', message: 'Cannot divide by zero.' };
  if (msg === 'NEGATIVE_SQRT') return { code: 'NEGATIVE_SQRT', message: 'Square root of a negative number is not supported.' };
  if (msg === 'INVALID_LOG_INPUT') return { code: 'INVALID_LOG_INPUT', message: 'Logarithm input must be positive.' };
  if (msg === 'UNSUPPORTED_OPERATION') return { code: 'UNSUPPORTED_OPERATION', message: 'This operation is not supported.' };
  return { code: 'INVALID_EXPRESSION', message: 'Please enter a valid calculation.' };
}

export function evaluateExpression(expression, angleMode = 'deg') {
  if (typeof expression !== 'string' || expression.trim() === '') {
    const e = new Error('EMPTY_INPUT');
    e.code = 'EMPTY_INPUT';
    throw e;
  }
  const expr = expression.trim();
  if (expr.length > MAX_LENGTH) {
    const e = new Error('INVALID_EXPRESSION');
    e.code = 'INVALID_EXPRESSION';
    throw e;
  }
  if (!ALLOWED_PATTERN.test(expr)) {
    const e = new Error('INVALID_EXPRESSION');
    e.code = 'INVALID_EXPRESSION';
    throw e;
  }

  const tokens = tokenize(expr);
  const parser = new Parser(tokens, angleMode);
  const value = parser.parseExpr();
  parser.expectEOF();
  if (!Number.isFinite(value)) {
    const e = new Error('INVALID_EXPRESSION');
    e.code = 'INVALID_EXPRESSION';
    throw e;
  }
  return value;
}

export { mapError };

function tokenize(input) {
  const s = input.replace(/\s+/g, '');
  const tokens = [];
  let i = 0;

  while (i < s.length) {
    const c = s[i];
    if ((c >= '0' && c <= '9') || c === '.') {
      const start = i;
      let dots = 0;
      while (i < s.length && ((s[i] >= '0' && s[i] <= '9') || s[i] === '.')) {
        if (s[i] === '.') dots++;
        if (dots > 1) throw new Error('INVALID_EXPRESSION');
        i++;
      }
      const raw = s.slice(start, i);
      tokens.push({ type: 'NUMBER', value: Number.parseFloat(raw) });
      continue;
    }

    if ('+-*/^(),'.includes(c)) {
      tokens.push({ type: 'SYMBOL', value: c });
      i++;
      continue;
    }

    if (/[a-zA-Z]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
      const name = s.slice(i, j).toLowerCase();
      i = j;
      if (Object.prototype.hasOwnProperty.call(CONSTANTS, name)) {
        tokens.push({ type: 'NUMBER', value: CONSTANTS[name] });
        continue;
      }
      if (FUNCTIONS.has(name)) {
        tokens.push({ type: 'FUNC', value: name });
        continue;
      }
      throw new Error('UNSUPPORTED_OPERATION');
    }

    throw new Error('INVALID_EXPRESSION');
  }

  return tokens;
}

class Parser {
  constructor(tokens, angleMode) {
    this.tokens = tokens;
    this.i = 0;
    this.angleMode = angleMode === 'rad' ? 'rad' : 'deg';
  }

  peek() {
    return this.tokens[this.i];
  }

  consume(expected) {
    const t = this.peek();
    if (!t || t.value !== expected) throw new Error('INVALID_EXPRESSION');
    this.i++;
    return t;
  }

  expectEOF() {
    if (this.i !== this.tokens.length) throw new Error('INVALID_EXPRESSION');
  }

  parseExpr() {
    let left = this.parseTerm();
    while (this.peek()?.type === 'SYMBOL' && (this.peek().value === '+' || this.peek().value === '-')) {
      const op = this.consume(this.peek().value).value;
      const right = this.parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  parseTerm() {
    let left = this.parsePower();
    while (this.peek()?.type === 'SYMBOL' && (this.peek().value === '*' || this.peek().value === '/')) {
      const op = this.consume(this.peek().value).value;
      const right = this.parsePower();
      if (op === '/') {
        if (right === 0) throw new Error('DIVIDE_BY_ZERO');
        left /= right;
      } else {
        left *= right;
      }
    }
    return left;
  }

  parsePower() {
    let left = this.parseUnary();
    if (this.peek()?.type === 'SYMBOL' && this.peek().value === '^') {
      this.consume('^');
      const right = this.parsePower();
      left = left ** right;
    }
    return left;
  }

  parseUnary() {
    if (this.peek()?.type === 'SYMBOL' && this.peek().value === '-') {
      this.consume('-');
      return -this.parseUnary();
    }
    if (this.peek()?.type === 'SYMBOL' && this.peek().value === '+') {
      this.consume('+');
      return this.parseUnary();
    }
    return this.parsePrimary();
  }

  parsePrimary() {
    const t = this.peek();
    if (!t) throw new Error('INVALID_EXPRESSION');

    if (t.type === 'NUMBER') {
      this.i++;
      return t.value;
    }

    if (t.type === 'FUNC') {
      const name = t.value;
      this.i++;
      this.consume('(');
      const args = [];
      args.push(this.parseExpr());
      while (this.peek()?.type === 'SYMBOL' && this.peek().value === ',') {
        this.consume(',');
        args.push(this.parseExpr());
      }
      this.consume(')');
      return this.applyFunction(name, args);
    }

    if (t.type === 'SYMBOL' && t.value === '(') {
      this.consume('(');
      const inner = this.parseExpr();
      this.consume(')');
      return inner;
    }

    throw new Error('INVALID_EXPRESSION');
  }

  applyFunction(name, args) {
    const arity = { sqrt: 1, sin: 1, cos: 1, tan: 1, log: 1, ln: 1, abs: 1 }[name];
    if (args.length !== arity) throw new Error('INVALID_EXPRESSION');
    const x = args[0];
    switch (name) {
      case 'sqrt':
        if (x < 0) throw new Error('NEGATIVE_SQRT');
        return Math.sqrt(x);
      case 'sin':
        return sinWrapped(x, this.angleMode);
      case 'cos':
        return cosWrapped(x, this.angleMode);
      case 'tan':
        return tanWrapped(x, this.angleMode);
      case 'log':
        if (x <= 0) throw new Error('INVALID_LOG_INPUT');
        return Math.log10(x);
      case 'ln':
        if (x <= 0) throw new Error('INVALID_LOG_INPUT');
        return Math.log(x);
      case 'abs':
        return Math.abs(x);
      default:
        throw new Error('UNSUPPORTED_OPERATION');
    }
  }
}
