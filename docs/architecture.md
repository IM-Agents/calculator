# Architecture

## Overview
The application uses a split frontend/backend architecture:

- **React frontend** for display, user interaction, input handling, state management, and rendering
- **Node.js + Express backend** for safe calculation requests, validation, optional history persistence, and future extensibility

## High-Level Flow
1. User enters input via keyboard or button click
2. React updates expression state in real time
3. On evaluation, frontend sends a normalized request to backend
4. Backend validates payload and evaluates expression using controlled math logic
5. Backend returns result or user-friendly error
6. Frontend updates display, memory state, and history panel

## Frontend Modules
- `CalculatorShell`: page layout
- `DisplayPanel`: current expression/result/error state
- `ButtonGrid`: calculator keys
- `HistoryPanel`: last 10 calculations
- `ModeToggle`: deg/rad switch
- `useCalculator`: main state and interaction logic
- `keyboardMap`: keyboard-to-action translation

## Backend Modules
- `routes/calcRoutes.js`: API route definitions
- `controllers/calcController.js`: request/response handling
- `services/evaluatorService.js`: expression/function evaluation
- `services/historyService.js`: bounded history management
- `validators/calcValidator.js`: request validation and sanitization
- `utils/mathHelpers.js`: angle conversion, precision normalization, error mapping

## Design Principles
- Minimal dependency footprint
- No unsafe `eval`
- Clear separation of concerns
- Predictable error responses
- Easy extension for persistence/theme/future scientific modes

## Suggested API Responsibility Split
### Frontend
- Temporary input buffering
- Button/keyboard handling
- Memory state display
- Visual mode state
- Rendering history

### Backend
- Expression validation
- Scientific function evaluation
- Edge-case handling
- History creation/optional persistence
- Future audit/logging hooks

## Error Handling Strategy
- Backend returns structured errors with machine code + friendly message
- Frontend shows readable feedback without crashing the app
- Invalid operations do not corrupt current state
