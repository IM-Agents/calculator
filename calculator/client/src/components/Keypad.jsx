const rows = [
  ["MC", "MR", "M+", "M-", "AC"],
  ["sin", "cos", "tan", "log", "ln"],
  ["sqrt", "%", "^", "+/-", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "pi", "e", "="]
];

export default function Keypad({ onInput }) {
  return (
    <section className="keypad">
      {rows.map((row, rowIndex) => (
        <div className="keypad-row" key={`row-${rowIndex}`}>
          {row.map((key) => (
            <button
              key={key}
              type="button"
              className={`key ${key === "=" ? "key-equals" : ""}`}
              onClick={() => onInput(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </section>
  );
}
