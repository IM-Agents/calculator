# Functional Specification

## 1. Functional Modules

### 1.1 Display Module
Responsible for rendering:
- Current expression or current value
- Result after evaluation
- Error messages when operations fail
- Active angle mode (DEG/RAD)
- Memory indicator when memory value is non-zero

### 1.2 Input Module
Supports:
- Numeric buttons `0-9`
- Decimal input `.`
- Operator inputs `+`, `-`, `*`, `/`, `^`, `%`
- Function inputs `sqrt`, `sin`, `cos`, `tan`, `log`, `ln`
- Constants `pi`, `e`
- Sign toggle `+/-`
- Clear and backspace actions
- Enter/equal action
- Keyboard interaction

### 1.3 Calculation Module
Handles:
- Parsing the current expression or command payload
- Safe execution of supported operations
- Chained calculations
- Error generation for invalid cases

### 1.4 Memory Module
Supports:
- `M+`: add displayed value to memory
- `M-`: subtract displayed value from memory
- `MR`: recall memory value into current input
- `MC`: clear memory value

### 1.5 History Module
Maintains:
- Latest 10 calculation entries
- Each entry includes expression, result, timestamp, and optional status
- New calculations appear first or last based on UI decision, but behavior must be consistent

## 2. Input Handling Rules
- Disallow multiple decimal points within one number token
- Prevent invalid repeated operators where possible
- Allow negative values through sign toggle or leading minus
- Empty input evaluated with `=` should not crash; either no-op or show validation feedback
- Backspace removes the latest character/token logically

## 3. Scientific Calculation Rules
- `sqrt(x)` valid only for `x >= 0`
- `log(x)` and `ln(x)` valid only for `x > 0`
- `tan(x)` should be handled carefully around undefined angles in degree mode (e.g. 90° + n*180°)
- Trigonometric functions must respect selected angle mode

## 4. Error Cases
System must display friendly messages for:
- Division by zero
- Invalid expression
- Square root of negative number
- Logarithm of zero/negative number
- Undefined tangent input
- Overflow/unsupported large result conditions when applicable

## 5. State Requirements
Frontend state should maintain:
- `currentInput`
- `displayValue`
- `memoryValue`
- `history[]` (max 10)
- `angleMode` (`deg` or `rad`)
- `errorState`

Optional backend-managed state for future persistence:
- Saved history entries
- Session-scoped memory value

## 6. Accessibility Requirements
- Full keyboard navigation support
- Semantic buttons with readable labels
- High contrast between text and controls
- Visible focus states
- Screen-reader-friendly action naming for scientific buttons

## 7. Responsiveness Requirements
The React UI must be designed responsively for:
- **Mobile:** compact layout, stack or collapsible history panel
- **Tablet:** balanced button grid and adjacent history when space permits
- **Desktop:** wider layout with side history panel and larger display area
