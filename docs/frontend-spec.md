# Frontend Specification

## Frontend Stack
- React 18
- Vite
- JavaScript
- Plain CSS or CSS Modules
- Native React state/hooks only

## Core UX Goals
- Fast interaction with no noticeable lag
- Clean calculator layout with clear operator/number distinction
- Easy usage on both keyboard and touch devices
- **Responsive design across mobile, tablet, and desktop**

## Core State Model
- `expression: string`
- `displayValue: string`
- `memoryValue: number`
- `history: Array<{ expression: string; result: string; timestamp: string }>`
- `angleMode: 'DEG' | 'RAD'`
- `error: string | null`

## Component Breakdown

### `CalculatorShell`
- Main layout wrapper
- Keeps display at the top
- Renders keypad and history panel
- Uses side-by-side layout on wide screens and stacked layout on small screens

### `DisplayPanel`
- Shows current expression
- Shows evaluated result or active error message
- Supports readable large digits and overflow-safe formatting

### `ButtonGrid`
- Number buttons `0-9`
- Decimal point button
- Operator buttons `+ - × ÷`
- Scientific buttons: `%`, `√`, `^`, `±`, `sin`, `cos`, `tan`, `log`, `ln`, `π`, `e`
- Utility buttons: clear, backspace, equals
- Memory buttons: `M+`, `M-`, `MR`, `MC`

### `ModeToggle`
- Toggle between degree and radian mode
- Highlights the currently active mode

### `HistoryPanel`
- Displays the last 10 successful calculations
- Shows both expression and final result
- Updates automatically after each successful calculation
- Appears beside the calculator on desktop and below it on smaller screens

## Interaction Rules
- Accept both mouse/touch clicks and keyboard input
- `Enter` triggers evaluation
- `Backspace` removes the last character or token as designed
- Ignore unsupported keys safely
- Prevent multiple decimal points in the same number token
- Normalize or reject repeated operators depending on context
- Empty input evaluation should not crash the app

## Accessibility Requirements
- Keyboard navigation for all interactive controls
- Visible focus states
- Adequate color contrast
- ARIA labels for scientific and memory controls
- Clear accessible error presentation

## Responsive Requirements

### Mobile
- Full-width calculator
- Large tap targets
- History panel below keypad

### Tablet
- Increased spacing
- Balanced display and keypad proportions

### Desktop
- Wider layout with optional side history panel
- Stable alignment for scientific keypad sections

## Frontend Service Calls
- `POST /api/calculate`
- `GET /api/history`
- `DELETE /api/history`

## Frontend Validation Responsibilities
- Prevent obviously malformed input where possible
- Preserve a stable and readable expression string
- Surface backend validation messages in a user-friendly format
- Keep the UI responsive even when backend returns an error
