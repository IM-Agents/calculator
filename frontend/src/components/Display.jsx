import { truncateExpression, formatResult } from '../utils/formatDisplay'

export function Display({ expression, result, error, busy }) {
  const exprShown = truncateExpression(expression || '', 56)
  const resultShown =
    result !== null && result !== undefined && !error ? formatResult(result) : ''

  return (
    <div className="calc-display" aria-live="polite">
      <div className="calc-display__expr" title={expression || ''}>
        {exprShown || '0'}
      </div>
      <div className={`calc-display__result ${error ? 'calc-display__result--error' : ''}`}>
        {busy ? '…' : error || resultShown}
      </div>
    </div>
  )
}
