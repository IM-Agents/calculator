# Recommended Code Structure

```text
calculator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CalculatorShell/
│   │   │   ├── DisplayPanel/
│   │   │   ├── ButtonGrid/
│   │   │   ├── HistoryPanel/
│   │   │   └── ModeToggle/
│   │   ├── hooks/
│   │   │   └── useCalculatorState.js
│   │   ├── services/
│   │   │   └── calculatorApi.js
│   │   ├── utils/
│   │   │   ├── inputFormatter.js
│   │   │   └── keyboardMap.js
│   │   ├── constants/
│   │   │   └── calculatorKeys.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── calculator.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── calculationController.js
│   │   │   └── historyController.js
│   │   ├── routes/
│   │   │   └── calculatorRoutes.js
│   │   ├── services/
│   │   │   ├── evaluatorService.js
│   │   │   └── historyService.js
│   │   ├── validators/
│   │   │   └── calculationValidator.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   ├── mathHelpers.js
│   │   │   └── angleHelpers.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
└── docs/
```

## Notes
- Keep evaluator logic isolated from route/controller concerns.
- Keep UI components small and focused.
- Encapsulate keyboard mapping and expression formatting in utility modules.
- Design storage behind a service so persistence can evolve later.
