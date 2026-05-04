# Project Overview

## Objective
Build a fully functional calculator web application using React for the frontend and Node.js for the backend. The application must support both standard and scientific calculations, memory operations, angle mode toggling, and a visible rolling history of the last 10 calculations.

## Users
- Students
- Developers
- General users needing quick and reliable calculations

## Scope
### In Scope
- Basic arithmetic: addition, subtraction, multiplication, division
- Advanced math: percentage, square root, exponent, sign toggle
- Scientific functions: sin, cos, tan, log, ln
- Constants: pi, e
- Memory: M+, M-, MR, MC
- History panel with last 10 results
- Keyboard support
- Error handling for invalid math/input cases
- Responsive layout for mobile, tablet, and desktop

### Out of Scope for V1
- Dark/light theme toggle
- Clipboard copy feature
- Graph plotting
- Long-term authenticated user profiles

## Success Criteria
- Instant-feeling calculations
- No crashes on malformed input
- Smooth and readable mobile UX
- Clear separation between frontend and backend responsibilities

## Architecture Summary
- React frontend handles UI, expression building, keyboard input, display state, memory state, angle mode state, and history rendering.
- Node.js backend exposes calculation endpoints and can optionally store/retrieve recent history.
- Calculation parsing must be controlled and safe; no unsafe `eval`.

## Key Product Decisions
- Keep history capped at 10 entries.
- Angle mode is user-controlled and visibly highlighted.
- Display clear error messages instead of raw exceptions.
- UI must remain responsive and touch-friendly across devices.
