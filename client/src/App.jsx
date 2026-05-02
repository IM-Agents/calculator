import { useCallback } from 'react';
import { CalculatorShell } from './components/CalculatorShell.jsx';
import { useCalculatorState } from './hooks/useCalculatorState.js';
import { useHistory } from './hooks/useHistory.js';
import { useKeyboardInput } from './hooks/useKeyboardInput.js';
import './styles/calculator.css';
import './styles/responsive.css';

export default function App() {
  const { history, push, clear: clearHistory } = useHistory();

  const onHistoryEntry = useCallback(
    (data) => {
      push({
        expression: data.expression,
        result: data.result,
        angleMode: data.angleMode,
        timestamp: data.timestamp,
      });
    },
    [push],
  );

  const calc = useCalculatorState({ onHistoryEntry });

  useKeyboardInput({
    onDigit: calc.append,
    onOperator: calc.append,
    onEquals: calc.equals,
    onClear: calc.clear,
    onBackspace: calc.backspace,
    enabled: true,
  });

  return (
    <CalculatorShell
      buffer={calc.buffer}
      error={calc.error}
      angleMode={calc.angleMode}
      onAngleMode={calc.setAngleMode}
      memoryValue={calc.memoryValue}
      history={history}
      onAppend={calc.append}
      onEquals={calc.equals}
      onClear={calc.clear}
      onBackspace={calc.backspace}
      onToggleSign={calc.toggleSign}
      onMemoryClear={calc.memoryClear}
      onMemoryRecall={calc.memoryRecall}
      onMemoryAdd={calc.memoryAdd}
      onMemorySub={calc.memorySub}
      onHistoryClear={clearHistory}
    />
  );
}
