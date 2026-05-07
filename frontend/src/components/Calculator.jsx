import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonGrid from "./ButtonGrid.jsx";
import Display from "./Display.jsx";
import HistoryPanel from "./HistoryPanel.jsx";
import ModeToggle from "./ModeToggle.jsx";
import { useKeyboardInput } from "../hooks/useKeyboardInput.js";
import { formatDisplayValue } from "../utils/formatDisplay.js";
import {
  balanceClosingParens,
  canEvaluate,
  toggleSignOnTrailingNumber,
} from "../utils/validateExpression.js";

function endsWithDigitOrClose(expr) {
  const t = expr.trimEnd();
  if (!t) return false;
  const ch = t[t.length - 1];
  return /\d/.test(ch) || ch === ")";
}

function appendAutoMultiply(expression, fragment) {
  const glue =
    endsWithDigitOrClose(expression) &&
    (fragment.startsWith("(") ||
      /^[a-z]/i.test(fragment))
      ? "*"
      : "";
  return expression + glue + fragment;
}

function appendOperator(expression, op) {
  const trimmed = expression.trimEnd();
  if (!trimmed && op === "-") return "-";
  if (op === "%") {
    return trimmed + "%";
  }
  const endsOp = /[+\-*/^]$/.test(trimmed);
  if (endsOp) {
    return trimmed.slice(0, -1) + op;
  }
  return trimmed + op;
}

function appendDecimal(expression) {
  const t = expression.trimEnd();
  const m = t.match(/(\d+\.?\d*)$/);
  if (!m) return t + ".";
  if (m[0].includes(".")) return t;
  return t + ".";
}

function digitBtn(value) {
  return {
    id: `n-${value}`,
    label: value,
    variant: "num",
    action: "digit",
    value,
  };
}

function opBtn(id, label, value, ariaLabel) {
  return {
    id,
    label,
    variant: "op",
    action: "operator",
    value,
    ariaLabel,
  };
}

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [angleMode, setAngleMode] = useState("DEG");
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);

  const refreshHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/history");
      const json = await res.json();
      if (json.success && Array.isArray(json.data?.items)) {
        setHistory(json.data.items);
      }
    } catch {
      /* ignore offline */
    }
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const evaluateNow = useCallback(async () => {
    if (!canEvaluate(expression) || busy) return;
    const prepared = balanceClosingParens(expression.trim());
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: prepared, angleMode }),
      });
      const json = await res.json();
      if (!json.success) {
        const code = json.error?.code ?? "INVALID_EXPRESSION";
        const msg =
          json.error?.message ?? "Could not evaluate this expression.";
        setError(`${msg}${code ? ` (${code})` : ""}`);
        setResult(null);
        return;
      }
      const value = json.data?.result;
      setResult(value);
      setExpression(String(json.data?.expression ?? prepared));
      await refreshHistory();
    } catch {
      setError("Unable to reach calculator service.");
      setResult(null);
    } finally {
      setBusy(false);
    }
  }, [angleMode, busy, expression, refreshHistory]);

  const applyMemory = useCallback(
    (mode) => {
      setError("");
      if (mode === "MC") {
        setMemory(0);
        return;
      }
      if (mode === "MR") {
        const piece = formatDisplayValue(memory);
        setExpression((prev) => appendAutoMultiply(prev, piece));
        return;
      }
      const base =
        result !== null && result !== undefined && !Number.isNaN(result)
          ? Number(result)
          : null;
      if (base === null) return;
      if (mode === "M+") {
        setMemory((m) => m + base);
        return;
      }
      if (mode === "M-") {
        setMemory((m) => m - base);
      }
    },
    [memory, result]
  );

  const clearAll = useCallback(() => {
    setExpression("");
    setResult(null);
    setError("");
  }, []);

  const backspace = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
    setError("");
  }, []);

  const handleButton = useCallback(
    (btn) => {
      setError("");
      if (btn.action === "digit") {
        setExpression((prev) => prev + btn.value);
        return;
      }
      if (btn.action === "decimal") {
        setExpression((prev) => appendDecimal(prev));
        return;
      }
      if (btn.action === "operator") {
        setExpression((prev) => appendOperator(prev, btn.value));
        return;
      }
      if (btn.action === "func") {
        setExpression((prev) => appendAutoMultiply(prev, btn.value));
        return;
      }
      if (btn.action === "const") {
        setExpression((prev) => appendAutoMultiply(prev, btn.value));
        return;
      }
      if (btn.action === "parenOpen") {
        setExpression((prev) => appendAutoMultiply(prev, "("));
        return;
      }
      if (btn.action === "parenClose") {
        setExpression((prev) => prev + ")");
        return;
      }
      if (btn.action === "sign") {
        setExpression((prev) => {
          if (!prev && result !== null && Number.isFinite(Number(result))) {
            return String(-Number(result));
          }
          return toggleSignOnTrailingNumber(prev);
        });
        return;
      }
      if (btn.action === "clear") {
        clearAll();
        return;
      }
      if (btn.action === "backspace") {
        backspace();
        return;
      }
      if (btn.action === "equals") {
        void evaluateNow();
        return;
      }
      if (btn.action === "memory") {
        applyMemory(btn.value);
      }
    },
    [applyMemory, backspace, clearAll, evaluateNow, result]
  );

  const rows = useMemo(
    () => [
      [
        {
          id: "mc",
          label: "MC",
          variant: "mem",
          action: "memory",
          value: "MC",
          ariaLabel: "Memory clear",
        },
        {
          id: "mr",
          label: "MR",
          variant: "mem",
          action: "memory",
          value: "MR",
          ariaLabel: "Memory recall",
        },
        {
          id: "m-",
          label: "M−",
          variant: "mem",
          action: "memory",
          value: "M-",
          ariaLabel: "Memory subtract",
        },
        {
          id: "m+",
          label: "M+",
          variant: "mem",
          action: "memory",
          value: "M+",
          ariaLabel: "Memory add",
        },
      ],
      [
        {
          id: "sin",
          label: "sin",
          variant: "fn",
          action: "func",
          value: "sin(",
        },
        {
          id: "cos",
          label: "cos",
          variant: "fn",
          action: "func",
          value: "cos(",
        },
        {
          id: "tan",
          label: "tan",
          variant: "fn",
          action: "func",
          value: "tan(",
        },
        {
          id: "log",
          label: "log",
          variant: "fn",
          action: "func",
          value: "log(",
        },
      ],
      [
        {
          id: "ln",
          label: "ln",
          variant: "fn",
          action: "func",
          value: "ln(",
        },
        {
          id: "sqrt",
          label: "√",
          variant: "fn",
          action: "func",
          value: "sqrt(",
          ariaLabel: "Square root",
        },
        {
          id: "pi",
          label: "π",
          variant: "fn",
          action: "const",
          value: "pi",
          ariaLabel: "Pi constant",
        },
        {
          id: "e",
          label: "e",
          variant: "fn",
          action: "const",
          value: "e",
          ariaLabel: "Euler constant",
        },
      ],
      [
        {
          id: "pow",
          label: "^",
          variant: "op",
          action: "operator",
          value: "^",
        },
        {
          id: "pct",
          label: "%",
          variant: "op",
          action: "operator",
          value: "%",
        },
        {
          id: "sign",
          label: "±",
          variant: "op",
          action: "sign",
          ariaLabel: "Toggle sign",
        },
        {
          id: "ac",
          label: "AC",
          variant: "op",
          action: "clear",
          ariaLabel: "All clear",
        },
      ],
      [
        {
          id: "bs",
          label: "⌫",
          variant: "op",
          action: "backspace",
          ariaLabel: "Backspace",
        },
        {
          id: "(",
          label: "(",
          variant: "op",
          action: "parenOpen",
        },
        {
          id: ")",
          label: ")",
          variant: "op",
          action: "parenClose",
        },
        {
          id: "/",
          label: "÷",
          variant: "op",
          action: "operator",
          value: "/",
          ariaLabel: "Divide",
        },
      ],
      [
        digitBtn("7"),
        digitBtn("8"),
        digitBtn("9"),
        opBtn("mul", "×", "*", "Multiply"),
      ],
      [
        digitBtn("4"),
        digitBtn("5"),
        digitBtn("6"),
        opBtn("sub", "−", "-", "Subtract"),
      ],
      [
        digitBtn("1"),
        digitBtn("2"),
        digitBtn("3"),
        opBtn("add", "+", "+", "Add"),
      ],
      [
        {
          id: "zero",
          label: "0",
          variant: "num",
          action: "digit",
          value: "0",
          wide: true,
        },
        {
          id: "dot",
          label: ".",
          variant: "num",
          action: "decimal",
        },
        {
          id: "eq",
          label: "=",
          variant: "op",
          action: "equals",
          ariaLabel: "Calculate",
        },
        { kind: "spacer", id: "pad-br" },
      ],
    ],
    []
  );

  useKeyboardInput({
    onDigit: (d) => handleButton({ action: "digit", value: d }),
    onDecimal: () => handleButton({ action: "decimal" }),
    onOperator: (op) => handleButton({ action: "operator", value: op }),
    onParenOpen: () => handleButton({ action: "parenOpen" }),
    onParenClose: () => handleButton({ action: "parenClose" }),
    onEnter: () => handleButton({ action: "equals" }),
    onBackspace: () => handleButton({ action: "backspace" }),
    onClear: () => handleButton({ action: "clear" }),
  });

  const clearRemoteHistory = useCallback(async () => {
    try {
      await fetch("/api/history", { method: "DELETE" });
      await refreshHistory();
    } catch {
      /* ignore */
    }
  }, [refreshHistory]);

  return (
    <div className="calculator-shell">
      <div className="calculator-card">
        <header className="calculator-card__header">
          <ModeToggle angleMode={angleMode} onChange={setAngleMode} />
        </header>
        <Display
          expression={expression}
          result={result}
          error={error}
          angleMode={angleMode}
          memoryActive={memory !== 0}
        />
        <ButtonGrid rows={rows} onPress={handleButton} disabled={busy} />
      </div>
      <div className="history-wrap">
        <HistoryPanel
          items={history}
          onPick={(expr) => {
            setExpression(expr);
            setError("");
          }}
        />
        <button
          type="button"
          className="history-clear"
          onClick={() => void clearRemoteHistory()}
        >
          Clear server history
        </button>
      </div>
    </div>
  );
}
