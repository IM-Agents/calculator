import { useMemo } from 'react';
import DisplayPanel from './DisplayPanel.jsx';
import ModeToggle from './ModeToggle.jsx';
import ButtonGrid from './ButtonGrid.jsx';
import HistoryPanel from './HistoryPanel.jsx';
import { useCalculatorState } from '../hooks/useCalculatorState.js';
import { useKeyboardInput } from '../hooks/useKeyboardInput.js';

export default function CalculatorShell() {
  const calc = useCalculatorState();

  const keyboardHandlers = useMemo(
    () => ({
      appendDigit: calc.appendDigit,
      appendDot: calc.appendDot,
      appendSymbol: calc.appendSymbol,
      evaluate: calc.evaluate,
      handleBackspace: calc.handleBackspace,
      handleClear: calc.handleClear,
    }),
    [
      calc.appendDigit,
      calc.appendDot,
      calc.appendSymbol,
      calc.evaluate,
      calc.handleBackspace,
      calc.handleClear,
    ],
  );

  useKeyboardInput(keyboardHandlers, !calc.busy);

  return (
    <div className="calculator-page">
      <div className="container">
        <header className="shell-header">
          <div>
            <h1 className="shell-title">Calculator</h1>
            <p className="shell-subtitle">Responsive layout · keyboard friendly</p>
          </div>
          <div className="shell-header__meta">
            <ModeToggle angleMode={calc.angleMode} onToggle={calc.toggleAngleMode} />
            {calc.memoryValue !== 0 ? (
              <span className="memory-badge" title="Memory value">
                M: {calc.memoryValue}
              </span>
            ) : (
              <span className="memory-badge memory-badge--inactive">M: 0</span>
            )}
          </div>
        </header>

        <main className="shell-main">
          <section className="calculator-panel">
            <DisplayPanel
              expression={calc.expression}
              result={calc.displayResult}
              error={calc.error}
              busy={calc.busy}
            />
            <ButtonGrid
              onDigit={calc.appendDigit}
              onDot={calc.appendDot}
              onOperator={calc.appendSymbol}
              onEquals={calc.evaluate}
              onClear={calc.handleClear}
              onBackspace={calc.handleBackspace}
              onPercent={calc.handlePercent}
              onToggleSign={calc.handleToggleSign}
              onInsertFn={calc.insertFunction}
              onInsertConst={calc.insertConstant}
              onMemory={calc.memoryAction}
            />
          </section>
          <HistoryPanel items={calc.history} onClear={calc.clearHistory} />
        </main>
      </div>
    </div>
  );
}
