export function formatDisplay(value) {
  if (value === null || value === undefined || value === "") {
    return "0";
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "Error";
  }
  return Math.abs(numeric) >= 1e12 ? numeric.toExponential(6) : String(numeric);
}
