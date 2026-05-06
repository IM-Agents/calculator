import {
  degToRad,
  isTanUndefinedDegrees,
  isTanUndefinedRadians,
  roundDisplayNumber,
} from "./mathHelpers.js";

const ALLOWED_IDENT = new Set([
  "sin",
  "cos",
  "tan",
  "sqrt",
  "log",
  "ln",
  "pi",
  "e",
]);

export function tokenize(raw) {
  const s = raw.replace(/\s+/g, "");
  const tokens = [];
  let i = 0;

  while (i < s.length) {
    const c = s[i];
    if (/\d/.test(c) || (c === "." && i + 1 < s.length && /\d/.test(s[i + 1]))) {
      let num = "";
      let dots = 0;
      while (i < s.length && (/[\d]/.test(s[i]) || (s[i] === "." && dots === 0))) {
        if (s[i] === ".") dots++;
        num += s[i++];
      }
      if (dots > 1) throw new Error("INVALID_EXPRESSION");
      const value = Number(num);
      if (!Number.isFinite(value)) throw new Error("INVALID_EXPRESSION");
      tokens.push({ type: "NUMBER", value });
      continue;
    }
    if (/[a-z]/i.test(c)) {
      let id = "";
      while (i < s.length && /[a-z]/i.test(s[i])) id += s[i++];
      tokens.push({ type: "IDENT", value: id.toLowerCase() });
      continue;
    }
    if ("+-*/^%".includes(c)) {
      tokens.push({ type: "OP", value: c });
      i++;
      continue;
    }
    if (c === "(") {
      tokens.push({ type: "LPAREN" });
      i++;
      continue;
    }
    if (c === ")") {
      tokens.push({ type: "RPAREN" });
      i++;
      continue;
    }
    throw new Error("INVALID_EXPRESSION");
  }
  return tokens;
}

function assertFinite(x) {
  if (!Number.isFinite(x)) throw new Error("UNSUPPORTED_OPERATION");
}

export class ExpressionEvaluator {
  constructor(tokens, angleMode) {
    this.tokens = tokens;
    this.i = 0;
    this.angleMode = angleMode === "RAD" ? "RAD" : "DEG";
  }

  peek() {
    return this.tokens[this.i] ?? null;
  }

  consume(expectedType, expectedValue) {
    const t = this.peek();
    if (!t || t.type !== expectedType)
      throw new Error("INVALID_EXPRESSION");
    if (expectedValue !== undefined && t.value !== expectedValue)
      throw new Error("INVALID_EXPRESSION");
    this.i++;
    return t;
  }

  parseExpression() {
    return this.parseAddSub();
  }

  parseAddSub() {
    let left = this.parseMulDiv();
    while (true) {
      const t = this.peek();
      if (!t || t.type !== "OP" || (t.value !== "+" && t.value !== "-")) break;
      const op = t.value;
      this.consume("OP");
      const right = this.parseMulDiv();
      if (op === "+") {
        left = left + right;
      } else {
        left = left - right;
      }
      assertFinite(left);
    }
    return left;
  }

  parseMulDiv() {
    let left = this.parsePower();
    while (true) {
      const t = this.peek();
      if (!t || t.type !== "OP" || (t.value !== "*" && t.value !== "/")) break;
      const op = t.value;
      this.consume("OP");
      const right = this.parsePower();
      if (op === "*") {
        left = left * right;
      } else {
        if (right === 0) throw new Error("DIVISION_BY_ZERO");
        left = left / right;
      }
      assertFinite(left);
    }
    return left;
  }

  parsePower() {
    let left = this.parseUnary();
    const t = this.peek();
    if (t?.type === "OP" && t.value === "^") {
      this.consume("OP", "^");
      const right = this.parsePower();
      left = Math.pow(left, right);
      assertFinite(left);
    }
    return left;
  }

  parseUnary() {
    const t = this.peek();
    if (t?.type === "OP" && t.value === "+") {
      this.consume("OP", "+");
      return this.parseUnary();
    }
    if (t?.type === "OP" && t.value === "-") {
      this.consume("OP", "-");
      return -this.parseUnary();
    }
    return this.parsePostfix();
  }

  parsePostfix() {
    let val = this.parsePrimary();
    const t = this.peek();
    if (t?.type === "OP" && t.value === "%") {
      this.consume("OP", "%");
      val = val / 100;
      assertFinite(val);
    }
    return val;
  }

  trigArg(angle) {
    return this.angleMode === "DEG" ? degToRad(angle) : angle;
  }

  parsePrimary() {
    const t = this.peek();
    if (!t) throw new Error("INVALID_EXPRESSION");

    if (t.type === "NUMBER") {
      this.consume("NUMBER");
      return t.value;
    }

    if (t.type === "LPAREN") {
      this.consume("LPAREN");
      const inner = this.parseExpression();
      this.consume("RPAREN");
      return inner;
    }

    if (t.type === "IDENT") {
      const name = t.value;
      if (!ALLOWED_IDENT.has(name)) throw new Error("INVALID_EXPRESSION");
      this.consume("IDENT");

      if (name === "pi") return Math.PI;
      if (name === "e") return Math.E;

      this.consume("LPAREN");
      const arg = this.parseExpression();
      this.consume("RPAREN");

      switch (name) {
        case "sin":
          return Math.sin(this.trigArg(arg));
        case "cos":
          return Math.cos(this.trigArg(arg));
        case "tan": {
          if (this.angleMode === "DEG") {
            if (isTanUndefinedDegrees(arg)) throw new Error("UNSUPPORTED_OPERATION");
          } else if (isTanUndefinedRadians(arg)) {
            throw new Error("UNSUPPORTED_OPERATION");
          }
          return Math.tan(this.trigArg(arg));
        }
        case "sqrt": {
          if (arg < 0) throw new Error("NEGATIVE_SQRT");
          return Math.sqrt(arg);
        }
        case "log": {
          if (arg <= 0) throw new Error("INVALID_LOG_INPUT");
          return Math.log10(arg);
        }
        case "ln": {
          if (arg <= 0) throw new Error("INVALID_LOG_INPUT");
          return Math.log(arg);
        }
        default:
          throw new Error("INVALID_EXPRESSION");
      }
    }

    throw new Error("INVALID_EXPRESSION");
  }

  ensureConsumed() {
    if (this.i !== this.tokens.length) throw new Error("INVALID_EXPRESSION");
  }
}

export function evaluateExpression(expression, angleMode) {
  const trimmed = expression?.trim?.() ?? "";
  if (!trimmed) throw new Error("EMPTY_EXPRESSION");

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) throw new Error("EMPTY_EXPRESSION");

  const evaluator = new ExpressionEvaluator(tokens, angleMode);
  const raw = evaluator.parseExpression();
  evaluator.ensureConsumed();
  assertFinite(raw);
  return roundDisplayNumber(raw);
}
