import { useCallback, useEffect, useRef, useState } from "react";
import ButtonGrid from "./ButtonGrid.jsx";
import Display from "./Display.jsx";
import HistoryPanel from "./HistoryPanel.jsx";
import ModeToggle from "./ModeToggle.jsx";
import { useKeyboardInput } from "../hooks/useKeyboardInput.js";
import { fetchHistory, postCalculate } from "../services/api.js";
import { canAppendDecimal, isValidExpression } from "../utils/validateExpression.js";

const MAX_HISTORY_ITEMS = 10;

function mergeHistoryEntries(previous, incoming) {
  const incomingItems = Array.isArray(incoming) ? incoming : [incoming];
  const existingIds = new Set(previous.map((item) => item.id));
  const uniqueIncoming = incomingItems.filter((item) => item && !existingIds.has(item.id));
  return [...previous, ...uniqueIncoming].slice(0, MAX_HISTORY_ITEMS);
}

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [memoryValue, setMemoryValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState("DEG");
  const latestEvalIdRef = useRef(0);

  const evaluate = useCallback(async () => {
    const evalId = latestEvalIdRef.current + 1;
    latestEvalIdRef.current = evalId;

    if (!isValidExpression(expression)) {
      setError("Enter an expression.");
      return;
    }

    try {
      setError("");
      const payload = await postCalculate(expression, angleMode);
      if (evalId !== latestEvalIdRef.current) {
        return;
      }
      setResult(payload.result);
      setHistory((previous) => mergeHistoryEntries(previous, payload.historyItem));
    } catch (requestError) {
      if (evalId !== latestEvalIdRef.current) {
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
      latestEvalIdRef.current += 1;
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
      setExpression((previous) => {
        if (label === "." && !canAppendDecimal(previous)) {
          return previous;
        }
        return `${previous}${label}`;
      });
    },
    [evaluate, memoryValue, result]
  );

  useKeyboardInput(onPress);

  const onAngleModeToggle = useCallback((nextMode) => {
    latestEvalIdRef.current += 1;
    setAngleMode(nextMode);
  }, []);

  useEffect(() => {
    async function loadHistory() {
      try {
        const payload = await fetchHistory();
        setHistory((previous) => mergeHistoryEntries(previous, payload.items));
      } catch (historyError) {
        setError(historyError.message || "Unable to load history.");
      }
    }

    void loadHistory();
  }, []);

  return (
    <div className="calculator-layout">
      <section className="calculator-panel">
        <ModeToggle angleMode={angleMode} onToggle={onAngleModeToggle} />
        <Display expression={expression} result={result} error={error} />
        <ButtonGrid onPress={onPress} />
      </section>
      <HistoryPanel history={history} />
    </div>
  );
}
