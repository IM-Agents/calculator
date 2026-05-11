import { useCallback, useEffect, useState } from "react";
import ButtonGrid from "./ButtonGrid.jsx";
import Display from "./Display.jsx";
import HistoryPanel from "./HistoryPanel.jsx";
import ModeToggle from "./ModeToggle.jsx";
import { useKeyboardInput } from "../hooks/useKeyboardInput.js";
import { canAppendDecimal, isValidExpression } from "../utils/validateExpression.js";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [memoryValue, setMemoryValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState("DEG");

  const evaluate = useCallback(async () => {
    if (!isValidExpression(expression)) {
      setError("Enter an expression.");
      return;
    }

    try {
      setError("");
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ expression, angleMode })
      });
      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.error.message);
      }
      setResult(payload.data.result);
      setHistory((previous) => [payload.data.historyItem, ...previous].slice(0, 10));
    } catch (requestError) {
      setError(requestError.message || "Unable to evaluate expression.");
    }
  }, [angleMode, expression]);

  const onPress = useCallback(
    (label) => {
      setError("");
      if (label === "=") {
        void evaluate();
        return;
      }
      if (label === "AC") {
        setExpression("");
        setResult(null);
        setError("");
        return;
      }
      if (label === "⌫") {
        setExpression((value) => value.slice(0, -1));
        return;
      }
      if (label === "±") {
        setExpression((value) => (value.startsWith("-") ? value.slice(1) : `-${value}`));
        return;
      }
      if (label === "MR") {
        setExpression((value) => `${value}${memoryValue}`);
        return;
      }
      if (label === "MC") {
        setMemoryValue(0);
        return;
      }
      if (label === "M+" && Number.isFinite(Number(result))) {
        setMemoryValue((value) => value + Number(result));
        return;
      }
      if (label === "M-" && Number.isFinite(Number(result))) {
        setMemoryValue((value) => value - Number(result));
        return;
      }
      if (label === "." && !canAppendDecimal(expression)) {
        return;
      }

      const mapped = label === "pi" ? "pi" : label;
      setExpression((value) => `${value}${mapped}`);
    },
    [evaluate, expression, memoryValue, result]
  );

  useKeyboardInput(onPress);

  useEffect(() => {
    async function loadHistory() {
      const response = await fetch("/api/history", { credentials: "include" });
      const payload = await response.json();
      if (payload.success) {
        setHistory(payload.data.items);
      }
    }

    void loadHistory();
  }, []);

  return (
    <div className="calculator-layout">
      <section className="calculator-panel">
        <ModeToggle angleMode={angleMode} onToggle={setAngleMode} />
        <Display expression={expression} result={result} error={error} />
        <ButtonGrid onPress={onPress} />
      </section>
      <HistoryPanel history={history} />
    </div>
  );
}
