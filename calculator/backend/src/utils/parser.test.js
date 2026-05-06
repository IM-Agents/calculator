import test from "node:test";
import assert from "node:assert/strict";
import { evaluateExpression, tokenize } from "./parser.js";

test("tokenize treats parentheses as grouping tokens", () => {
  const tokens = tokenize("sin(30)");
  assert.equal(tokens[1].type, "LPAREN");
  assert.equal(tokens[tokens.length - 1].type, "RPAREN");
});

test("evaluate sin with degrees", () => {
  assert.equal(evaluateExpression("sin(30)", "DEG"), 0.5);
});

test("evaluate chained arithmetic and power", () => {
  assert.equal(evaluateExpression("sin(30)+5^2", "DEG"), 25.5);
});

test("postfix percentage divides preceding primary by 100", () => {
  assert.equal(evaluateExpression("10*50%", "DEG"), 5);
});

test("division by zero throws", () => {
  assert.throws(() => evaluateExpression("1/0", "DEG"), /DIVISION_BY_ZERO/);
});
