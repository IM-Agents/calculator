import { useState } from "react";
import { saveHistoryRecord } from "../services/api";
import { evaluateBinary, evaluateUnary, formatResult } from "../utils/evaluator";

const MAX_HISTORY = 10;

const appendHistory = (prev, item) => [item, ...prev].slice(0, MAX_HISTORY);

export const useCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState("DEG");
  const [operator, setOperator] = useState(null);
  const [leftOperand, setLeftOperand] = useState(null);
  const [overwrite, setOverwrite] = useState(true);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const inputDigit = (digit) => {
    clearError();
    if (overwrite) {
      setDisplay(digit);
      setOverwrite(false);
      return;
    }
    setDisplay((prev) => (prev === "0" ? digit : prev + digit));
  };

  const inputDot = () => {
    clearError();
    if (overwrite) {
      setDisplay("0.");
      setOverwrite(false);
      return;
    }
    setDisplay((prev) => (prev.includes(".") ? prev : `${prev}.`));
  };

  const resetAll = () => {
    setDisplay("0");
    setOperator(null);
    setLeftOperand(null);
    setOverwrite(true);
    clearError();
  };

  const runUnary = (op) => {
    try {
      const result = evaluateUnary(op, Number(display), angleMode);
      setDisplay(formatResult(result));
      setOverwrite(true);
      clearError();
    } catch (err) {
      setError(err.message);
    }
  };

  const chooseOperator = (nextOperator) => {
    clearError();
    const numericDisplay = Number(display);
    if (leftOperand === null) {
      setLeftOperand(numericDisplay);
      setOperator(nextOperator);
      setOverwrite(true);
      return;
    }

    if (!overwrite && operator) {
      try {
        const result = evaluateBinary(leftOperand, operator, numericDisplay);
        setLeftOperand(result);
        setDisplay(formatResult(result));
      } catch (err) {
        setError(err.message);
      }
    }

    setOperator(nextOperator);
    setOverwrite(true);
  };

  const equals = async () => {
    if (operator === null || leftOperand === null) {
      return;
    }

    try {
      const right = Number(display);
      const result = evaluateBinary(leftOperand, operator, right);
      const formatted = formatResult(result);
      const expression = `${leftOperand} ${operator} ${right}`;
      const historyItem = { expression, result: formatted };

      setDisplay(formatted);
      setHistory((prev) => appendHistory(prev, historyItem));
      setOperator(null);
      setLeftOperand(null);
      setOverwrite(true);
      clearError();

      await saveHistoryRecord(historyItem);
    } catch (err) {
      setError(err.message);
    }
  };

  const useConstant = (constant) => {
    clearError();
    setDisplay(String(constant));
    setOverwrite(true);
  };

  const toggleSign = () => runUnary("negate");

  const memoryAdd = () => setMemory((prev) => prev + Number(display));
  const memorySubtract = () => setMemory((prev) => prev - Number(display));
  const memoryRecall = () => {
    setDisplay(formatResult(memory));
    setOverwrite(true);
  };
  const memoryClear = () => setMemory(0);

  return {
    display,
    history,
    angleMode,
    memory,
    error,
    inputDigit,
    inputDot,
    chooseOperator,
    equals,
    runUnary,
    resetAll,
    toggleSign,
    useConstant,
    setAngleMode,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear
  };
};
