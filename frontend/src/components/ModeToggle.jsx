export default function ModeToggle({ angleMode, onChange }) {
  return (
    <div className="mode-toggle" role="group" aria-label="angle mode">
      <button className={angleMode === "DEG" ? "active" : ""} onClick={() => onChange("DEG")}>
        DEG
      </button>
      <button className={angleMode === "RAD" ? "active" : ""} onClick={() => onChange("RAD")}>
        RAD
      </button>
    </div>
  );
}
