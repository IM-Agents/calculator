import { useEffect } from "react";

const KEYBOARD_TO_ACTION = {
  Enter: "=",
  Backspace: "DEL",
  Escape: "AC",
  "*": "*",
  "/": "/",
  "+": "+",
  "-": "-",
  ".": ".",
  "%": "%"
};

export function useKeyboardInput(onInput) {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (/^[0-9]$/.test(event.key)) {
        onInput(event.key);
        return;
      }
      if (Object.hasOwn(KEYBOARD_TO_ACTION, event.key)) {
        event.preventDefault();
        onInput(KEYBOARD_TO_ACTION[event.key]);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onInput]);
}
