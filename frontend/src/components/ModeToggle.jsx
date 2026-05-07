export default function ModeToggle({ angleMode, onChange }) {
  return (
    <div className="mode-toggle" role="group" aria-label="Angle mode">
      <button
        type="button"
        className={`mode-toggle__btn ${angleMode === "DEG" ? "is-active" : ""}`}
        onClick={() => onChange("DEG")}
        aria-pressed={angleMode === "DEG"}
      >
        DEG
      </button>
      <button
        type="button"
        className={`mode-toggle__btn ${angleMode === "RAD" ? "is-active" : ""}`}
        onClick={() => onChange("RAD")}
        aria-pressed={angleMode === "RAD"}
      >
        RAD
      </button>
    </div>
  );
}
