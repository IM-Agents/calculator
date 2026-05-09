import { divide, ensureFinite, ln, log10, sqrt, toRadians } from "./mathHelpers.js";

const NUMBER_PATTERN = /^\d+(\.\d+)?$/;
const TOKEN_PATTERN = /\s*([A-Za-z]+|\d+(\.\d+)?|[()+\-*/^%])\s*/g;
const FUNCTION_NAMES = new Set(["sin", "cos", "tan", "sqrt", "log", "ln"]);
const OPERATORS = {
  "+": { precedence: 1, associativity: "left", args: 2 },
  "-": { precedence: 1, associativity: "left", args: 2 },
  "*": { precedence: 2, associativity: "left", args: 2 },
  "/": { precedence: 2, associativity: "left", args: 2 },
  "%": { precedence: 2, associativity: "left", args: 2 },
  "^": { precedence: 3, associativity: "right", args: 2 },
  "u-": { precedence: 4, associativity: "right", args: 1 }
};

function invalidExpression(message = "The expression is invalid.") {
  const error = new Error(message);
  error.code = "INVALID_EXPRESSION";
  error.status = 400;
  return error;
}

export function evaluateExpression(expression, angleMode = "DEG") {
  const normalized = expression?.trim();
  if (!normalized) {
    const error = new Error("Expression cannot be empty.");
    error.code = "EMPTY_EXPRESSION";
    error.status = 400;
    throw error;
  }

  const tokens = tokenize(normalized);
  const postfix = toPostfix(tokens);
  return evaluatePostfix(postfix, angleMode);
}

function tokenize(expression) {
  const tokens = [];
  let cursor = 0;
  let match;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(expression)) !== null) {
    if (match.index !== cursor) {
      throw invalidExpression();
    }
    cursor = TOKEN_PATTERN.lastIndex;
    const token = match[1];
    tokens.push(normalizeToken(token));
  }

  if (cursor !== expression.length) {
    throw invalidExpression();
  }

  return tokens;
}

function normalizeToken(token) {
  const lowerToken = token.toLowerCase();
  if (lowerToken === "pi" || token === "π") {
    return String(Math.PI);
  }
  if (lowerToken === "e") {
    return String(Math.E);
  }
  return lowerToken;
}

function toPostfix(tokens) {
  const output = [];
  const operators = [];
  let previousToken = null;

  for (const token of tokens) {
    if (NUMBER_PATTERN.test(token)) {
      output.push(token);
    } else if (FUNCTION_NAMES.has(token)) {
      operators.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      if (!operators.length) {
        throw invalidExpression();
      }
      operators.pop();
      if (operators.length && FUNCTION_NAMES.has(operators[operators.length - 1])) {
        output.push(operators.pop());
      }
    } else if (token in OPERATORS) {
      const operator = token === "-" && shouldTreatAsUnary(previousToken) ? "u-" : token;
      while (
        operators.length &&
        operators[operators.length - 1] in OPERATORS &&
        shouldPopOperator(operator, operators[operators.length - 1])
      ) {
        output.push(operators.pop());
      }
      operators.push(operator);
    } else {
      throw invalidExpression();
    }
    previousToken = token;
  }

  while (operators.length) {
    const popped = operators.pop();
    if (popped === "(" || popped === ")") {
      throw invalidExpression();
    }
    output.push(popped);
  }

  return output;
}

function shouldTreatAsUnary(previousToken) {
  return previousToken === null || previousToken === "(" || previousToken in OPERATORS;
}

function shouldPopOperator(current, incoming) {
  const currentOperator = OPERATORS[current];
  const incomingOperator = OPERATORS[incoming];
  if (currentOperator.associativity === "left") {
    return currentOperator.precedence <= incomingOperator.precedence;
  }
  return currentOperator.precedence < incomingOperator.precedence;
}

function evaluatePostfix(tokens, angleMode) {
  const stack = [];

  for (const token of tokens) {
    if (NUMBER_PATTERN.test(token)) {
      stack.push(Number(token));
      continue;
    }

    if (token in OPERATORS) {
      if (OPERATORS[token].args === 1) {
        const operand = stack.pop();
        if (operand === undefined) {
          throw invalidExpression();
        }
        stack.push(-operand);
      } else {
        const right = stack.pop();
        const left = stack.pop();
        if (left === undefined || right === undefined) {
          throw invalidExpression();
        }
        stack.push(applyOperator(token, left, right));
      }
      continue;
    }

    if (FUNCTION_NAMES.has(token)) {
      const operand = stack.pop();
      if (operand === undefined) {
        throw invalidExpression();
      }
      stack.push(applyFunction(token, operand, angleMode));
      continue;
    }

    throw invalidExpression();
  }

  if (stack.length !== 1) {
    throw invalidExpression();
  }

  return Number(ensureFinite(Number(stack[0])).toFixed(12));
}

function applyOperator(operator, left, right) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return divide(left, right);
    case "%":
      return left % right;
    case "^":
      return left ** right;
    default:
      throw invalidExpression();
  }
}

function applyFunction(name, operand, angleMode) {
  switch (name) {
    case "sin":
      return Math.sin(toRadians(operand, angleMode));
    case "cos":
      return Math.cos(toRadians(operand, angleMode));
    case "tan":
      return Math.tan(toRadians(operand, angleMode));
    case "sqrt":
      return sqrt(operand);
    case "log":
      return log10(operand);
    case "ln":
      return ln(operand);
    default:
      throw invalidExpression();
  }
}
