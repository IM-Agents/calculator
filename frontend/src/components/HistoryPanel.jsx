export default function HistoryPanel({ items, onUse, onClear }) {
  return (
    <section className="history-panel">
      <div className="history-header">
        <h2>History</h2>
        <button onClick={onClear}>Clear</button>
      </div>
      <ul>
        {items.length === 0 ? <li className="history-empty">No calculations yet.</li> : null}
        {items.map((item) => (
          <li key={item.id}>
            <button onClick={() => onUse(String(item.result))}>
              <span>{item.expression}</span>
              <strong>= {item.result}</strong>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
