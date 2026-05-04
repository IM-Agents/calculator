import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateExpression, tokenize } from './parser.js';

describe('evaluateExpression', () => {
  it('evaluates basic arithmetic', () => {
    assert.equal(evaluateExpression('2+2*3', 'deg'), 8);
    assert.equal(evaluateExpression('(2+2)*3', 'deg'), 12);
    assert.equal(evaluateExpression('10/4', 'deg'), 2.5);
  });

  it('respects power and modulo', () => {
    assert.equal(evaluateExpression('5^2', 'deg'), 25);
    assert.equal(evaluateExpression('7%3', 'deg'), 1);
  });

  it('handles unary minus', () => {
    assert.equal(evaluateExpression('-5+3', 'deg'), -2);
    assert.equal(evaluateExpression('2*-3', 'deg'), -6);
  });

  it('handles trig in degrees', () => {
    const r = evaluateExpression('sin(30)', 'deg');
    assert.ok(Math.abs(r - 0.5) < 1e-10);
  });

  it('handles trig in radians', () => {
    const r = evaluateExpression('sin(0)', 'rad');
    assert.equal(r, 0);
  });

  it('handles constants and functions', () => {
    assert.ok(evaluateExpression('pi', 'deg') > 3);
    assert.equal(evaluateExpression('sqrt(16)', 'deg'), 4);
    assert.equal(evaluateExpression('ln(1)', 'deg'), 0);
    assert.equal(evaluateExpression('log(100)', 'deg'), 2);
  });

  it('throws domain errors', () => {
    assert.throws(() => evaluateExpression('1/0', 'deg'), /DIV0/);
    assert.throws(() => evaluateExpression('sqrt(-1)', 'deg'), /SQRT_NEG/);
    assert.throws(() => evaluateExpression('ln(-1)', 'deg'), /LOG_DOMAIN/);
  });
});

describe('tokenize', () => {
  it('tokenizes function calls', () => {
    const t = tokenize('sin(30)+1');
    assert.equal(t.filter((x) => x.type === 'FUNC').length, 1);
  });
});
