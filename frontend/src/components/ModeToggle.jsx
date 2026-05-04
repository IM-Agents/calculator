export function ModeToggle({ angleMode, onToggle }) {
  return (
    <div className="mode-toggle" role="group" aria-label="Angle mode">
      <button
        type="button"
        className={`mode-toggle__btn ${angleMode === 'DEG' ? 'is-active' : ''}`}
        onClick={() => angleMode !== 'DEG' && onToggle()}
      >
        DEG
      </button>
      <button
        type="button"
        className={`mode-toggle__btn ${angleMode === 'RAD' ? 'is-active' : ''}`}
        onClick={() => angleMode !== 'RAD' && onToggle()}
      >
        RAD
      </button>
    </div>
  )
}
