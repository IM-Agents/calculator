# Technical Architecture

## Architecture Style
A lightweight client-server architecture:
- React frontend for UI, state, and interaction handling
- Node.js backend for safe evaluation and optional history persistence

## Frontend Architecture
### Suggested Structure
```text
frontend/
  src/
    components/
      CalculatorShell/
      DisplayPanel/
      ButtonGrid/
      HistoryPanel/
      ModeToggle/
    hooks/
      useCalculator.js
    services/
      calculatorApi.js
    utils/
      inputSanitizer.js
      keyboardMap.js
    styles/
    App.jsx
    main.jsx
```

### Frontend Responsibilities
- Render calculator display and controls
- Manage local UI state
- Collect and sanitize input
- Call backend for evaluation
- Render history and memory interactions
- Support responsive mobile/tablet/desktop layouts

## Backend Architecture
### Suggested Structure
```text
backend/
  src/
    routes/
      calculator.routes.js
    controllers/
      calculator.controller.js
    services/
      calculator.service.js
    utils/
      evaluator.js
      mathHelpers.js
    validators/
      calculation.validator.js
    app.js
    server.js
```

### Backend Responsibilities
- Validate incoming calculation payloads
- Parse supported functions/operators safely
- Execute calculations without unsafe dynamic evaluation
- Return structured results/errors
- Optionally manage short-lived history persistence

## Data Flow
1. User enters expression/function
2. Frontend sanitizes and updates UI state
3. Frontend sends evaluation request to backend
4. Backend validates payload
5. Backend evaluates expression/function
6. Backend returns result or error
7. Frontend updates display and history

## Error Response Pattern
```json
{
  "success": false,
  "error": {
    "code": "DIVISION_BY_ZERO",
    "message": "Cannot divide by zero."
  }
}
```

## Success Response Pattern
```json
{
  "success": true,
  "data": {
    "expression": "2+2",
    "result": 4,
    "angleMode": "deg"
  }
}
```
