function HistoryPanel({ history, onReuse, onClear }) {
  return (
    <aside className="history-panel">
      <div className="history-header">
        <h2>History</h2>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
      <ul>
        {history.length === 0 ? (
          <li className="empty">No calculations yet.</li>
        ) : (
          history.map((entry) => (
            <li key={entry.id}>
              <button type="button" onClick={() => onReuse(entry.result)}>
                <span>{entry.expression}</span>
                <strong>{entry.result}</strong>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}

export default HistoryPanel
