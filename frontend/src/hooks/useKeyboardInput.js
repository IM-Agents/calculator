import { useEffect } from "react";

const supportedKeys = new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  ".",
  "(",
  ")",
  "^",
  "%"
]);

export function useKeyboardInput(onPress) {
  useEffect(() => {
    function handleKeydown(event) {
      if (supportedKeys.has(event.key)) {
        onPress(event.key);
      } else if (event.key === "Enter") {
        onPress("=");
      } else if (event.key === "Backspace") {
        onPress("⌫");
      } else {
        return;
      }
      event.preventDefault();
    }  

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onPress]);
}
