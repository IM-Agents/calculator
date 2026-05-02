import { Button } from './Button.jsx';

export function HistoryPanel({ history, onClear }) {
  return (
    <aside className="history-panel" aria-label="Recent calculations">
      <div className="history-panel__head">
        <h2 className="history-panel__title">History</h2>
        <Button label="Clear" variant="ghost" ariaLabel="Clear history" onClick={onClear} />
      </div>
      {history.length === 0 ? (
        <p className="history-panel__empty">No calculations yet.</p>
      ) : (
        <ol className="history-panel__list">
          {history.map((h, i) => (
            <li key={`${h.timestamp}-${i}`} className="history-panel__item">
              <span className="history-panel__expr">{h.expression}</span>
              <span className="history-panel__res">= {h.result}</span>
              <span className="history-panel__mode">{h.angleMode}</span>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
