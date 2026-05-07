import { useEffect } from 'react';

const OP_MAP = {
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '^': '^',
};

export function useKeyboardInput(handlers, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    function onKeyDown(e) {
      if (e.defaultPrevented) return;
      const target = e.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const { key } = e;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        handlers.appendDigit(key);
        return;
      }

      if (key === '.' || key === ',') {
        e.preventDefault();
        handlers.appendDot();
        return;
      }

      if (OP_MAP[key]) {
        e.preventDefault();
        handlers.appendSymbol(OP_MAP[key]);
        return;
      }

      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handlers.evaluate();
        return;
      }

      if (key === 'Backspace') {
        e.preventDefault();
        handlers.handleBackspace();
        return;
      }

      if (key === 'Escape') {
        e.preventDefault();
        handlers.handleClear();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlers, enabled]);
}
