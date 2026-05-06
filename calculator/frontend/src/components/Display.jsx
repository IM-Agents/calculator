import { formatDisplayValue } from "../utils/formatDisplay.js";

export default function Display({
  expression,
  result,
  error,
  angleMode,
  memoryActive,
}) {
  const primary = error || formatDisplayValue(result);
  const secondary = expression || "";

  return (
    <section className="display" aria-live="polite">
      <div className="display__meta">
        <span className="display__badge" aria-label="Angle mode">
          {angleMode}
        </span>
        {memoryActive ? (
          <span className="display__badge display__badge--memory" aria-label="Memory has value">
            M
          </span>
        ) : null}
      </div>
      <div className="display__expression" title={secondary}>
        {secondary || "\u00a0"}
      </div>
      <div
        className={`display__primary ${error ? "display__primary--error" : ""}`}
        title={primary}
      >
        {primary || "\u00a0"}
      </div>
    </section>
  );
}
