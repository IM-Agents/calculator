# Architecture

## High-Level Architecture
This project uses a simple full-stack architecture:

- **React frontend** for rendering the calculator UI, handling keyboard/button input, maintaining interactive state, and showing history/mode state.
- **Node.js + Express backend** for safe expression evaluation and optional history persistence.

## Frontend Responsibilities
- Capture and normalize user input
- Manage expression, display, angle mode, history view, and memory state
- Render responsive UI for **mobile, tablet, and desktop**
- Display friendly validation and runtime errors
- Call backend evaluation/history endpoints

## Backend Responsibilities
- Validate incoming requests
- Safely parse and evaluate expressions
- Enforce scientific/math operation rules
- Manage rolling history records (max 10)
- Return structured success/error responses

## Recommended Request Flow
1. User enters expression from keypad or keyboard
2. Frontend normalizes expression and selected angle mode
3. Frontend calls `POST /api/calculate`
4. Backend validates and evaluates safely
5. Backend returns result or structured error
6. Frontend updates display and history panel

## Key Design Principles
- No unsafe direct expression execution
- Minimal dependencies
- Clean separation between UI state and calculation logic
- Modular backend services for maintainability and future persistence

## Persistence Strategy
### V1
- History may be stored in memory on the backend
- Frontend can optionally cache history locally for UX continuity

### Future
- Introduce persistent storage adapter without changing API contract

## Risks
- Scientific expression parsing complexity
- Floating-point precision quirks in JavaScript math
- UX confusion around `%`, `±`, and exponent behavior if not defined clearly
