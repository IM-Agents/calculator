import { useCallback, useEffect, useRef, useState } from 'react';
import CalculatorLayout from './components/CalculatorLayout.jsx';
import {
  evaluateOnServer,
  fetchHistory,
  clearServerHistory,
} from './api/calculatorApi.js';
import {
  formatResult,
  toggleTrailingNumberSign,
  appendDigit,
  canAppendDecimal,
} from './utils/formatResult.js';

const SCI_OPEN = {
  sin: 'sin(',
  cos: 'cos(',
  tan: 'tan(',
  log: 'log(',
  ln: 'ln(',
  sqrt: 'sqrt(',
};

const OP_CHARS = new Set(['+', '-', '*', '/', '%', '^']);

function appendOperator(expr, op) {
  const base = expr ?? '';
  if (!base && op !== '-') return '';
  const last = base.slice(-1);
  if (OP_CHARS.has(last) && OP_CHARS.has(op)) {
    if (op === '-' && '*/%^'.includes(last)) return base + op;
    return base.slice(0, -1) + op;
  }
  return base + op;
}

function mapKeyToLabel(key) {
  const map = {
    Enter: '=',
    '=': '=',
    Backspace: 'DEL',
    Escape: 'AC',
    '/': '÷',
    '*': '×',
    '-': '−',
    '+': '+',
    '%': '%',
    '^': '^',
    '(': '(',
    ')': ')',
    '.': '.',
  };
  if (map[key] !== undefined) return map[key];
  if (key >= '0' && key <= '9') return key;
  return null;
}

function mapLabelToExprAppend(label, prevExpr, lastWasEquals) {
  switch (label) {
    case '÷':
      return { expr: appendOperator(prevExpr, '/'), resetEq: false };
    case '×':
      return { expr: appendOperator(prevExpr, '*'), resetEq: false };
    case '−':
      return { expr: appendOperator(prevExpr, '-'), resetEq: false };
    case '+':
      return { expr: appendOperator(prevExpr, '+'), resetEq: false };
    case '%':
      return { expr: appendOperator(prevExpr, '%'), resetEq: false };
    case '^':
      return { expr: appendOperator(prevExpr, '^'), resetEq: false };
    case 'π':
      return {
        expr: (lastWasEquals ? '' : prevExpr) + 'pi',
        resetEq: false,
      };
    case 'e':
      return {
        expr: (lastWasEquals ? '' : prevExpr) + 'e',
        resetEq: false,
      };
    case '(':
      return {
        expr: (lastWasEquals ? '' : prevExpr) + '(',
        resetEq: false,
      };
    case ')':
      return {
        expr: (lastWasEquals ? '' : prevExpr) + ')',
        resetEq: false,
      };
    default:
      if (SCI_OPEN[label]) {
        return {
          expr: (lastWasEquals ? '' : prevExpr) + SCI_OPEN[label],
          resetEq: false,
        };
      }
      if (label >= '0' && label <= '9') {
        return {
          expr: appendDigit(prevExpr, label, lastWasEquals),
          resetEq: false,
        };
      }
      return null;
  }
}

export default function App() {
  const [currentExpression, setCurrentExpression] = useState('');
  const [angleMode, setAngleMode] = useState('deg');
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [memoryValue, setMemoryValue] = useState(null);
  const [lastWasEquals, setLastWasEquals] = useState(false);
  const [busy, setBusy] = useState(false);
  const exprRef = useRef('');
  exprRef.current = currentExpression;

  const displayValue = currentExpression || '0';

  const loadHistory = useCallback(async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[calculator] fetchHistory failed', err);
      }
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const applyButton = useCallback(
    async (label) => {
      setError(null);

      if (label === 'AC') {
        setCurrentExpression('');
        setLastWasEquals(false);
        return;
      }
      if (label === 'DEL') {
        setCurrentExpression((e) => e.slice(0, -1));
        setLastWasEquals(false);
        return;
      }
      if (label === '±') {
        setCurrentExpression((e) => toggleTrailingNumberSign(e));
        setLastWasEquals(false);
        return;
      }
      if (label === '.') {
        setCurrentExpression((e) => {
          const base = lastWasEquals ? '' : e;
          if (!canAppendDecimal(e, lastWasEquals)) return base;
          if (lastWasEquals) return '.';
          if (!base.length) return '0.';
          if (/[+\-*/%^()]$/.test(base)) return `${base}0.`;
          return `${base}.`;
        });
        setLastWasEquals(false);
        return;
      }
      if (label === 'MC') {
        setMemoryValue(null);
        return;
      }
      if (label === 'MR') {
        if (memoryValue === null) return;
        const m = formatResult(memoryValue);
        setCurrentExpression((e) => (lastWasEquals ? m : `${e}${m}`));
        setLastWasEquals(false);
        return;
      }
      if (label === 'M+' || label === 'M-') {
        const src = exprRef.current.trim();
        if (!src) return;
        setBusy(true);
        try {
          const data = await evaluateOnServer(src, angleMode);
          const n = Number(data.result);
          if (!Number.isFinite(n)) throw new Error('Invalid value for memory.');
          setMemoryValue((prev) => {
            const base = prev ?? 0;
            return label === 'M+' ? base + n : base - n;
          });
          await loadHistory();
        } catch (e) {
          setError(e.message);
        } finally {
          setBusy(false);
        }
        return;
      }
      if (label === '=') {
        const src = exprRef.current.trim();
        if (!src) return;
        setBusy(true);
        try {
          const data = await evaluateOnServer(src, angleMode);
          const formatted = formatResult(data.result);
          setCurrentExpression(formatted);
          setLastWasEquals(true);
          await loadHistory();
        } catch (e) {
          setError(e.message);
          setLastWasEquals(false);
        } finally {
          setBusy(false);
        }
        return;
      }

      setCurrentExpression((prev) => {
        const mapped = mapLabelToExprAppend(label, prev, lastWasEquals);
        if (!mapped) return prev;
        return mapped.expr;
      });
      setLastWasEquals(false);
    },
    [angleMode, lastWasEquals, loadHistory, memoryValue],
  );

  useEffect(() => {
    function onKeyDown(ev) {
      if (busy) return;
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      const label = mapKeyToLabel(ev.key);
      if (!label) return;
      ev.preventDefault();
      applyButton(label);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [applyButton, busy]);

  const onHistoryClear = useCallback(async () => {
    try {
      await clearServerHistory();
      setHistory([]);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  return (
    <CalculatorLayout
      displayValue={displayValue}
      error={error}
      angleMode={angleMode}
      onAngleModeChange={setAngleMode}
      history={history}
      onHistoryClear={onHistoryClear}
      onButton={applyButton}
      disabled={busy}
    />
  );
}
