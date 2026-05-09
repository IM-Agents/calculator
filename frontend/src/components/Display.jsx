import { formatDisplay } from "../utils/formatDisplay.js";

export default function Display({ expression, result, error }) {
  return (
    <section className="display" aria-live="polite">
      <div className="display-expression">{expression || "0"}</div>
      <div className={`display-result ${error ? "error" : ""}`}>
        {error || formatDisplay(result)}
      </div>
    </section>
  );
}
