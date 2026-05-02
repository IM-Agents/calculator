import { formatDisplayValue } from '../utils/formatter.js';

export function DisplayPanel({ value, error, angleMode, hasMemory }) {
  const main = error || formatDisplayValue(value);
  return (
    <div className="display-panel" role="status" aria-live="polite">
      <div className="display-panel__meta">
        <span className="display-panel__badge" data-active={angleMode === 'deg'}>
          DEG
        </span>
        <span className="display-panel__badge" data-active={angleMode === 'rad'}>
          RAD
        </span>
        {hasMemory ? <span className="display-panel__mem">M</span> : <span className="display-panel__mem" aria-hidden />}
      </div>
      <div className={`display-panel__main${error ? ' display-panel__main--error' : ''}`} title={main}>
        {main}
      </div>
    </div>
  );
}
