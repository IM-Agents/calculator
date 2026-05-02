# 03 - Frontend Architecture

## Frontend Stack
- React 18
- Vite
- Plain CSS or CSS modules
- Minimal helper utilities only

## Frontend Responsibilities
- Render responsive calculator UI
- Manage input state and interaction flow
- Manage visual mode state (`DEG` / `RAD`)
- Manage memory value and recent history in local UI state
- Send evaluation requests to backend
- Present backend responses and friendly errors

## Suggested Component Breakdown

### `App`
- Top-level composition
- Provides layout shell and calculator container

### `Calculator`
- Central orchestrator component
- Holds shared state or delegates to custom hooks
- Wires display, buttons, history, and mode toggle

### `Display`
- Shows current expression
- Shows evaluated result or error message
- Handles overflow formatting for large expressions/results

### `ButtonGrid`
- Renders calculator buttons by configuration
- Distinguishes numbers, operators, scientific functions, and memory actions

### `HistoryPanel`
- Displays the last 10 calculations
- Optional interaction: allow click-to-reuse expression later if desired

### `ModeToggle`
- Toggles between degree and radian mode
- Highlights the active mode

## Suggested Hooks / Utilities

### `useCalculatorState`
Manages:
- `expression`
- `result`
- `error`
- `memoryValue`
- `history`
- `angleMode`

### `useKeyboardInput`
Maps keyboard events to calculator actions:
- `0-9`
- `+`, `-`, `*`, `/`
- `Enter`
- `Backspace`
- optional `.` and parentheses if introduced later

### Utility Helpers
- `validateExpression.js`
- `formatDisplay.js`
- `normalizeInput.js`

## UI State Model
```js
{
  expression: '',
  result: null,
  error: '',
  memoryValue: 0,
  history: [],
  angleMode: 'DEG'
}
```

## Interaction Flow
1. User presses a button or keyboard key.
2. Frontend validates or normalizes the input.
3. State updates immediately for visual feedback.
4. On evaluate, frontend sends payload to backend.
5. Backend returns result or structured error.
6. Frontend updates display and history.

## Responsive UX Guidance
- **Mobile:** calculator stack first, history panel below
- **Tablet:** history can appear below or side-by-side depending on width
- **Desktop:** side-by-side layout preferred
- Buttons should maintain touch-friendly minimum sizes
- Display area should truncate gracefully without breaking layout

## Styling Guidance
- Differentiate operators and numeric buttons visually
- Add hover, focus, and active states
- Use a modern minimal palette with strong contrast
- Avoid animation overload; keep transitions subtle and functional

## Frontend Validation Rules
- Prevent duplicate decimal points in the active numeric token
- Prevent invalid operator chains
- Do not evaluate empty expressions
- Disable memory updates when result is invalid
