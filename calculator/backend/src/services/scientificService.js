export function toRadians(value, angleMode) {
  if (angleMode === 'rad') return value;
  return (value * Math.PI) / 180;
}

export function sinWrapped(value, angleMode) {
  return Math.sin(toRadians(value, angleMode));
}

export function cosWrapped(value, angleMode) {
  return Math.cos(toRadians(value, angleMode));
}

export function tanWrapped(value, angleMode) {
  return Math.tan(toRadians(value, angleMode));
}
