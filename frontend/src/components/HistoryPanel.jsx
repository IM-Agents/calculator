import { formatDisplayValue } from '../utils/formatDisplay.js';

export default function HistoryPanel({ items, onReuse }) {
  return (
    <aside className="history-panel" aria-label="Calculation history">
      <h2 className="history-panel__title">History</h2>
      <ol className="history-panel__list">
        {items.length === 0 && (
          <li className="history-panel__empty">No calculations yet.</li>
        )}
        {items.map((item) => (
          <li key={item.id ?? `${item.timestamp}-${item.expression}`} className="history-panel__item">
            <button
              type="button"
              className="history-panel__reuse"
              onClick={() => onReuse?.(item.expression)}
              title="Use this expression"
            >
              <span className="history-panel__expr">{formatDisplayValue(item.expression)}</span>
              <span className="history-panel__res">= {formatDisplayValue(item.result)}</span>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}
