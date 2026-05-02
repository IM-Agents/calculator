import { useCallback, useEffect, useState } from 'react';
import { HISTORY_KEY, MAX_HISTORY } from '../utils/constants.js';

function load() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : [];
  } catch (err) {
    console.warn('[history] local load failed:', err?.message || err);
    return [];
  }
}

export function useHistory() {
  const [history, setHistory] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
    } catch {
      /* ignore quota */
    }
  }, [history]);

  const push = useCallback((entry) => {
    setHistory((prev) => {
      const next = [
        {
          expression: entry.expression,
          result: entry.result,
          angleMode: entry.angleMode,
          timestamp: entry.timestamp || new Date().toISOString(),
        },
        ...prev,
      ];
      return next.slice(0, MAX_HISTORY);
    });
  }, []);

  const clear = useCallback(() => setHistory([]), []);

  return { history, push, clear, setHistory };
}
