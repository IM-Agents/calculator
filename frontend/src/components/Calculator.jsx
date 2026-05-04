import { useMemo } from 'react'
import { Display } from './Display'
import { ButtonGrid } from './ButtonGrid'
import { HistoryPanel } from './HistoryPanel'
import { ModeToggle } from './ModeToggle'
import { useCalculatorState } from '../hooks/useCalculatorState'
import { useKeyboardInput } from '../hooks/useKeyboardInput'
import './Calculator.css'

export function Calculator() {
  const calc = useCalculatorState()

  const onMemory = (act) => {
    if (act === 'MC') calc.memoryClear()
    if (act === 'MR') calc.memoryRecall()
    if (act === 'M+') calc.memoryAdd()
    if (act === 'M-') calc.memorySubtract()
  }

  const kb = useMemo(
    () => ({
      onDigit: calc.appendChar,
      onOperator: calc.appendOperator,
      onChar: calc.appendChar,
      onEvaluate: calc.evaluate,
      onBackspace: calc.backspace,
      onClear: calc.clearAll,
    }),
    [
      calc.appendChar,
      calc.appendOperator,
      calc.evaluate,
      calc.backspace,
      calc.clearAll,
    ],
  )

  useKeyboardInput(!calc.busy, kb)

  return (
    <div className="calculator-shell">
      <header className="calculator-shell__header">
        <h1 className="calculator-shell__title">Calculator</h1>
        <ModeToggle angleMode={calc.angleMode} onToggle={calc.toggleAngleMode} />
      </header>
      <div className="calculator-shell__body">
        <section className="calculator-main" aria-label="Calculator">
          <Display
            expression={calc.expression}
            result={calc.result}
            error={calc.error}
            busy={calc.busy}
          />
          <ButtonGrid
            onDigit={calc.appendChar}
            onOperator={calc.appendOperator}
            onChar={calc.appendChar}
            onClear={calc.clearAll}
            onBackspace={calc.backspace}
            onEvaluate={calc.evaluate}
            onToggleSign={calc.toggleSign}
            onInsertFn={calc.insertFunction}
            onInsertConst={calc.insertConstant}
            onMemory={onMemory}
            disabled={calc.busy}
          />
        </section>
        <HistoryPanel
          items={calc.history}
          onPick={calc.useHistoryExpression}
          onClear={calc.clearHistory}
        />
      </div>
    </div>
  )
}
