import { formatDisplayValue } from '../utils/formatDisplay.js';

export default function Display({ expression, result, error }) {
  return (
    <div className="display" role="status" aria-live="polite">
      <div className="display__expression">{formatDisplayValue(expression) || '0'}</div>
      <div className={`display__secondary ${error ? 'display__secondary--error' : ''}`}>
        {error || (result !== null && result !== undefined ? `= ${formatDisplayValue(result)}` : '\u00a0')}
      </div>
    </div>
  );
}
