# Frontend Specification

## Tech Direction
- React 18
- Functional components with hooks
- Structured responsive CSS (plain CSS or CSS Modules)
- No heavy UI libraries

## Responsive Requirement
The UI must be fully responsive across mobile, tablet, and desktop breakpoints.

## Main Screens / Areas
### 1. Calculator Display
- Shows current expression or result
- Shows user-friendly error messages
- Should handle long values with truncation/scrolling strategy

### 2. Button Grid
- Numeric keys 0–9
- Decimal point
- Arithmetic operators
- Scientific operators/functions
- Memory buttons
- Clear/delete/evaluate controls
- Distinct styling for operators, actions, and numbers

### 3. History Panel
- Show latest 10 calculations
- Each item displays expression and result
- Positioned to the side on larger screens, stacked below on smaller screens
- Optional click-to-reuse result/expression in a future enhancement

### 4. Mode Controls
- Degree/Radian toggle
- Visible active state

## Suggested Component Structure
- `App`
- `CalculatorLayout`
- `Display`
- `ButtonGrid`
- `CalculatorButton`
- `ModeToggle`
- `HistoryPanel`
- `ErrorBanner` (optional)

## State Model
- `currentExpression: string`
- `displayValue: string`
- `memoryValue: number | null`
- `history: Array<{ expression: string; result: string; timestamp?: string }>`
- `angleMode: 'deg' | 'rad'`
- `error: string | null`

## Input Handling
### Button Input
- Append digits/operators according to validation rules
- Prevent malformed sequences where possible

### Keyboard Input
- Numbers 0–9
- Operators `+ - * /`
- Enter = evaluate
- Backspace = delete last character
- Optional mapping for `%`, `^`, and decimal point

## Validation Rules
- Prevent multiple decimal points in one numeric token
- Prevent invalid repeated operators unless representing a negative number context
- Ignore evaluate when expression is empty
- Handle large values with readable formatting strategy

## UX Notes
- Hover and pressed states should feel immediate
- Important actions like equals and clear must stand out
- Errors should reset gracefully on next meaningful input
- Touch target sizes should be comfortable on mobile

## Accessibility
- Keyboard navigation across actionable controls
- Sufficient contrast ratio
- ARIA labels for scientific/memory controls if button text may be ambiguous
- Focus-visible styles required
