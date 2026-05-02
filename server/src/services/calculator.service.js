import { CONSTANTS, UNARY_FUNCS } from '../utils/constants.js';
import { CalculatorError } from '../utils/errors.js';
import { ERROR_CODES } from '../utils/constants.js';
import { applyUnaryFunction } from './trig.service.js';
import { normalizeNumber } from '../utils/formatter.js';

const ALLOWED_RAW = /^[0-9+\-*/%^().\sA-Za-z]+$/;

function lex(input) {
  if (!ALLOWED_RAW.test(input)) {
    throw new CalculatorError(
      ERROR_CODES.INVALID_EXPRESSION,
      'Expression contains invalid characters.',
    );
  }
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const c = input[i];
    if (/\s/.test(c)) {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < input.length && /[0-9.]/.test(input[j])) j += 1;
      const raw = input.slice(i, j);
      if (!/^(\d+\.?\d*|\.\d+)$/.test(raw)) {
        throw new CalculatorError(
          ERROR_CODES.INVALID_EXPRESSION,
          'Invalid number literal.',
        );
      }
      const n = Number(raw);
      if (!Number.isFinite(n)) {
        throw new CalculatorError(
          ERROR_CODES.INVALID_EXPRESSION,
          'Invalid number literal.',
        );
      }
      tokens.push({ type: 'NUMBER', value: n });
      i = j;
      continue;
    }
    if ('+-*/%^()'.includes(c)) {
      tokens.push({ type: c });
      i += 1;
      continue;
    }
    if (/[A-Za-z]/.test(c)) {
      let j = i;
      while (j < input.length && /[A-Za-z]/.test(input[j])) j += 1;
      const name = input.slice(i, j).toLowerCase();
      if (!CONSTANTS.has(name) && !UNARY_FUNCS.has(name)) {
        throw new CalculatorError(
          ERROR_CODES.INVALID_EXPRESSION,
          `Unknown symbol or function: ${name}`,
        );
      }
      tokens.push({ type: 'IDENT', name });
      i = j;
      continue;
    }
    throw new CalculatorError(
      ERROR_CODES.INVALID_EXPRESSION,
      'Unexpected character in expression.',
    );
  }
  return tokens;
}

function parseExpression(tokens, angleMode) {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }

  function eat(expectedType = null) {
    const t = tokens[pos];
    if (!t) {
      throw new CalculatorError(
        ERROR_CODES.INVALID_EXPRESSION,
        'Unexpected end of expression.',
      );
    }
    if (expectedType && t.type !== expectedType) {
      throw new CalculatorError(
        ERROR_CODES.INVALID_EXPRESSION,
        'Malformed expression.',
      );
    }
    pos += 1;
    return t;
  }

  function parseAdd() {
    let left = parseMul();
    while (peek()) {
      const t = peek();
      if (t.type === '+') {
        eat('+');
        left = left + parseMul();
      } else if (t.type === '-') {
        eat('-');
        left = left - parseMul();
      } else break;
    }
    return left;
  }

  function parseMul() {
    let left = parsePow();
    while (peek()) {
      const t = peek();
      if (t.type === '*') {
        eat('*');
        left = left * parsePow();
      } else if (t.type === '/') {
        eat('/');
        const right = parsePow();
        if (Math.abs(right) < 1e-15) {
          throw new CalculatorError(
            ERROR_CODES.DIVISION_BY_ZERO,
            'Division by zero is not allowed.',
          );
        }
        left = left / right;
      } else if (t.type === '%') {
        eat('%');
        const right = parsePow();
        if (Math.abs(right) < 1e-15) {
          throw new CalculatorError(
            ERROR_CODES.DIVISION_BY_ZERO,
            'Modulo by zero is not allowed.',
          );
        }
        left = left % right;
      } else break;
    }
    return left;
  }

  function parsePow() {
    const left = parseUnary();
    if (peek() && peek().type === '^') {
      eat('^');
      return left ** parsePow();
    }
    return left;
  }

  function parseUnary() {
    const t = peek();
    if (t && t.type === '+') {
      eat('+');
      return parseUnary();
    }
    if (t && t.type === '-') {
      eat('-');
      return -parseUnary();
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const t = peek();
    if (!t) {
      throw new CalculatorError(
        ERROR_CODES.INVALID_EXPRESSION,
        'Unexpected end of expression.',
      );
    }
    if (t.type === 'NUMBER') {
      eat();
      return t.value;
    }
    if (t.type === 'IDENT') {
      if (CONSTANTS.has(t.name)) {
        eat();
        if (t.name === 'pi') return Math.PI;
        if (t.name === 'e') return Math.E;
      }
      if (UNARY_FUNCS.has(t.name)) {
        eat();
        const next = peek();
        if (!next || next.type !== '(') {
          throw new CalculatorError(
            ERROR_CODES.INVALID_EXPRESSION,
            `Function ${t.name} requires parentheses.`,
          );
        }
        eat('(');
        const inner = parseAdd();
        eat(')');
        return applyUnaryFunction(t.name, inner, angleMode);
      }
    }
    if (t.type === '(') {
      eat('(');
      const inner = parseAdd();
      eat(')');
      return inner;
    }
    throw new CalculatorError(
      ERROR_CODES.INVALID_EXPRESSION,
      'Malformed expression.',
    );
  }

  const value = parseAdd();
  if (pos < tokens.length) {
    throw new CalculatorError(
      ERROR_CODES.INVALID_EXPRESSION,
      'Unexpected tokens after valid expression.',
    );
  }
  if (!Number.isFinite(value)) {
    throw new CalculatorError(
      ERROR_CODES.INVALID_DOMAIN,
      'Result is not a finite number.',
    );
  }
  return normalizeNumber(value);
}

export function evaluateExpression(expression, angleMode) {
  const tokens = lex(expression.trim());
  if (tokens.length === 0) {
    throw new CalculatorError(
      ERROR_CODES.EMPTY_INPUT,
      'Expression cannot be empty.',
    );
  }
  return parseExpression(tokens, angleMode);
}

export function evaluateStructured(operation, operands, angleMode) {
  const x = operands[0];
  const result = normalizeNumber(applyUnaryFunction(operation, x, angleMode));
  if (!Number.isFinite(result)) {
    throw new CalculatorError(
      ERROR_CODES.INVALID_DOMAIN,
      'Result is not a finite number.',
    );
  }
  return result;
}

export function evaluateRequest(payload) {
  if (payload.type === 'expression') {
    const result = evaluateExpression(payload.expression, payload.angleMode);
    return {
      expression: payload.expression,
      result,
      angleMode: payload.angleMode,
      timestamp: new Date().toISOString(),
    };
  }
  const result = evaluateStructured(
    payload.operation,
    payload.operands,
    payload.angleMode,
  );
  const expr = `${payload.operation}(${payload.operands[0]})`;
  return {
    expression: expr,
    result,
    angleMode: payload.angleMode,
    timestamp: new Date().toISOString(),
  };
}
