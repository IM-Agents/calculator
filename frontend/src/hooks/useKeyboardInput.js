import { useEffect } from "react";

export function useKeyboardInput({
  onDigit,
  onDecimal,
  onOperator,
  onEnter,
  onBackspace,
  onClear,
  onParenOpen,
  onParenClose,
}) {
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        onDigit?.(key);
        return;
      }
      if (key === ".") {
        e.preventDefault();
        onDecimal?.();
        return;
      }
      if (key === "+" || key === "*" || key === "/" || key === "^") {
        e.preventDefault();
        onOperator?.(key);
        return;
      }
      if (key === "-") {
        e.preventDefault();
        onOperator?.("-");
        return;
      }
      if (key === "%") {
        e.preventDefault();
        onOperator?.("%");
        return;
      }
      if (key === "(") {
        e.preventDefault();
        onParenOpen?.();
        return;
      }
      if (key === ")") {
        e.preventDefault();
        onParenClose?.();
        return;
      }
      if (key === "Enter" || key === "=") {
        e.preventDefault();
        onEnter?.();
        return;
      }
      if (key === "Backspace") {
        e.preventDefault();
        onBackspace?.();
        return;
      }
      if (key === "Escape") {
        e.preventDefault();
        onClear?.();
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    onDigit,
    onDecimal,
    onOperator,
    onEnter,
    onBackspace,
    onClear,
    onParenOpen,
    onParenClose,
  ]);
}
