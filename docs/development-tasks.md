# Development Tasks

## Phase 1 - Project Setup
1. Initialize frontend React app structure.
2. Initialize backend Node.js app structure.
3. Configure local development scripts for frontend and backend.
4. Create shared documentation and folder conventions.

## Phase 2 - Frontend UI Foundation
1. Build responsive calculator layout.
2. Implement display component.
3. Implement reusable button component.
4. Build button grid for numeric, operator, scientific, and memory controls.
5. Implement responsive history panel.
6. Add degree/radian toggle UI.

## Phase 3 - Frontend State & Interaction
1. Implement expression state handling.
2. Implement keyboard input mapping.
3. Implement delete/clear/sign-toggle behavior.
4. Add validation for decimal and repeated operator edge cases.
5. Render user-friendly errors.

## Phase 4 - Backend Calculation Engine
1. Create evaluate endpoint.
2. Implement safe parser/evaluator for supported operations and functions.
3. Add angle mode handling for trig functions.
4. Add robust error responses for invalid/domain errors.
5. Add unit tests for core calculation scenarios.

## Phase 5 - History & Memory Features
1. Update frontend history after successful calculations.
2. Cap history to last 10 items.
3. Implement memory functions M+, M-, MR, MC.
4. Optionally expose backend history retrieval and clear APIs.

## Phase 6 - QA & Polish
1. Test mobile/tablet/desktop responsiveness.
2. Validate keyboard accessibility and focus states.
3. Test large values and malformed inputs.
4. Confirm low-latency evaluation behavior.
5. Review browser compatibility in modern browsers.

## Acceptance Checklist
- All required operations available
- Keyboard and button input both work
- Error handling is user-friendly
- UI is responsive across mobile, tablet, desktop
- History shows latest 10 calculations
- Memory functions behave correctly
