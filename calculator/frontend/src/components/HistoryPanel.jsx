import { formatDisplayValue } from "../utils/formatDisplay.js";

export default function HistoryPanel({ items, onPick }) {
  return (
    <aside className="history-panel" aria-label="Calculation history">
      <header className="history-panel__header">
        <h2 className="history-panel__title">History</h2>
        <p className="history-panel__hint">Last 10 successful calculations</p>
      </header>
      <ul className="history-panel__list">
        {items.length === 0 ? (
          <li className="history-panel__empty">No calculations yet.</li>
        ) : (
          items.map((item, idx) => (
            <li key={`${item.timestamp}-${idx}`}>
              <button
                type="button"
                className="history-panel__item"
                onClick={() => onPick(item.expression)}
                title="Reuse this expression"
              >
                <span className="history-panel__expr">{item.expression}</span>
                <span className="history-panel__eq">=</span>
                <span className="history-panel__res">
                  {formatDisplayValue(item.result)}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
