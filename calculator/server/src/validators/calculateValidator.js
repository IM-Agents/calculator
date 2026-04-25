const supportedOperators = new Set(["+", "-", "*", "/", "^"]);

export const validateCalculationBody = (body) => {
  const { left, right, operator } = body;
  if (
    typeof left !== "number" ||
    typeof right !== "number" ||
    !supportedOperators.has(operator)
  ) {
    return "Invalid payload. Expected numeric left/right and supported operator.";
  }
  return null;
};

export const validateHistoryBody = (body) => {
  if (typeof body.expression !== "string" || typeof body.result !== "string") {
    return "Invalid history payload.";
  }
  return null;
};
