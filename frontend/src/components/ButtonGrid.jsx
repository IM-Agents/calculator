export function ButtonGrid({
  onDigit,
  onOperator,
  onChar,
  onClear,
  onBackspace,
  onEvaluate,
  onToggleSign,
  onInsertFn,
  onInsertConst,
  onMemory,
  disabled,
}) {
  const btn = (label, className, onClick, opts = {}) => (
    <button
      type="button"
      key={label}
      className={`calc-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={opts.aria || label}
    >
      {opts.display ?? label}
    </button>
  )

  return (
    <div className="button-grid">
      <div className="button-grid__row">
        {btn('MC', 'calc-btn--muted', () => onMemory('MC'), { aria: 'Memory clear' })}
        {btn('MR', 'calc-btn--muted', () => onMemory('MR'), { aria: 'Memory recall' })}
        {btn('M+', 'calc-btn--muted', () => onMemory('M+'), { aria: 'Memory add' })}
        {btn('M−', 'calc-btn--muted', () => onMemory('M-'), { aria: 'Memory subtract' })}
      </div>
      <div className="button-grid__row">
        {btn('sin', 'calc-btn--fn', () => onInsertFn('sin'))}
        {btn('cos', 'calc-btn--fn', () => onInsertFn('cos'))}
        {btn('tan', 'calc-btn--fn', () => onInsertFn('tan'))}
        {btn('C', 'calc-btn--warn', onClear)}
      </div>
      <div className="button-grid__row">
        {btn('log', 'calc-btn--fn', () => onInsertFn('log'))}
        {btn('ln', 'calc-btn--fn', () => onInsertFn('ln'))}
        {btn('√', 'calc-btn--fn', () => onInsertFn('sqrt'), { display: '√', aria: 'Square root' })}
        {btn('⌫', 'calc-btn--warn', onBackspace, { aria: 'Backspace' })}
      </div>
      <div className="button-grid__row">
        {btn('(', 'calc-btn--op', () => onChar('('))}
        {btn(')', 'calc-btn--op', () => onChar(')'))}
        {btn('xʸ', 'calc-btn--op', () => onOperator('^'), { aria: 'Power' })}
        {btn('%', 'calc-btn--op', () => onOperator('%'))}
      </div>
      <div className="button-grid__row">
        {btn('7', 'calc-btn--num', () => onDigit('7'))}
        {btn('8', 'calc-btn--num', () => onDigit('8'))}
        {btn('9', 'calc-btn--num', () => onDigit('9'))}
        {btn('÷', 'calc-btn--op', () => onOperator('/'), { aria: 'Divide' })}
      </div>
      <div className="button-grid__row">
        {btn('4', 'calc-btn--num', () => onDigit('4'))}
        {btn('5', 'calc-btn--num', () => onDigit('5'))}
        {btn('6', 'calc-btn--num', () => onDigit('6'))}
        {btn('×', 'calc-btn--op', () => onOperator('*'), { aria: 'Multiply' })}
      </div>
      <div className="button-grid__row">
        {btn('1', 'calc-btn--num', () => onDigit('1'))}
        {btn('2', 'calc-btn--num', () => onDigit('2'))}
        {btn('3', 'calc-btn--num', () => onDigit('3'))}
        {btn('−', 'calc-btn--op', () => onOperator('-'), { aria: 'Subtract' })}
      </div>
      <div className="button-grid__row">
        {btn('π', 'calc-btn--fn', () => onInsertConst('π'), { aria: 'Pi' })}
        {btn('0', 'calc-btn--num', () => onDigit('0'))}
        {btn('.', 'calc-btn--num', () => onDigit('.'))}
        {btn('+', 'calc-btn--op', () => onOperator('+'))}
      </div>
      <div className="button-grid__row button-grid__row--bottom">
        {btn('e', 'calc-btn--fn', () => onInsertConst('e'))}
        {btn('±', 'calc-btn--op', onToggleSign, { aria: 'Toggle sign' })}
        {btn('=', 'calc-btn--eq calc-btn--eq-span', onEvaluate, { aria: 'Equals' })}
      </div>
    </div>
  )
}
