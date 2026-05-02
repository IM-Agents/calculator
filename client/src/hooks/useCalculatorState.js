import { useCallback, useState } from 'react';
import { sanitizeAppend } from '../utils/inputSanitizer.js';
import { evaluateExpression } from '../services/calculatorApi.js';
import { postHistory } from '../services/calculatorApi.js';

export function useCalculatorState({ onHistoryEntry }) {
  const [buffer, setBuffer] = useState('');
  const [angleMode, setAngleMode] = useState('deg');
  const [memoryValue, setMemoryValue] = useState(0);
  const [error, setError] = useState(null);
  const [isFreshResult, setIsFreshResult] = useState(false);

  const clear = useCallback(() => {
    setBuffer('');
    setError(null);
    setIsFreshResult(false);
  }, []);

  const backspace = useCallback(() => {
    setError(null);
    setBuffer((b) => b.slice(0, -1));
    setIsFreshResult(false);
  }, []);

  const append = useCallback(
    (raw) => {
      const piece = String(raw);
      setError(null);
      setBuffer((prev) => {
        let next;
        if (isFreshResult) {
          if (piece.length === 1 && /[0-9.]/.test(piece)) {
            next = piece === '.' ? '0.' : piece;
          } else if (piece.length === 1 && ['+', '-', '*', '/', '%', '^'].includes(piece)) {
            next = prev + piece;
          } else if (
            /^(sin|cos|tan|log|ln|sqrt)\($/.test(piece) ||
            piece === 'pi' ||
            piece === 'e'
          ) {
            next = piece;
          } else {
            next = prev + piece;
          }
        } else if (piece === '.' && (prev === '' || /[+\-*/%^()]$/.test(prev))) {
          next = sanitizeAppend(prev, '0.');
        } else if (piece === '.') {
          next = sanitizeAppend(prev, '.');
        } else {
          next = prev + piece;
        }
        return next;
      });
      setIsFreshResult(false);
    },
    [isFreshResult],
  );

  const toggleSign = useCallback(async () => {
    setError(null);
    const expr = buffer.trim();
    if (!expr) return;
    try {
      const data = await evaluateExpression(`-(${expr})`, angleMode);
      setBuffer(String(data.result));
      setIsFreshResult(true);
    } catch (e) {
      setError(e.message);
    }
  }, [buffer, angleMode]);

  const equals = useCallback(async () => {
    const expr = buffer.trim();
    setError(null);
    if (!expr) {
      setError('Nothing to evaluate.');
      return;
    }
    try {
      const data = await evaluateExpression(expr, angleMode);
      setBuffer(String(data.result));
      setIsFreshResult(true);
      onHistoryEntry?.(data);
      postHistory({
        expression: data.expression,
        result: data.result,
        angleMode: data.angleMode,
      }).catch(() => {});
    } catch (e) {
      setError(e.message);
      setIsFreshResult(false);
    }
  }, [buffer, angleMode, onHistoryEntry]);

  const memoryAdd = useCallback(() => {
    const v = Number(buffer);
    if (!Number.isFinite(v)) return;
    setMemoryValue((m) => m + v);
  }, [buffer]);

  const memorySub = useCallback(() => {
    const v = Number(buffer);
    if (!Number.isFinite(v)) return;
    setMemoryValue((m) => m - v);
  }, [buffer]);

  const memoryRecall = useCallback(() => {
    setError(null);
    setBuffer(String(memoryValue));
    setIsFreshResult(false);
  }, [memoryValue]);

  const memoryClear = useCallback(() => {
    setMemoryValue(0);
  }, []);

  return {
    buffer,
    angleMode,
    setAngleMode,
    memoryValue,
    error,
    isFreshResult,
    append,
    backspace,
    clear,
    equals,
    toggleSign,
    memoryAdd,
    memorySub,
    memoryRecall,
    memoryClear,
  };
}
