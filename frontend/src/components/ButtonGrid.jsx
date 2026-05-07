const VARIANT = {
  num: "btn--num",
  op: "btn--op",
  fn: "btn--fn",
  mem: "btn--mem",
  wide: "btn--wide",
};

export default function ButtonGrid({ rows, onPress, disabled }) {
  return (
    <div className="button-grid" role="group" aria-label="Calculator keypad">
      {rows.map((row, ri) => (
        <div
          key={ri}
          className={`button-grid__row ${row.length > 4 ? "button-grid__row--dense" : ""}`}
        >
          {row.map((btn) =>
            btn.kind === "spacer" ? (
              <div key={btn.id} className="btn-spacer" aria-hidden="true" />
            ) : (
              <button
                key={btn.id}
                type="button"
                className={`btn ${VARIANT[btn.variant] ?? ""} ${
                  btn.wide ? VARIANT.wide : ""
                }`}
                onClick={() => onPress(btn)}
                disabled={
                  disabled &&
                  btn.action !== "clear" &&
                  btn.action !== "backspace"
                }
                aria-label={btn.ariaLabel ?? btn.label}
              >
                <span className="btn__label">{btn.label}</span>
              </button>
            )
          )}
        </div>
      ))}
    </div>
  );
}
