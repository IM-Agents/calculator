const DEG_TO_RAD = Math.PI / 180;

const binaryOps = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) {
      throw new Error("Cannot divide by zero.");
    }
    return a / b;
  },
  "^": (a, b) => Math.pow(a, b)
};

export const evaluateBinary = (left, operator, right) => {
  if (!Object.prototype.hasOwnProperty.call(binaryOps, operator)) {
    throw new Error("Unsupported operation.");
  }
  return binaryOps[operator](left, right);
};

export const evaluateUnary = (operation, value, angleMode = "DEG") => {
  const normalized = Number(value);

  if (!Number.isFinite(normalized)) {
    throw new Error("Invalid number.");
  }

  switch (operation) {
    case "sqrt":
      if (normalized < 0) {
        throw new Error("Invalid input for square root.");
      }
      return Math.sqrt(normalized);
    case "percent":
      return normalized / 100;
    case "sin":
      return Math.sin(angleMode === "DEG" ? normalized * DEG_TO_RAD : normalized);
    case "cos":
      return Math.cos(angleMode === "DEG" ? normalized * DEG_TO_RAD : normalized);
    case "tan":
      return Math.tan(angleMode === "DEG" ? normalized * DEG_TO_RAD : normalized);
    case "log":
      if (normalized <= 0) {
        throw new Error("Invalid input for log.");
      }
      return Math.log10(normalized);
    case "ln":
      if (normalized <= 0) {
        throw new Error("Invalid input for ln.");
      }
      return Math.log(normalized);
    case "negate":
      return -normalized;
    default:
      throw new Error("Unsupported scientific operation.");
  }
};

export const formatResult = (value) => {
  if (!Number.isFinite(value)) {
    throw new Error("Result is not finite.");
  }

  const rounded = Number(value.toFixed(10));
  return String(rounded);
};
