import { useCallback, useEffect, useState } from 'react';
import {
  calculateExpression,
  fetchHistory,
  clearHistoryRemote,
  fetchMemory,
  applyMemory,
} from '../services/calculatorApi.js';
import { mapHistoryEntries } from '../utils/historyMapper.js';
import { canAppendDecimal } from '../utils/inputFormatter.js';
import {
  appendChar,
  applyPercentToLastNumber,
  toggleSign,
  memoryOperandValue,
} from '../utils/expressionBuilder.js';

export function useCalculatorState() {
  const [expression, setExpression] = useState('');
  const [displayResult, setDisplayResult] = useState('');
  const [error, setError] = useState('');
  const [angleMode, setAngleMode] = useState('deg');
  const [history, setHistory] = useState([]);
  const [memoryValue, setMemoryValue] = useState(0);
  const [pendingFreshNumber, setPendingFreshNumber] = useState(false);
  const [busy, setBusy] = useState(false);

  const refreshHistory = useCallback(async () => {
    try {
      const res = await fetchHistory();
      setHistory(mapHistoryEntries(res));
    } catch (err) {
      console.error('Failed to refresh history:', err);
      setHistory([]);
      setError('Unable to refresh history.');
    }
  }, []);

  const refreshMemory = useCallback(async () => {
    try {
      const res = await fetchMemory();
      if (res.success && res.data && typeof res.data.memoryValue === 'number') {
        setMemoryValue(res.data.memoryValue);
      }
    } catch (err) {
      console.error('Failed to refresh memory:', err);
      setMemoryValue(0);
      setError('Unable to refresh memory.');
    }
  }, []);

  useEffect(() => {
    refreshHistory();
    refreshMemory();
  }, [refreshHistory, refreshMemory]);

  const pushExpression = useCallback(
    (fn) => {
      setExpression((prev) => {
        const next = typeof fn === 'function' ? fn(prev) : fn;
        return next;
      });
      setError('');
    },
    [],
  );

  const appendSymbol = useCallback(
    (symbol) => {
      setPendingFreshNumber(false);
      pushExpression((prev) => appendChar(prev, symbol));
    },
    [pushExpression],
  );

  const appendDigit = useCallback(
    (digit) => {
      if (pendingFreshNumber) {
        setPendingFreshNumber(false);
        setExpression(String(digit));
        setDisplayResult('');
        setError('');
        return;
      }
      pushExpression((prev) => appendChar(prev, String(digit)));
    },
    [pendingFreshNumber, pushExpression],
  );

  const appendDot = useCallback(() => {
    if (pendingFreshNumber) {
      setPendingFreshNumber(false);
      setExpression('.');
      setDisplayResult('');
      setError('');
      return;
    }
    pushExpression((prev) => {
      const allow = canAppendDecimal(prev);
      return appendChar(prev, '.', { allowDecimal: allow });
    });
  }, [pendingFreshNumber, pushExpression]);

  const insertConstant = useCallback(
    (name) => {
      setPendingFreshNumber(false);
      pushExpression((prev) => `${prev}${name}`);
    },
    [pushExpression],
  );

  const insertFunction = useCallback(
    (name) => {
      setPendingFreshNumber(false);
      pushExpression((prev) => `${prev}${name}(`);
    },
    [pushExpression],
  );

  const handlePercent = useCallback(() => {
    setPendingFreshNumber(false);
    pushExpression((prev) => applyPercentToLastNumber(prev));
  }, [pushExpression]);

  const handleToggleSign = useCallback(() => {
    setPendingFreshNumber(false);
    pushExpression((prev) => toggleSign(prev));
  }, [pushExpression]);

  const handleClear = useCallback(() => {
    setExpression('');
    setDisplayResult('');
    setError('');
    setPendingFreshNumber(false);
  }, []);

  const handleBackspace = useCallback(() => {
    setPendingFreshNumber(false);
    pushExpression((prev) => prev.slice(0, -1));
  }, [pushExpression]);

  const evaluate = useCallback(async () => {
    setBusy(true);
    setError('');
    try {
      const res = await calculateExpression(expression, angleMode);
      if (res.success && res.data) {
        const formatted = res.data.formattedResult ?? String(res.data.result);
        setDisplayResult(formatted);
        setExpression(formatted);
        setPendingFreshNumber(true);
        await refreshHistory();
      } else if (res.error) {
        setDisplayResult('');
        setError(res.error.message || 'Calculation failed.');
      }
    } catch {
      setError('Unable to reach the calculator service.');
    } finally {
      setBusy(false);
    }
  }, [angleMode, expression, refreshHistory]);

  const clearHistory = useCallback(async () => {
    try {
      await clearHistoryRemote();
      await refreshHistory();
    } catch (err) {
      console.error('Failed to clear history:', err);
      setError('Unable to clear history.');
    }
  }, [refreshHistory]);

  const memoryAction = useCallback(
    async (action) => {
      try {
        const value = memoryOperandValue(expression, displayResult, pendingFreshNumber);
        if ((action === 'M+' || action === 'M-') && !Number.isFinite(value)) {
          setError('Evaluate the expression first or enter a single number before using M+ / M−.');
          return;
        }
        const payloadValue = action === 'MR' || action === 'MC' ? 0 : value;
        const res = await applyMemory(action, payloadValue);
        if (res.success && res.data) {
          setMemoryValue(res.data.memoryValue);
          if (action === 'MR') {
            setPendingFreshNumber(true);
            setExpression(String(res.data.memoryValue));
            setDisplayResult('');
            setError('');
          }
        } else {
          setError(res.error?.message || 'Memory operation failed.');
        }
      } catch (err) {
        console.error('Failed to apply memory action:', err);
        setError('Unable to complete memory operation.');
      }
    },
    [expression, displayResult, pendingFreshNumber],
  );

  const toggleAngleMode = useCallback(() => {
    setAngleMode((m) => (m === 'deg' ? 'rad' : 'deg'));
  }, []);

  return {
    expression,
    displayResult,
    error,
    angleMode,
    history,
    memoryValue,
    busy,
    appendDigit,
    appendDot,
    appendSymbol,
    insertConstant,
    insertFunction,
    handlePercent,
    handleToggleSign,
    handleClear,
    handleBackspace,
    evaluate,
    clearHistory,
    memoryAction,
    toggleAngleMode,
    refreshHistory,
    refreshMemory,
  };
}
