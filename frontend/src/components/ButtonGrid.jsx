const buttons = [
  'MC', 'MR', 'M+', 'M-',
  'C', 'DEL', '(', ')',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '+/-', '+',
  'sin', 'cos', 'tan', '^',
  'sqrt', '%', 'log', 'ln',
  'pi', 'e', '=', ''
]

function ButtonGrid({ onPress }) {
  return (
    <div className="button-grid">
      {buttons.map((item, index) =>
        item ? (
          <button
            key={`${item}-${index}`}
            type="button"
            onClick={() => onPress(item)}
            className={item === '=' ? 'equals' : ''}
          >
            {item}
          </button>
        ) : (
          <span key={`empty-${index}`} />
        )
      )}
    </div>
  )
}

export default ButtonGrid
