import { useCallback } from 'react';
import ButtonGrid from './ButtonGrid.jsx';
import Display from './Display.jsx';
import HistoryPanel from './HistoryPanel.jsx';
import ModeToggle from './ModeToggle.jsx';
import { useCalculatorState } from '../hooks/useCalculatorState.js';
import { useKeyboardInput } from '../hooks/useKeyboardInput.js';
import '../styles/calculator.css';

export default function Calculator() {
  const {
    expression,
    result,
    error,
    angleMode,
    memoryValue,
    history,
    append,
    backspace,
    clearAll,
    evaluate,
    toggleAngleMode,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    toggleSign,
    replaceExpression,
  } = useCalculatorState();

  const handleAction = useCallback(
    (btn) => {
      switch (btn.action) {
        case 'append':
          append(btn.value);
          break;
        case 'evaluate':
          evaluate();
          break;
        case 'backspace':
          backspace();
          break;
        case 'clear':
          clearAll();
          break;
        case 'toggleSign':
          toggleSign();
          break;
        case 'memoryAdd':
          memoryAdd();
          break;
        case 'memorySubtract':
          memorySubtract();
          break;
        case 'memoryRecall':
          memoryRecall();
          break;
        case 'memoryClear':
          memoryClear();
          break;
        default:
          break;
      }
    },
    [
      append,
      backspace,
      clearAll,
      evaluate,
      memoryAdd,
      memoryClear,
      memoryRecall,
      memorySubtract,
      toggleSign,
    ],
  );

  const onReuse = useCallback(
    (expr) => {
      replaceExpression(expr);
    },
    [replaceExpression],
  );

  useKeyboardInput({
    onDigit: (d) => append(d),
    onOperator: (op) => append(op === '×' ? '*' : op === '÷' ? '/' : op === '−' ? '-' : op),
    onDecimal: () => append('.'),
    onEnter: () => evaluate(),
    onBackspace: () => backspace(),
    onClear: () => clearAll(),
  });

  return (
    <div className="calculator-layout">
      <section className="calculator calculator--container" aria-label="Calculator">
        <div className="calculator__toolbar">
          <ModeToggle angleMode={angleMode} onToggle={toggleAngleMode} />
          <span className="calculator__memory" title="Memory value">
            M: {memoryValue}
          </span>
        </div>
        <Display expression={expression} result={result} error={error} />
        <ButtonGrid onAction={handleAction} />
      </section>
      <HistoryPanel items={history} onReuse={onReuse} />
    </div>
  );
}
