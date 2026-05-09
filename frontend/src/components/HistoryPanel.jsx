export default function HistoryPanel({ history }) {
  return (
    <aside className="history-panel">
      <h2>History</h2>
      {history.length === 0 ? (
        <p className="history-empty">No calculations yet.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.id}>
              <span>{item.expression}</span>
              <strong>{item.result}</strong>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
