export default function HistoryPanel({ items = [], onClear }) {
  return (
    <aside className="history-panel" aria-label="Calculation history">
      <header className="history-panel__header">
        <h2 className="history-panel__title">History</h2>
        <button type="button" className="history-panel__clear" onClick={onClear}>
          Clear
        </button>
      </header>
      <ol className="history-panel__list">
        {items.length === 0 ? (
          <li className="history-panel__empty">No calculations yet</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="history-panel__item">
              <span className="history-panel__expr">{item.expression}</span>
              <span className="history-panel__res">= {item.result}</span>
            </li>
          ))
        )}
      </ol>
    </aside>
  );
}
