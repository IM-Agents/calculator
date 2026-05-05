export function formatDisplay(value) {
  if (value === null || value === undefined || value === "") return "0";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "Error";
    const asString = Number(value.toPrecision(12)).toString();
    return asString;
  }
  return String(value);
}
