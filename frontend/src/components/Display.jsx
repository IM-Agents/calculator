import { formatDisplay } from "../utils/formatDisplay";

export default function Display({ expression, error }) {
  return (
    <div className="display" aria-live="polite">
      <div className="display-label">{error ? "Error" : "Expression"}</div>
      <div data-testid="display-value" className={`display-value ${error ? "display-error" : ""}`}>
        {formatDisplay(error || expression)}
      </div>
    </div>
  );
}
