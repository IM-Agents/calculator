import { CalculatorError } from '../utils/errors.js';
import { ERROR_CODES } from '../utils/constants.js';

const EPS = 1e-12;

function toRadians(value, angleMode) {
  if (angleMode === 'deg') return (value * Math.PI) / 180;
  return value;
}

export function applyUnaryFunction(name, x, angleMode) {
  switch (name) {
    case 'sqrt':
      if (x < 0) {
        throw new CalculatorError(
          ERROR_CODES.INVALID_DOMAIN,
          'Square root of a negative number is not allowed.',
        );
      }
      return Math.sqrt(x);
    case 'log':
      if (x <= 0) {
        throw new CalculatorError(
          ERROR_CODES.INVALID_DOMAIN,
          'Logarithm is only defined for positive numbers.',
        );
      }
      return Math.log10(x);
    case 'ln':
      if (x <= 0) {
        throw new CalculatorError(
          ERROR_CODES.INVALID_DOMAIN,
          'Natural logarithm is only defined for positive numbers.',
        );
      }
      return Math.log(x);
    case 'sin':
      return Math.sin(toRadians(x, angleMode));
    case 'cos':
      return Math.cos(toRadians(x, angleMode));
    case 'tan': {
      const rad = toRadians(x, angleMode);
      if (Math.abs(Math.cos(rad)) < EPS) {
        throw new CalculatorError(
          ERROR_CODES.INVALID_DOMAIN,
          'Tangent is undefined at this angle.',
        );
      }
      return Math.tan(rad);
    }
    default:
      throw new CalculatorError(
        ERROR_CODES.UNSUPPORTED_OPERATION,
        `Unsupported function: ${name}`,
      );
  }
}
