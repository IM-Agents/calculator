const historyStore = [];
const LIMIT = 10;

const binaryOps = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) throw new Error("Cannot divide by zero.");
    return a / b;
  },
  "^": (a, b) => Math.pow(a, b)
};

export const calculate = (left, operator, right) => {
  const op = binaryOps[operator];
  if (!op) {
    throw new Error("Unsupported operator.");
  }
  return Number(op(left, right).toFixed(10));
};

export const saveHistory = ({ expression, result }) => {
  historyStore.unshift({ expression, result, createdAt: new Date().toISOString() });
  if (historyStore.length > LIMIT) {
    historyStore.length = LIMIT;
  }
  return historyStore[0];
};

export const getHistory = () => historyStore;
