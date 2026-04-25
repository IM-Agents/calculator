# Frontend Specification

## Frontend Stack
- React 18
- Vite
- Plain CSS or CSS Modules
- Native React hooks/state only

## Core State
- `expression: string`
- `displayValue: string`
- `memoryValue: number`
- `history: Array<{ expression, result, timestamp }>`
- `angleMode: 'DEG' | 'RAD'`
- `error: string | null`

## Component Breakdown
### `CalculatorShell`
- Main responsive container
- Places display on top
- Uses side history panel on wide screens and bottom panel on small screens

### `DisplayPanel`
- Shows active expression
- Shows result or error state
- Supports large readable digits

### `ButtonGrid`
- Number keys
- Operators
- Scientific keys
- Memory keys
- Clear/backspace/evaluate actions
- Distinct styling for operators vs numbers

### `HistoryPanel`
- Displays last 10 calculations
- Shows expression and result
- Scrollable if needed
- Auto-updates after every valid calculation

### `ModeToggle`
- Toggle between degree and radian mode
- Clearly highlights active mode

## Interaction Requirements
- Support click and keyboard input
- Enter triggers evaluation
- Backspace removes last input
- Ignore unsupported keypresses
- Prevent multiple decimal points in the same number token
- Normalize repeated operators where possible

## Responsive UX Requirements
The UI must be **responsive across mobile, tablet, and desktop**.

### Mobile
- Full-width layout
- History panel below keypad
- Large tap targets

### Tablet
- Wider keypad spacing
- Display area scaled for readability

### Desktop
- Two-column layout when space allows
- History panel visible beside calculator

## Accessibility
- Tab navigation for buttons
- Visible focus states
- Sufficient contrast ratio
- ARIA labels for scientific and memory buttons
- Errors announced accessibly where practical

## Frontend Services
- `calculatorApi.evaluate(payload)`
- `calculatorApi.getHistory()`
- `calculatorApi.clearHistory()`

## Validation Rules
- Block empty evaluation requests
- Prevent malformed consecutive operators except unary minus handling
- Disable impossible actions when appropriate
