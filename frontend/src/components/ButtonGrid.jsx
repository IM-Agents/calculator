const BUTTONS = [
  ["AC", "DEL", "(", ")", "/"],
  ["sin(", "cos(", "tan(", "sqrt(", "*"],
  ["7", "8", "9", "^", "-"],
  ["4", "5", "6", "log(", "+"],
  ["1", "2", "3", "ln(", "±"],
  ["0", ".", "%", "pi", "e"],
  ["="]
];

export default function ButtonGrid({ onInput }) {
  return (
    <div className="button-grid">
      {BUTTONS.flat().map((button) => (
        <button
          key={button}
          className={button === "=" ? "equals" : ""}
          onClick={() => onInput(button)}
          type="button"
        >
          {button}
        </button>
      ))}
    </div>
  );
}
