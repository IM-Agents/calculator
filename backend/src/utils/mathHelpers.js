const EPS = 1e-12;

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function normalizeTrigAngleDegrees(angleDeg) {
  let a = angleDeg % 180;
  if (a < 0) a += 180;
  return a;
}

export function isTanUndefinedDegrees(angleDeg) {
  const a = normalizeTrigAngleDegrees(angleDeg);
  return Math.abs(a - 90) < EPS;
}

export function isTanUndefinedRadians(angleRad) {
  const halfPi = Math.PI / 2;
  const k = angleRad / halfPi;
  const nearest = Math.round(k);
  return Math.abs(k - nearest) < EPS && Math.abs(nearest % 2) === 1;
}

export function roundDisplayNumber(value) {
  if (!Number.isFinite(value)) return value;
  const rounded = Number.parseFloat(Number(value.toPrecision(12)));
  return Object.is(rounded, -0) ? 0 : rounded;
}
