import { useCallback, useEffect, useRef, useState } from 'react';
import { toggleTrailingNumberSign } from '../utils/toggleTrailingNumberSign.js';
import { hasDoubleDecimalInLastToken, isEmptyForEvaluate } from '../utils/validateExpression.js';

const API = '/api';

export function useCalculatorState() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [angleMode, setAngleMode] = useState('DEG');
  const [memoryValue, setMemoryValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const evaluateRequestIdRef = useRef(0);
  const evaluateAbortRef = useRef(null);

  const refreshHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API}/history`, { credentials: 'include' });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error?.message || 'History request failed.');
      }
      if (json.data?.items) {
        setHistory(json.data.items);
        return;
      }
      throw new Error('History items payload is missing.');
    } catch (err) {
      const details = err instanceof Error ? err.message : String(err);
      setError((prev) => prev || `Could not refresh history: ${details}`);
    }
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const append = useCallback((chunk) => {
    setError('');
    setResult(null);
    setJustEvaluated(false);
    setExpression((prev) => {
      const next = prev + chunk;
      if (chunk === '.' && hasDoubleDecimalInLastToken(next)) {
        return prev;
      }
      return next;
    });
  }, []);

  const backspace = useCallback(() => {
    setError('');
    setResult(null);
    setJustEvaluated(false);
    setExpression((prev) => prev.slice(0, -1));
  }, []);

  const clearAll = useCallback(() => {
    setExpression('');
    setResult(null);
    setError('');
    setJustEvaluated(false);
  }, []);

  const replaceExpression = useCallback((expr) => {
    setExpression(expr);
    setResult(null);
    setError('');
    setJustEvaluated(false);
  }, []);

  const evaluate = useCallback(async () => {
    const requestId = evaluateRequestIdRef.current + 1;
    evaluateRequestIdRef.current = requestId;
    evaluateAbortRef.current?.abort();
    const controller = new AbortController();
    evaluateAbortRef.current = controller;

    setError('');
    if (isEmptyForEvaluate(expression)) {
      setError('Enter an expression first.');
      return;
    }
    try {
      const res = await fetch(`${API}/calculate`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression, angleMode }),
        signal: controller.signal,
      });
      const json = await res.json();
      if (requestId !== evaluateRequestIdRef.current) {
        return;
      }
      if (!json.success) {
        const msg = json.error?.message || 'Could not evaluate.';
        setError(msg);
        setResult(null);
        return;
      }
      const { result: r } = json.data;
      setResult(r);
      setExpression(String(json.data.expression ?? expression));
      setJustEvaluated(true);
      await refreshHistory();
    } catch (err) {
      if (controller.signal.aborted || requestId !== evaluateRequestIdRef.current) {
        return;
      }
      const details = err instanceof Error ? err.message : String(err);
      setError(`Network error. Is the API running? (${details})`);
      setResult(null);
    }
  }, [angleMode, expression, refreshHistory]);

  useEffect(() => () => evaluateAbortRef.current?.abort(), []);

  const toggleAngleMode = useCallback(() => {
    setAngleMode((m) => (m === 'DEG' ? 'RAD' : 'DEG'));
  }, []);

  const memoryAdd = useCallback(() => {
    if (error || result === null || Number.isNaN(result)) return;
    setMemoryValue((m) => m + result);
  }, [error, result]);

  const memorySubtract = useCallback(() => {
    if (error || result === null || Number.isNaN(result)) return;
    setMemoryValue((m) => m - result);
  }, [error, result]);

  const memoryRecall = useCallback(() => {
    setError('');
    setResult(null);
    setJustEvaluated(false);
    setExpression((prev) => {
      if (justEvaluated || prev === '') {
        return String(memoryValue);
      }
      return `${prev}${memoryValue}`;
    });
  }, [justEvaluated, memoryValue]);

  const memoryClear = useCallback(() => {
    setMemoryValue(0);
  }, []);

  const toggleSign = useCallback(() => {
    setError('');
    if (justEvaluated && result !== null && !Number.isNaN(result)) {
      const flipped = -result;
      setExpression(String(Object.is(flipped, -0) ? 0 : flipped));
      setResult(null);
      setJustEvaluated(false);
      return;
    }
    setExpression((prev) => toggleTrailingNumberSign(prev));
  }, [justEvaluated, result]);

  return {
    expression,
    result,
    error,
    angleMode,
    memoryValue,
    history,
    append,
    backspace,
    clearAll,
    replaceExpression,
    evaluate,
    toggleAngleMode,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    toggleSign,
  };
}
