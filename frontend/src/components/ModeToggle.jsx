function ModeToggle({ mode, onChange }) {
  return (
    <div className="mode-toggle">
      <button
        type="button"
        className={mode === 'DEG' ? 'active' : ''}
        onClick={() => onChange('DEG')}
      >
        DEG
      </button>
      <button
        type="button"
        className={mode === 'RAD' ? 'active' : ''}
        onClick={() => onChange('RAD')}
      >
        RAD
      </button>
    </div>
  )
}

export default ModeToggle
