export function formatDisplayValue(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  if (!Number.isFinite(value)) return String(value);
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) {
    return value.toExponential(6).replace(/\.?0+e/, "e");
  }
  const rounded = Number.parseFloat(Number(value.toPrecision(12)));
  const out = Object.is(rounded, -0) ? 0 : rounded;
  const str = String(out);
  if (!str.includes("e") && str.includes(".")) {
    return str.replace(/\.?0+$/, "") || "0";
  }
  return str;
}
