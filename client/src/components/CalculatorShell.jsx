import { DisplayPanel } from './DisplayPanel.jsx';
import { ModeToggle } from './ModeToggle.jsx';
import { MemoryControls } from './MemoryControls.jsx';
import { ScientificPad } from './ScientificPad.jsx';
import { Keypad } from './Keypad.jsx';
import { HistoryPanel } from './HistoryPanel.jsx';

export function CalculatorShell({
  buffer,
  error,
  angleMode,
  onAngleMode,
  memoryValue,
  history,
  onAppend,
  onEquals,
  onClear,
  onBackspace,
  onToggleSign,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySub,
  onHistoryClear,
}) {
  const hasMemory = memoryValue !== 0;

  return (
    <div className="calculator-shell">
      <header className="calculator-shell__header">
        <h1 className="calculator-shell__title">Calculator</h1>
        <ModeToggle angleMode={angleMode} onChange={onAngleMode} />
      </header>

      <div className="calculator-shell__body">
        <section className="calculator-shell__main" aria-label="Calculator">
          <DisplayPanel
            value={buffer}
            error={error}
            angleMode={angleMode}
            hasMemory={hasMemory}
          />
          <MemoryControls
            onMc={onMemoryClear}
            onMr={onMemoryRecall}
            onMPlus={onMemoryAdd}
            onMMinus={onMemorySub}
          />
          <ScientificPad onAppend={onAppend} />
          <Keypad
            onAppend={onAppend}
            onEquals={onEquals}
            onClear={onClear}
            onBackspace={onBackspace}
            onToggleSign={onToggleSign}
          />
        </section>
        <HistoryPanel history={history} onClear={onHistoryClear} />
      </div>
    </div>
  );
}
