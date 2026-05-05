function Display({ value, error }) {
  return (
    <section className="display" aria-live="polite">
      <div className="display-label">Calculator</div>
      <div className={`display-value ${error ? 'display-error' : ''}`}>
        {error || value}
      </div>
    </section>
  )
}

export default Display
