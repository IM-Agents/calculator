# Development Plan

## Milestone 1 - Foundation
### Deliverables
- Frontend and backend project setup
- Shared constants and input mappings
- Basic responsive shell
- Calculator display and keypad layout

### Acceptance Criteria
- App loads successfully
- Responsive layout works on mobile/tablet/desktop
- Core keypad is visible and usable

## Milestone 2 - Core Calculation Engine
### Deliverables
- Controlled parser/evaluation service
- Basic arithmetic support
- Percentage, square root, exponent, sign toggle
- Error handling for malformed input

### Acceptance Criteria
- Standard operations evaluate correctly
- Division by zero and negative sqrt return friendly errors
- Empty evaluation does not crash

## Milestone 3 - Scientific Features
### Deliverables
- sin/cos/tan
- log/ln
- constants (`π`, `e`)
- degree/radian mode switching

### Acceptance Criteria
- Scientific functions behave correctly in both angle modes
- Mode state is clearly visible in UI

## Milestone 4 - Memory + History
### Deliverables
- Memory operations
- Last 10 history items
- History API integration

### Acceptance Criteria
- Memory actions update correctly
- History auto-updates after successful evaluations
- History length never exceeds 10

## Milestone 5 - QA + Hardening
### Deliverables
- Unit tests for evaluator and helpers
- Component tests for interaction flows
- API tests for error scenarios
- UX polish and accessibility review

### Acceptance Criteria
- No crashes on invalid input
- Keyboard support works as specified
- Critical flows covered by tests

## Suggested Backlog
1. Setup client/server workspaces
2. Implement display and keypad components
3. Build tokenizer/parser/evaluator
4. Wire API route to evaluator service
5. Add mode toggle and scientific keys
6. Add memory reducer/actions
7. Add history storage + API retrieval
8. Add tests for edge cases
9. Final responsive and accessibility polish
