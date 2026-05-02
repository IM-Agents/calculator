import { useEffect } from 'react';

const OPS = new Set(['+', '-', '*', '/', '^', '%', '(', ')']);

export function useKeyboardInput({
  onDigit,
  onOperator,
  onDecimal,
  onEnter,
  onBackspace,
  onClear,
}) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const { key } = e;
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        onDigit(key);
        return;
      }
      if (OPS.has(key)) {
        e.preventDefault();
        onOperator(key);
        return;
      }
      if (key === '.' || key === ',') {
        e.preventDefault();
        onDecimal();
        return;
      }
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        onEnter();
        return;
      }
      if (key === 'Backspace') {
        e.preventDefault();
        onBackspace();
        return;
      }
      if (key === 'Escape') {
        e.preventDefault();
        onClear();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBackspace, onClear, onDecimal, onDigit, onEnter, onOperator]);
}
