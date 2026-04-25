export default function Display({ value, angleMode, memory, error }) {
  return (
    <section className="display-panel">
      <div className="display-meta">
        <span>Mode: {angleMode}</span>
        <span>Memory: {memory.toFixed(2)}</span>
      </div>
      <div className="display-value">{value}</div>
      <div className="display-error">{error || "\u00A0"}</div>
    </section>
  );
}
