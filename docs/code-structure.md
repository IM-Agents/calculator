# Code Structure Plan

## Repository Layout

```text
calculator/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ButtonGrid/
│   │   │   ├── DisplayPanel/
│   │   │   ├── HistoryPanel/
│   │   │   └── ModeToggle/
│   │   ├── hooks/
│   │   │   └── useCalculator.js
│   │   ├── services/
│   │   │   └── calculatorApi.js
│   │   ├── utils/
│   │   │   ├── keyboardMap.js
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── calcController.js
│   │   ├── routes/
│   │   │   └── calcRoutes.js
│   │   ├── services/
│   │   │   ├── evaluatorService.js
│   │   │   └── historyService.js
│   │   ├── validators/
│   │   │   └── calcValidator.js
│   │   ├── utils/
│   │   │   ├── angle.js
│   │   │   ├── errors.js
│   │   │   └── mathHelpers.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
└── docs/
```

## Frontend Responsibility Map
- `useCalculator.js`: main orchestrator for expression, result, error, memory, history, and angle mode
- `ButtonGrid`: reusable config-driven keypad rendering
- `calculatorApi.js`: all backend calls in one place
- `formatters.js`: output cleanup, number formatting, large-number display handling

## Backend Responsibility Map
- `calcController.js`: translate HTTP requests to service calls
- `evaluatorService.js`: tokenizer/parser/evaluation pipeline
- `historyService.js`: last-10 bounded list and optional persistence abstraction
- `calcValidator.js`: input validation, max length, supported token rules

## Testing Structure

```text
client/src/components/__tests__/
client/src/hooks/__tests__/
server/src/services/__tests__/
server/src/routes/__tests__/
```

## Implementation Note
Keep the evaluator isolated so it can later be reused by both backend APIs and direct client-side fallback logic if needed.
