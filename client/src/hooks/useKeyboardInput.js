import { useEffect } from 'react';

const OP_MAP = {
  Enter: '=',
  '=': '=',
  Escape: 'Escape',
  Backspace: 'Backspace',
  '/': '/',
  '*': '*',
  '-': '-',
  '+': '+',
  '%': '%',
  '^': '^',
};

export function useKeyboardInput({
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  enabled = true,
}) {
  useEffect(() => {
    if (!enabled) return undefined;

    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        onDigit(e.key);
        return;
      }
      if (e.key === '.') {
        e.preventDefault();
        onDigit('.');
        return;
      }
      if (e.key === '(' || e.key === ')') {
        e.preventDefault();
        onOperator(e.key);
        return;
      }
      const op = OP_MAP[e.key];
      if (op === '=') {
        e.preventDefault();
        onEquals();
        return;
      }
      if (op === 'Escape') {
        e.preventDefault();
        onClear();
        return;
      }
      if (op === 'Backspace') {
        e.preventDefault();
        onBackspace();
        return;
      }
      if (op && op !== 'Escape' && op !== 'Backspace') {
        e.preventDefault();
        onOperator(op);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, onDigit, onOperator, onEquals, onClear, onBackspace]);
}
