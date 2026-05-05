import { useCallback, useEffect, useState } from "react";
import ButtonGrid from "./ButtonGrid";
import Display from "./Display";
import HistoryPanel from "./HistoryPanel";
import ModeToggle from "./ModeToggle";
import { useKeyboardInput } from "../hooks/useKeyboardInput";
import { validateExpression } from "../utils/validateExpression";

function toggleSign(expression) {
  const match = expression.match(/(.+?)([-+]?)(\d*\.?\d+)$/);
  if (!match) return expression;
  const [, prefix, sign, number] = match;
  if (sign === "+") return `${prefix}-${number}`;
  if (sign === "-") return `${prefix}+${number}`;
  return `${prefix}-${number}`;
}

export default function Calculator() {
  const [expression, setExpression] = useState("0");
  const [error, setError] = useState("");
  const [angleMode, setAngleMode] = useState("DEG");
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    const response = await fetch("/api/history", { credentials: "include" });
    if (!response.ok) return;
    const data = await response.json();
    setHistory(data.items ?? []);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const evaluate = useCallback(async () => {
    if (!validateExpression(expression)) {
      setError("Enter an expression");
      return;
    }
    const response = await fetch("/api/calculate", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression, angleMode })
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.message || "Failed to evaluate");
      return;
    }
    setExpression(String(payload.result));
    setError("");
    loadHistory();
  }, [angleMode, expression, loadHistory]);

  const clearHistory = useCallback(async () => {
    await fetch("/api/history", { method: "DELETE", credentials: "include" });
    setHistory([]);
  }, []);

  const handleInput = useCallback(
    (value) => {
      if (value === "=") {
        evaluate();
        return;
      }
      if (value === "AC") {
        setExpression("0");
        setError("");
        return;
      }
      if (value === "DEL") {
        setExpression((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
        return;
      }
      if (value === "±") {
        setExpression((prev) => toggleSign(prev));
        return;
      }
      setError("");
      setExpression((prev) => (prev === "0" ? value : `${prev}${value}`));
    },
    [evaluate]
  );

  useKeyboardInput(handleInput);

  return (
    <main className="calculator-page">
      <section className="calculator-shell">
        <ModeToggle angleMode={angleMode} onChange={setAngleMode} />
        <Display expression={expression} error={error} />
        <ButtonGrid onInput={handleInput} />
      </section>
      <HistoryPanel items={history} onUse={setExpression} onClear={clearHistory} />
    </main>
  );
}
