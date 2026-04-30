# Calculator Web Application

## Overview
A responsive calculator web application with a React frontend and Node.js backend. It supports standard arithmetic, scientific functions, memory operations, angle-mode-based trigonometric calculations, logarithmic functions, and a recent history panel.

## Recommended Stack
- Frontend: React 18
- Backend: Node.js 24.x with Express
- Styling: CSS Modules or plain modular CSS
- State handling: React hooks (`useState`, `useReducer`, `useEffect`)
- Testing: Vitest/Jest for unit tests, React Testing Library for UI tests
- API format: REST JSON

## Core Product Goals
- Fast, intuitive calculator UX
- Responsive UI for mobile, tablet, and desktop
- Support both basic and scientific calculations
- Minimal external dependencies
- Safe and robust expression evaluation
- Keyboard-first usability

## Deliverables
- React frontend application
- Node.js backend API for calculations and optional history persistence
- Ready-to-run full-stack project
- Documentation for architecture, API, DB, and development tasks

## Suggested Architecture
### Frontend
- `CalculatorShell`
- `DisplayPanel`
- `ButtonGrid`
- `HistoryPanel`
- `ModeToggle`
- `useCalculator` custom hook for calculator state/actions

### Backend
- `routes/calculator.routes.js`
- `controllers/calculator.controller.js`
- `services/calculator.service.js`
- `utils/evaluator.js`
- `validators/calculation.validator.js`

## Key Product Decisions
- Use controlled evaluation logic instead of unsafe `eval`
- Keep history capped at 10 entries
- Support degree/radian mode for trig functions
- Handle errors with friendly messages
- Keep memory value in frontend state initially; backend sync optional

## Notes / Suggested Improvement
The PRD allows either Node API evaluation or controlled local evaluation logic. For this project, the cleanest implementation is:
- Use backend evaluation as the canonical source for calculation results
- Keep frontend state for current input, angle mode, memory, and history rendering
- Use local validation in frontend for instant UX feedback

This keeps the app aligned with the requirement for a Node.js backend while still remaining lightweight.
