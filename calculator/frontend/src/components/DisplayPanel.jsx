export default function DisplayPanel({ expression, result, error, busy }) {
  const normalizedExpression = String(expression ?? '');
  const primary = normalizedExpression.trim() === '' && !error ? '0' : normalizedExpression || '0';
  const secondary = error || result || '';

  return (
    <section className="display-panel" aria-live="polite">
      <div className="display-panel__expression" data-testid="display-expression">
        {primary}
      </div>
      <div
        className={`display-panel__result ${error ? 'display-panel__result--error' : ''}`}
        data-testid="display-result"
      >
        {busy ? '…' : secondary}
      </div>
    </section>
  );
}
