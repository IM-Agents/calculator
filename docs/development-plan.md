# Development Plan

## Milestone 1 - Project Setup & UI Shell
### Deliverables
- Client/server workspace setup
- Shared constants for operations and keys
- Calculator shell with display and keypad
- Base responsive layout

### Acceptance Criteria
- App starts locally without errors
- Basic calculator layout is visible
- Layout works across mobile, tablet, and desktop

## Milestone 2 - Core Calculator Engine
### Deliverables
- Controlled tokenizer/parser/evaluator
- Basic arithmetic support
- Decimal handling and chained operations
- Validation for malformed expressions

### Acceptance Criteria
- `+`, `-`, `*`, `/` work reliably
- Empty input does not crash
- Repeated operators and invalid expressions are handled gracefully

## Milestone 3 - Scientific & Advanced Functions
### Deliverables
- `%`, `√`, `^`, `±`
- `sin`, `cos`, `tan`
- `log`, `ln`
- `π`, `e`
- Degree/Radian mode toggle

### Acceptance Criteria
- Trigonometric functions respect active angle mode
- Negative square root is handled with a friendly error
- Large values are formatted safely

## Milestone 4 - Memory & History
### Deliverables
- `M+`, `M-`, `MR`, `MC`
- Backend history service and API
- History panel capped to last 10 entries

### Acceptance Criteria
- Memory operations update correctly
- History updates after successful calculations
- History never exceeds 10 items

## Milestone 5 - Keyboard, QA, and Hardening
### Deliverables
- Keyboard support for numbers/operators/Enter/Backspace
- Unit tests for evaluator logic
- Component/API tests for critical flows
- Accessibility and UI polish

### Acceptance Criteria
- Keyboard interaction matches PRD
- Division by zero and invalid input never crash the app
- Core flows are covered by tests

## Suggested Task Breakdown
1. Setup monorepo or split client/server directories
2. Build display, keypad, and history components
3. Implement parser and evaluator service
4. Wire `POST /api/calculate`
5. Add degree/radian mode support
6. Add scientific function keys
7. Add memory state/actions
8. Add history service + retrieval API
9. Add clear-history behavior
10. Add tests and responsive polish
