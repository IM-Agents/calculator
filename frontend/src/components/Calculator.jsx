import { useCallback, useEffect, useRef, useState } from "react";
import ButtonGrid from "./ButtonGrid.jsx";
import Display from "./Display.jsx";
import HistoryPanel from "./HistoryPanel.jsx";
import ModeToggle from "./ModeToggle.jsx";
import { useKeyboardInput } from "../hooks/useKeyboardInput.js";
import { fetchHistory, postCalculate } from "../services/api.js";
import { canAppendDecimal, isValidExpression } from "../utils/validateExpression.js";

function historyKey(item) {
  return item?.id ?? `${item.expression}\0${item.result}\0${item.timestamp ?? ""}`;
}

function historyTime(item) {
  const parsed = item.timestamp ? Date.parse(item.timestamp) : NaN;
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Merges server/local lists without clobbering: dedupe by id (fallback key), newest first. */
function mergeHistory(prev, incoming) {
  const incomingList = Array.isArray(incoming) ? incoming : incoming ? [incoming] : [];
  const seen = new Set();
  const merged = [];
  for (const item of incomingList) {
    const key = historyKey(item);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  }
  for (const item of prev) {
    const key = historyKey(item);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  }
  merged.sort((a, b) => historyTime(b) - historyTime(a));
  return merged.slice(0, 10);
}

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [memoryValue, setMemoryValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState("DEG");
  const evaluateRequestIdRef = useRef(0);
  const historyLoadIdRef = useRef(0);

  const invalidatePendingEvaluate = useCallback(() => {
    evaluateRequestIdRef.current += 1;
  }, []);

  const evaluate = useCallback(async () => {
    const requestId = ++evaluateRequestIdRef.current;

    if (!isValidExpression(expression)) {
      setError("Enter an expression.");
      return;
    }

    setError("");

    try {
      const data = await postCalculate(expression, angleMode);
      if (requestId !== evaluateRequestIdRef.current) {
        return;
      }
      setResult(data.result);
      setHistory((previous) => mergeHistory(previous, data.historyItem));
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
        invalidatePendingEvaluate();
        setExpression("");
        setResult(null);
        setError("");
        return;
      }
      if (label === "⌫") {
        invalidatePendingEvaluate();
        setExpression((value) => value.slice(0, -1));
        return;
      }
      if (label === "±") {
        invalidatePendingEvaluate();
        setExpression((value) => (value.startsWith("-") ? value.slice(1) : `-${value}`));
        return;
      }
      if (label === "MR") {
        invalidatePendingEvaluate();
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
      invalidatePendingEvaluate();
      setExpression((prev) => {
        if (label === ".") {
          return canAppendDecimal(prev) ? `${prev}.` : prev;
        }
        const mapped = label === "pi" ? "pi" : label;
        return `${prev}${mapped}`;
      });
    },
    [evaluate, invalidatePendingEvaluate, memoryValue, result]
  );

  useKeyboardInput(onPress);

  useEffect(() => {
    async function loadHistory() {
      const loadId = ++historyLoadIdRef.current;
      try {
        const data = await fetchHistory();
        if (loadId !== historyLoadIdRef.current) {
          return;
        }
        setHistory((previous) => mergeHistory(previous, data.items ?? []));
      } catch (requestError) {
        if (loadId !== historyLoadIdRef.current) {
          return;
        }
        setError(requestError.message || "Unable to load history.");
      }
    }

    void loadHistory();
    return () => {
      historyLoadIdRef.current += 1;
    };
  }, []);

  return (
    <div className="calculator-layout">
      <section className="calculator-panel">
        <ModeToggle
          angleMode={angleMode}
          onToggle={(mode) => {
            invalidatePendingEvaluate();
            setAngleMode(mode);
          }}
        />
        <Display expression={expression} result={result} error={error} />
        <ButtonGrid onPress={onPress} />
      </section>
      <HistoryPanel history={history} />
    </div>
  );
}
