export default function ModeToggle({ angleMode, onToggle }) {
  return (
    <div className="mode-toggle" role="group" aria-label="Angle mode">
      <button
        type="button"
        className={`mode-toggle__btn ${angleMode === 'deg' ? 'is-active' : ''}`}
        onClick={() => angleMode !== 'deg' && onToggle()}
      >
        Deg
      </button>
      <button
        type="button"
        className={`mode-toggle__btn ${angleMode === 'rad' ? 'is-active' : ''}`}
        onClick={() => angleMode !== 'rad' && onToggle()}
      >
        Rad
      </button>
    </div>
  );
}
