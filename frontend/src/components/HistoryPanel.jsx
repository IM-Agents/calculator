export function HistoryPanel({ items, onPick, onClear }) {
  return (
    <aside className="history-panel" aria-label="Calculation history">
      <div className="history-panel__head">
        <h2 className="history-panel__title">History</h2>
        <button type="button" className="history-panel__clear" onClick={onClear}>
          Clear
        </button>
      </div>
      <ul className="history-panel__list">
        {items.length === 0 ? (
          <li className="history-panel__empty">No calculations yet</li>
        ) : (
          items.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                className="history-panel__row"
                onClick={() => onPick(row.expression)}
                title="Use this expression"
              >
                <span className="history-panel__expr">{row.expression}</span>
                <span className="history-panel__res">= {row.result}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}
