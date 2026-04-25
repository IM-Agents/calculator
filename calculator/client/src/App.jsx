import { useEffect } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import { useCalculator } from "./hooks/useCalculator";

const operators = new Set(["+", "-", "*", "/", "^"]);
const scientific = new Set(["sin", "cos", "tan", "log", "ln", "sqrt", "%"]);

function History({ items }) {
  return (
    <aside className="history-panel">
      <h2>History</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.expression}-${index}`}>
            <span>{item.expression}</span>
            <strong>{item.result}</strong>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function App() {
  const calc = useCalculator();

  const handleInput = (key) => {
    if (/^\d$/.test(key)) {
      calc.inputDigit(key);
      return;
    }
    if (key === ".") return calc.inputDot();
    if (operators.has(key)) return calc.chooseOperator(key);
    if (key === "=") return calc.equals();
    if (key === "AC") return calc.resetAll();
    if (key === "+/-") return calc.toggleSign();
    if (key === "pi") return calc.useConstant(Math.PI);
    if (key === "e") return calc.useConstant(Math.E);
    if (key === "MC") return calc.memoryClear();
    if (key === "MR") return calc.memoryRecall();
    if (key === "M+") return calc.memoryAdd();
    if (key === "M-") return calc.memorySubtract();
    if (scientific.has(key)) {
      const op = key === "%" ? "percent" : key;
      return calc.runUnary(op);
    }
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (/^\d$/.test(event.key)) return handleInput(event.key);
      if (event.key === ".") return handleInput(".");
      if (event.key === "Enter" || event.key === "=") return handleInput("=");
      if (event.key === "Escape") return handleInput("AC");
      if (["+", "-", "*", "/"].includes(event.key)) return handleInput(event.key);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="app-shell">
      <header className="top-header">
        <h1>Calculator App</h1>
        <button
          type="button"
          onClick={() => calc.setAngleMode(calc.angleMode === "DEG" ? "RAD" : "DEG")}
        >
          {calc.angleMode}
        </button>
      </header>

      <main className="content-area">
        <section className="calculator-card">
          <Display
            value={calc.display}
            angleMode={calc.angleMode}
            memory={calc.memory}
            error={calc.error}
          />
          <Keypad onInput={handleInput} />
        </section>

        <History items={calc.history} />
      </main>
    </div>
  );
}
