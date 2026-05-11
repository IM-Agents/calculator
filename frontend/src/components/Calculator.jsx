import { useCallback, useEffect, useRef, useState } from "react";
import ButtonGrid from "./ButtonGrid.jsx";
import Display from "./Display.jsx";
import HistoryPanel from "./HistoryPanel.jsx";
import ModeToggle from "./ModeToggle.jsx";
import { useKeyboardInput } from "../hooks/useKeyboardInput.js";
import { fetchHistory, postCalculate } from "../services/api.js";
import { canAppendDecimal, isValidExpression } from "../utils/validateExpression.js";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [memoryValue, setMemoryValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState("DEG");
  const evaluateRequestIdRef = useRef(0);

  const evaluate = useCallback(async () => {
    if (!isValidExpression(expression)) {
      setError("Enter an expression.");
      return;
    }

    setError("");
    const requestId = ++evaluateRequestIdRef.current;

    try {
      const data = await postCalculate(expression, angleMode);
      if (requestId !== evaluateRequestIdRef.current) {
        return;
      }
      setResult(data.result);
      setHistory((previous) => [data.historyItem, ...previous].slice(0, 10));
    } catch (requestError) {
      if (requestId !== evaluateRequestIdRef.current) {
        return;
      }
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
      try {
        const data = await fetchHistory();
        setHistory(data.items);
      } catch (requestError) {
        setError(requestError.message || "Unable to load history.");
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
