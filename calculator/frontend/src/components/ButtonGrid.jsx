function PadButton({ label, sublabel, variant, wide, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className={`pad-btn pad-btn--${variant}${wide ? ' pad-btn--wide' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      <span className="pad-btn__label">{label}</span>
      {sublabel ? <span className="pad-btn__sub">{sublabel}</span> : null}
    </button>
  );
}

export default function ButtonGrid({
  onDigit,
  onDot,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  onPercent,
  onToggleSign,
  onInsertFn,
  onInsertConst,
  onMemory,
}) {
  return (
    <div className="button-grid">
      <div className="button-grid__row">
        <PadButton label="MC" variant="memory" onClick={() => onMemory('MC')} />
        <PadButton label="MR" variant="memory" onClick={() => onMemory('MR')} />
        <PadButton label="M+" variant="memory" onClick={() => onMemory('M+')} />
        <PadButton label="M−" variant="memory" onClick={() => onMemory('M-')} />
      </div>
      <div className="button-grid__row">
        <PadButton label="sin" variant="sci" onClick={() => onInsertFn('sin')} />
        <PadButton label="cos" variant="sci" onClick={() => onInsertFn('cos')} />
        <PadButton label="tan" variant="sci" onClick={() => onInsertFn('tan')} />
        <PadButton label="log" variant="sci" onClick={() => onInsertFn('log')} />
      </div>
      <div className="button-grid__row">
        <PadButton label="ln" variant="sci" onClick={() => onInsertFn('ln')} />
        <PadButton label="√" variant="sci" ariaLabel="square root" onClick={() => onInsertFn('sqrt')} />
        <PadButton label="xʸ" variant="sci" ariaLabel="power" onClick={() => onOperator('^')} />
        <PadButton label="π" variant="sci" ariaLabel="pi" onClick={() => onInsertConst('pi')} />
      </div>
      <div className="button-grid__row">
        <PadButton label="e" variant="sci" onClick={() => onInsertConst('e')} />
        <PadButton label="(" variant="muted" onClick={() => onOperator('(')} ariaLabel="open parenthesis" />
        <PadButton label=")" variant="muted" onClick={() => onOperator(')')} ariaLabel="close parenthesis" />
        <PadButton label="%" variant="muted" onClick={onPercent} />
      </div>
      <div className="button-grid__row">
        <PadButton label="C" variant="danger" onClick={onClear} ariaLabel="clear" />
        <PadButton label="⌫" variant="muted" onClick={onBackspace} ariaLabel="backspace" />
        <PadButton label="±" variant="muted" onClick={onToggleSign} ariaLabel="toggle sign" />
        <PadButton label="÷" variant="operator" onClick={() => onOperator('/')} ariaLabel="divide" />
      </div>
      <div className="button-grid__row">
        <PadButton label="7" variant="num" onClick={() => onDigit('7')} />
        <PadButton label="8" variant="num" onClick={() => onDigit('8')} />
        <PadButton label="9" variant="num" onClick={() => onDigit('9')} />
        <PadButton label="×" variant="operator" onClick={() => onOperator('*')} ariaLabel="multiply" />
      </div>
      <div className="button-grid__row">
        <PadButton label="4" variant="num" onClick={() => onDigit('4')} />
        <PadButton label="5" variant="num" onClick={() => onDigit('5')} />
        <PadButton label="6" variant="num" onClick={() => onDigit('6')} />
        <PadButton label="−" variant="operator" onClick={() => onOperator('-')} ariaLabel="subtract" />
      </div>
      <div className="button-grid__row">
        <PadButton label="1" variant="num" onClick={() => onDigit('1')} />
        <PadButton label="2" variant="num" onClick={() => onDigit('2')} />
        <PadButton label="3" variant="num" onClick={() => onDigit('3')} />
        <PadButton label="+" variant="operator" onClick={() => onOperator('+')} ariaLabel="add" />
      </div>
      <div className="button-grid__row">
        <PadButton label="0" variant="num" wide onClick={() => onDigit('0')} />
        <PadButton label="." variant="num" onClick={onDot} />
        <PadButton label="=" variant="accent" onClick={onEquals} ariaLabel="equals" />
      </div>
    </div>
  );
}
