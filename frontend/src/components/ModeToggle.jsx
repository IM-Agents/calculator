export default function ModeToggle({ angleMode, onToggle }) {
  return (
    <div className="mode-toggle">
      <button
        type="button"
        className={angleMode === "DEG" ? "active" : ""}
        onClick={() => onToggle("DEG")}
      >
        DEG
      </button>
      <button
        type="button"
        className={angleMode === "RAD" ? "active" : ""}
        onClick={() => onToggle("RAD")}
      >
        RAD
      </button>
    </div>
  );
}
