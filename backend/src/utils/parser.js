/**
 * Safe recursive-descent parser for calculator expressions.
 * No eval. Allowlisted tokens only.
 */

const { sin, cos, tan, sqrt, log10, ln, normalizeResult } = require('./mathHelpers');

const WHITESPACE = /\s/;

function isDigit(c) {
  return c >= '0' && c <= '9';
}

function isIdentStart(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_' || c === 'π';
}

function isIdentPart(c) {
  return isIdentStart(c) || isDigit(c);
}

class Parser {
  constructor(input, angleMode) {
    this.input = input;
    this.i = 0;
    this.angleMode = angleMode === 'RAD' ? 'RAD' : 'DEG';
  }

  peek() {
    while (this.i < this.input.length && WHITESPACE.test(this.input[this.i])) {
      this.i += 1;
    }
    return this.i < this.input.length ? this.input[this.i] : '';
  }

  consume(expected) {
    const c = this.peek();
    if (c !== expected) {
      const err = new Error('Invalid expression.');
      err.code = 'INVALID_EXPRESSION';
      throw err;
    }
    this.i += 1;
  }

  readNumber() {
    let start = this.i;
    while (this.i < this.input.length && WHITESPACE.test(this.input[this.i])) {
      this.i += 1;
    }
    start = this.i;
    let sawDot = false;
    while (this.i < this.input.length) {
      const c = this.input[this.i];
      if (isDigit(c)) {
        this.i += 1;
      } else if (c === '.' && !sawDot) {
        sawDot = true;
        this.i += 1;
      } else {
        break;
      }
    }
    const raw = this.input.slice(start, this.i);
    if (raw === '' || raw === '.') {
      const err = new Error('Invalid expression.');
      err.code = 'INVALID_EXPRESSION';
      throw err;
    }
    const n = Number.parseFloat(raw);
    if (!Number.isFinite(n)) {
      const err = new Error('Invalid expression.');
      err.code = 'INVALID_EXPRESSION';
      throw err;
    }
    return n;
  }

  readIdent() {
    while (this.i < this.input.length && WHITESPACE.test(this.input[this.i])) {
      this.i += 1;
    }
    const start = this.i;
    if (this.input[start] === 'π') {
      this.i += 1;
      return 'pi';
    }
    if (!isIdentStart(this.input[this.i])) {
      const err = new Error('Invalid expression.');
      err.code = 'INVALID_EXPRESSION';
      throw err;
    }
    while (this.i < this.input.length && isIdentPart(this.input[this.i])) {
      this.i += 1;
    }
    return this.input.slice(start, this.i).toLowerCase();
  }

  parseExpression() {
    return this.parseAdditive();
  }

  parseAdditive() {
    let left = this.parseMultiplicative();
    for (;;) {
      const c = this.peek();
      if (c === '+') {
        this.i += 1;
        left = left + this.parseMultiplicative();
      } else if (c === '-') {
        this.i += 1;
        left = left - this.parseMultiplicative();
      } else {
        break;
      }
    }
    return left;
  }

  parseMultiplicative() {
    let left = this.parseExponent();
    for (;;) {
      const c = this.peek();
      if (c === '*') {
        this.i += 1;
        left = left * this.parseExponent();
      } else if (c === '/') {
        this.i += 1;
        const right = this.parseExponent();
        if (right === 0) {
          const err = new Error('Cannot divide by zero.');
          err.code = 'DIVISION_BY_ZERO';
          throw err;
        }
        left = left / right;
      } else if (c === '%') {
        this.i += 1;
        const right = this.parseExponent();
        left = (left * right) / 100;
      } else {
        break;
      }
    }
    return left;
  }

  parseExponent() {
    const left = this.parseUnary();
    if (this.peek() === '^') {
      this.i += 1;
      const right = this.parseExponent();
      return left ** right;
    }
    return left;
  }

  parseUnary() {
    const c = this.peek();
    if (c === '-') {
      this.i += 1;
      return -this.parseUnary();
    }
    if (c === '+') {
      this.i += 1;
      return this.parseUnary();
    }
    return this.parsePrimary();
  }

  parsePrimary() {
    const c = this.peek();
    if (c === '(') {
      this.i += 1;
      const inner = this.parseExpression();
      this.consume(')');
      return inner;
    }
    if (isDigit(c) || c === '.') {
      return this.readNumber();
    }
    if (isIdentStart(c) || c === 'π') {
      const name = this.readIdent();
      if (this.peek() === '(') {
        this.i += 1;
        const arg = this.parseExpression();
        this.consume(')');
        return this.applyFunction(name, arg);
      }
      if (name === 'pi') return Math.PI;
      if (name === 'e') return Math.E;
      const err = new Error('Invalid expression.');
      err.code = 'INVALID_EXPRESSION';
      throw err;
    }
    const err = new Error('Invalid expression.');
    err.code = 'INVALID_EXPRESSION';
    throw err;
  }

  applyFunction(name, arg) {
    switch (name) {
      case 'sin':
        return sin(this.angleMode, arg);
      case 'cos':
        return cos(this.angleMode, arg);
      case 'tan':
        return tan(this.angleMode, arg);
      case 'sqrt':
        return sqrt(arg);
      case 'log':
        return log10(arg);
      case 'ln':
        return ln(arg);
      default: {
        const err = new Error('Unsupported function.');
        err.code = 'UNSUPPORTED_OPERATION';
        throw err;
      }
    }
  }

  parseAll() {
    const v = this.parseExpression();
    if (this.peek() !== '') {
      const err = new Error('Invalid expression.');
      err.code = 'INVALID_EXPRESSION';
      throw err;
    }
    return normalizeResult(v);
  }
}

function validateAllowedCharacters(expression) {
  for (let i = 0; i < expression.length; i += 1) {
    const ch = expression[i];
    if (WHITESPACE.test(ch)) continue;
    if (isDigit(ch) || ch === '.') continue;
    if ('+-*/^%()'.includes(ch)) continue;
    if (isIdentPart(ch) || ch === 'π') continue;
    const err = new Error('Invalid expression.');
    err.code = 'INVALID_EXPRESSION';
    throw err;
  }
}

function evaluateExpression(expression, angleMode) {
  const trimmed = expression.trim();
  if (trimmed === '') {
    const err = new Error('Expression is empty.');
    err.code = 'EMPTY_EXPRESSION';
    throw err;
  }
  validateAllowedCharacters(trimmed);
  const parser = new Parser(trimmed, angleMode);
  return parser.parseAll();
}

module.exports = { evaluateExpression, validateAllowedCharacters };
