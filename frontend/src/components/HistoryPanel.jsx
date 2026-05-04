import styles from './HistoryPanel.module.css';

export default function HistoryPanel({ entries, onClear }) {
  return (
    <aside className={styles.panel} aria-label="Calculation history">
      <div className={styles.head}>
        <h2 className={styles.title}>History</h2>
        <button type="button" className={styles.clearBtn} onClick={onClear}>
          Clear
        </button>
      </div>
      <ol className={styles.list}>
        {entries.length === 0 ? (
          <li className={styles.empty}>No calculations yet</li>
        ) : (
          entries.map((item, idx) => (
            <li key={`${item.createdAt ?? idx}-${item.expression}`} className={styles.item}>
              <div className={styles.expr}>{item.expression}</div>
              <div className={styles.result}>= {item.result}</div>
            </li>
          ))
        )}
      </ol>
    </aside>
  );
}
