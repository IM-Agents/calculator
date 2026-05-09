const BUTTONS = [
  ["MC", "MR", "M+", "M-", "AC"],
  ["sin(", "cos(", "tan(", "sqrt(", "⌫"],
  ["log(", "ln(", "pi", "e", "^"],
  ["7", "8", "9", "/", "%"],
  ["4", "5", "6", "*", "±"],
  ["1", "2", "3", "-", "("],
  ["0", ".", ")", "+", "="]
];

export default function ButtonGrid({ onPress }) {
  return (
    <div className="button-grid">
      {BUTTONS.flat().map((label) => (
        <button key={label} type="button" onClick={() => onPress(label)}>
          {label}
        </button>
      ))}
    </div>
  );
}
