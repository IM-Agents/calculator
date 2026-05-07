# Calculator Web Application - Architecture

## 1. Architecture Overview
The application follows a simple full-stack architecture:
- **React frontend** for rendering UI, capturing inputs, managing client-side state, and displaying results/history
- **Node.js backend** for safe calculation processing, scientific function handling, validation, and optional history/memory synchronization

## 2. High-Level Components

### Frontend
- `CalculatorShell` — overall layout wrapper
- `DisplayPanel` — expression/result/error display
- `ButtonGrid` — numeric, operator, scientific, and memory controls
- `HistoryPanel` — last 10 calculations
- `ModeToggle` — degrees/radians switch
- `KeyboardHandler` — keyboard event mapping

### Backend
- `calculationController` — request handling for calculation endpoints
- `calculationService` — core parsing and evaluation logic
- `scientificService` — trig/log/advanced math helpers
- `memoryController/service` — optional memory state sync endpoints
- `historyController/service` — optional history persistence endpoints
- `validationLayer` — request payload and expression validation

## 3. Suggested Frontend Structure
```text
frontend/src/
├─ components/
│  ├─ CalculatorShell/
│  ├─ DisplayPanel/
│  ├─ ButtonGrid/
│  ├─ HistoryPanel/
│  └─ ModeToggle/
├─ hooks/
│  ├─ useCalculatorState.js
│  └─ useKeyboardInput.js
├─ services/
│  └─ calculatorApi.js
├─ utils/
│  ├─ inputFormatter.js
│  ├─ expressionBuilder.js
│  └─ historyMapper.js
├─ styles/
│  ├─ variables.css
│  ├─ layout.css
│  └─ calculator.css
└─ App.jsx
```

## 4. Suggested Backend Structure
```text
backend/src/
├─ controllers/
│  ├─ calculationController.js
│  ├─ memoryController.js
│  └─ historyController.js
├─ routes/
│  ├─ calculationRoutes.js
│  ├─ memoryRoutes.js
│  └─ historyRoutes.js
├─ services/
│  ├─ calculationService.js
│  ├─ parserService.js
│  ├─ scientificService.js
│  ├─ memoryService.js
│  └─ historyService.js
├─ validators/
│  └─ calculationValidator.js
├─ middleware/
│  └─ errorHandler.js
└─ app.js
```

## 5. Data Flow
1. User interacts via button click or keyboard input
2. React updates local expression state
3. On evaluation, frontend sends normalized expression and metadata to backend
4. Backend validates the request
5. Backend evaluates expression using controlled services
6. Backend returns result or error message
7. Frontend updates display, history, and UI feedback

## 6. Calculation Strategy
Recommended V1 approach:
- Avoid unsafe raw `eval`
- Use a controlled parser and operation dispatcher
- Normalize tokens before processing
- Separate basic math, scientific math, and validation responsibilities

If complexity grows, consider introducing a lightweight expression parser library later, but V1 should stay minimal unless real limits appear.

## 7. State Ownership

### Frontend-owned state
- Current expression
- Current display value
- Active angle mode
- Local memory value (if no backend sync)
- Local history list (if no backend persistence)
- Error message visibility

### Backend-owned state (optional for V1)
- Normalized calculation processing
- Centralized validation
- Optional shared history persistence
- Optional memory synchronization

## 8. Responsiveness Strategy
- Use mobile-first CSS
- Stack display, controls, and history vertically on small screens
- Move history to a side panel on tablet/desktop
- Ensure button sizing remains touch-friendly

## 9. Error Handling Strategy
- Validate inputs before evaluation
- Return consistent error response format
- Show friendly, non-technical messages in UI
- Prevent application crashes from invalid math operations

## 10. Scalability Notes
The architecture is intentionally lightweight for V1, but supports later upgrades such as:
- Persistent storage
- Session-based history
- Theming
- Copy-to-clipboard
- Graph plotting
