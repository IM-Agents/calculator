import { ApiError } from "./errors.js";

const FUNCTIONS = new Set(["sqrt", "sin", "cos", "tan", "log", "ln"]);
const CONSTANTS = {
  pi: Math.PI,
  e: Math.E
};
const OPERATORS = {
  "+": { precedence: 1, associativity: "left", arity: 2 },
  "-": { precedence: 1, associativity: "left", arity: 2 },
  "*": { precedence: 2, associativity: "left", arity: 2 },
  "/": { precedence: 2, associativity: "left", arity: 2 },
  "^": { precedence: 3, associativity: "right", arity: 2 },
  "u-": { precedence: 4, associativity: "right", arity: 1 },
  "%": { precedence: 4, associativity: "right", arity: 1 }
};

function tokenize(expression) {
  const normalized = expression.replace(/\s+/g, "");
  if (!/^[0-9+\-*/^%().a-zA-Z]+$/.test(normalized)) {
    throw new ApiError(400, "INVALID_EXPRESSION", "Expression contains unsupported characters.");
  }

  const tokens = [];
  let idx = 0;

  while (idx < normalized.length) {
    const char = normalized[idx];

    if (/[0-9.]/.test(char)) {
      let num = char;
      idx += 1;
      while (idx < normalized.length && /[0-9.]/.test(normalized[idx])) {
        num += normalized[idx];
        idx += 1;
      }
      if ((num.match(/\./g) || []).length > 1) {
        throw new ApiError(400, "INVALID_EXPRESSION", "Invalid decimal number.");
      }
      tokens.push({ type: "number", value: Number(num) });
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let identifier = char;
      idx += 1;
      while (idx < normalized.length && /[a-zA-Z]/.test(normalized[idx])) {
        identifier += normalized[idx];
        idx += 1;
      }
      if (FUNCTIONS.has(identifier)) {
        tokens.push({ type: "function", value: identifier });
        continue;
      }
      if (Object.hasOwn(CONSTANTS, identifier)) {
        tokens.push({ type: "number", value: CONSTANTS[identifier] });
        continue;
      }
      throw new ApiError(400, "INVALID_EXPRESSION", "Unknown function or constant.");
    }

    if ("+-*/^%()".includes(char)) {
      tokens.push({ type: "symbol", value: char });
      idx += 1;
      continue;
    }

    throw new ApiError(400, "INVALID_EXPRESSION", "Unable to parse expression.");
  }

  return tokens;
}

function toRpn(tokens) {
  const output = [];
  const operators = [];
  let prevTokenType = null;

  for (const token of tokens) {
    if (token.type === "number") {
      output.push(token);
      prevTokenType = "number";
      continue;
    }

    if (token.type === "function") {
      operators.push(token);
      prevTokenType = "function";
      continue;
    }

    if (token.type === "symbol" && token.value === "(") {
      operators.push(token);
      prevTokenType = "(";
      continue;
    }

    if (token.type === "symbol" && token.value === ")") {
      while (operators.length && operators.at(-1).value !== "(") {
        output.push(operators.pop());
      }
      if (!operators.length) {
        throw new ApiError(400, "INVALID_EXPRESSION", "Unbalanced parentheses.");
      }
      operators.pop();
      if (operators.length && operators.at(-1).type === "function") {
        output.push(operators.pop());
      }
      prevTokenType = ")";
      continue;
    }

    if (token.type === "symbol") {
      let operatorValue = token.value;
      if (operatorValue === "-" && (prevTokenType === null || ["operator", "(", "function"].includes(prevTokenType))) {
        operatorValue = "u-";
      }

      const currentOp = OPERATORS[operatorValue];
      if (!currentOp) {
        throw new ApiError(400, "INVALID_EXPRESSION", "Unsupported operator.");
      }

      while (operators.length) {
        const top = operators.at(-1);
        if (top.type === "function") {
          output.push(operators.pop());
          continue;
        }
        if (top.type !== "operator") break;

        const topOp = OPERATORS[top.value];
        const shouldPop =
          topOp.precedence > currentOp.precedence ||
          (topOp.precedence === currentOp.precedence && currentOp.associativity === "left");
        if (!shouldPop) break;
        output.push(operators.pop());
      }

      operators.push({ type: "operator", value: operatorValue });
      prevTokenType = "operator";
    }
  }

  while (operators.length) {
    const op = operators.pop();
    if (op.value === "(") {
      throw new ApiError(400, "INVALID_EXPRESSION", "Unbalanced parentheses.");
    }
    output.push(op);
  }

  return output;
}

function applyFunction(name, value, angleMode) {
  if (name === "sqrt" && value < 0) {
    throw new ApiError(400, "MATH_DOMAIN_ERROR", "Cannot calculate square root of a negative number.");
  }
  if ((name === "log" || name === "ln") && value <= 0) {
    throw new ApiError(400, "MATH_DOMAIN_ERROR", "Logarithm input must be greater than zero.");
  }

  const inRadians = angleMode === "DEG" ? (value * Math.PI) / 180 : value;
  switch (name) {
    case "sqrt":
      return Math.sqrt(value);
    case "sin":
      return Math.sin(inRadians);
    case "cos":
      return Math.cos(inRadians);
    case "tan":
      return Math.tan(inRadians);
    case "log":
      return Math.log10(value);
    case "ln":
      return Math.log(value);
    default:
      throw new ApiError(400, "INVALID_EXPRESSION", "Unsupported function.");
  }
}

function evaluateRpn(rpnTokens, angleMode) {
  const stack = [];
  for (const token of rpnTokens) {
    if (token.type === "number") {
      stack.push(token.value);
      continue;
    }

    if (token.type === "function") {
      const value = stack.pop();
      if (value === undefined) {
        throw new ApiError(400, "INVALID_EXPRESSION", "Invalid function usage.");
      }
      stack.push(applyFunction(token.value, value, angleMode));
      continue;
    }

    if (token.type === "operator") {
      if (token.value === "u-") {
        const val = stack.pop();
        if (val === undefined) throw new ApiError(400, "INVALID_EXPRESSION", "Invalid unary operation.");
        stack.push(-val);
        continue;
      }
      if (token.value === "%") {
        const val = stack.pop();
        if (val === undefined) throw new ApiError(400, "INVALID_EXPRESSION", "Invalid percentage operation.");
        stack.push(val / 100);
        continue;
      }
      const right = stack.pop();
      const left = stack.pop();
      if (left === undefined || right === undefined) {
        throw new ApiError(400, "INVALID_EXPRESSION", "Invalid binary operation.");
      }
      switch (token.value) {
        case "+":
          stack.push(left + right);
          break;
        case "-":
          stack.push(left - right);
          break;
        case "*":
          stack.push(left * right);
          break;
        case "/":
          if (right === 0) throw new ApiError(400, "DIVIDE_BY_ZERO", "Division by zero is not allowed.");
          stack.push(left / right);
          break;
        case "^":
          stack.push(left ** right);
          break;
        default:
          throw new ApiError(400, "INVALID_EXPRESSION", "Unsupported operator.");
      }
    }
  }

  if (stack.length !== 1 || Number.isNaN(stack[0]) || !Number.isFinite(stack[0])) {
    throw new ApiError(400, "INVALID_EXPRESSION", "Expression cannot be evaluated.");
  }
  return stack[0];
}

export function evaluateExpression(expression, angleMode = "DEG") {
  const tokens = tokenize(expression);
  const rpnTokens = toRpn(tokens);
  return evaluateRpn(rpnTokens, angleMode);
}
