const ROWS = [
  [
    { label: 'sin', action: 'append', value: 'sin(' },
    { label: 'cos', action: 'append', value: 'cos(' },
    { label: 'tan', action: 'append', value: 'tan(' },
    { label: 'log', action: 'append', value: 'log(' },
    { label: 'ln', action: 'append', value: 'ln(' },
  ],
  [
    { label: '√', action: 'append', value: 'sqrt(' },
    { label: '^', action: 'append', value: '^' },
    { label: '%', action: 'append', value: '%' },
    { label: 'π', action: 'append', value: 'pi' },
    { label: 'e', action: 'append', value: 'e' },
  ],
  [
    { label: '(', action: 'append', value: '(' },
    { label: ')', action: 'append', value: ')' },
    { label: 'MC', action: 'memoryClear' },
    { label: 'MR', action: 'memoryRecall' },
    { label: 'M+', action: 'memoryAdd' },
    { label: 'M−', action: 'memorySubtract' },
  ],
  [
    { label: '±', action: 'toggleSign' },
    { label: 'C', action: 'clear' },
    { label: '⌫', action: 'backspace' },
    { label: '÷', action: 'append', value: '/' },
  ],
  [
    { label: '7', action: 'append', value: '7' },
    { label: '8', action: 'append', value: '8' },
    { label: '9', action: 'append', value: '9' },
    { label: '×', action: 'append', value: '*' },
  ],
  [
    { label: '4', action: 'append', value: '4' },
    { label: '5', action: 'append', value: '5' },
    { label: '6', action: 'append', value: '6' },
    { label: '−', action: 'append', value: '-' },
  ],
  [
    { label: '1', action: 'append', value: '1' },
    { label: '2', action: 'append', value: '2' },
    { label: '3', action: 'append', value: '3' },
    { label: '+', action: 'append', value: '+' },
  ],
  [
    { label: '0', action: 'append', value: '0', wide: true },
    { label: '.', action: 'append', value: '.' },
    { label: '=', action: 'evaluate' },
  ],
];

export default function ButtonGrid({ onAction }) {
  return (
    <div className="button-grid">
      {ROWS.map((row, ri) => (
        <div className="button-grid__row" key={ri}>
          {row.map((btn) => (
            <button
              key={btn.label}
              type="button"
              className={`button-grid__btn ${btn.wide ? 'button-grid__btn--wide' : ''} ${
                ['+', '−', '×', '÷', '^', '%'].includes(btn.label) ? 'button-grid__btn--op' : ''
              } ${['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(btn.label) ? 'button-grid__btn--fn' : ''}`}
              onClick={() => onAction(btn)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
