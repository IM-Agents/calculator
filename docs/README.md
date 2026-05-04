# Calculator Web Application

## Project Summary
A responsive calculator web application with a React frontend and Node.js backend. The product supports basic arithmetic, scientific calculations, memory functions, angle mode switching, and a rolling calculation history.

## Recommended Stack
- **Frontend:** React 18, Vite, plain CSS (responsive mobile/tablet/desktop design)
- **Backend:** Node.js 24.13.1, Express.js
- **Data Storage:** In-memory history for V1, with optional local persistence or database-backed persistence later
- **API Style:** REST
- **Testing:** Vitest/React Testing Library (frontend), Node test runner or Jest/Supertest (backend)

## Why This Stack
- React gives fast UI rendering and component modularity.
- Node.js fits the requirement for a lightweight backend API.
- Plain CSS keeps external dependencies minimal.
- Express is the smallest practical backend layer for clean controller/service separation.

## Recommended Project Structure
```text
calculator/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ Calculator.jsx
│  │  │  ├─ Display.jsx
│  │  │  ├─ ButtonGrid.jsx
│  │  │  ├─ HistoryPanel.jsx
│  │  │  └─ ModeToggle.jsx
│  │  ├─ hooks/
│  │  │  └─ useKeyboardInput.js
│  │  ├─ utils/
│  │  │  ├─ formatDisplay.js
│  │  │  └─ validateExpression.js
│  │  ├─ styles/
│  │  │  ├─ app.css
│  │  │  └─ calculator.css
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  │  ├─ calculationController.js
│  │  │  └─ historyController.js
│  │  ├─ services/
│  │  │  ├─ calculationService.js
│  │  │  └─ historyService.js
│  │  ├─ routes/
│  │  │  ├─ calculationRoutes.js
│  │  │  └─ historyRoutes.js
│  │  ├─ middleware/
│  │  │  └─ errorHandler.js
│  │  ├─ utils/
│  │  │  ├─ parser.js
│  │  │  └─ mathHelpers.js
│  │  ├─ app.js
│  │  └─ server.js
│  └─ package.json
└─ docs/
   ├─ README.md
   ├─ 01-project-description.md
   ├─ 02-functional-specification.md
   ├─ 03-frontend-architecture.md
   ├─ 04-backend-architecture.md
   ├─ 05-database-schema.md
   ├─ 06-api-specification.md
   └─ 07-development-tasks.md
```

## Key Product Capabilities
- Basic arithmetic: add, subtract, multiply, divide
- Scientific operations: percentage, square root, exponents, sign toggle
- Trigonometric functions: sin, cos, tan with Degree/Radian toggle
- Logarithmic functions: log10 and natural log
- Constants: pi and e
- Memory operations: M+, M−, MR, MC
- Last 10 calculations history
- Keyboard and button input support
- User-friendly validation and error handling

## V1 Delivery Guidance
- Prefer frontend-managed state for current input, memory value, history list, and angle mode.
- Use backend calculation APIs for safe expression evaluation and standardized error handling.
- Keep history persistence optional for V1; in-memory on backend plus frontend mirror is enough unless persistence is explicitly needed.
- Avoid `eval`; use a controlled parser/evaluation service.

## Suggested Improvement
Although the PRD allows either Node API evaluation or controlled logic, the better V1 path is:
- **Use controlled backend evaluation** for consistency, validation, and future persistence support.
- Keep the frontend responsible for interaction/state/display only.

## Deliverables Included In Docs
- Product description
- Functional and non-functional specification
- Frontend architecture
- Backend architecture
- Database/history design
- API contract
- Step-by-step development tasks
- ClickUp-ready implementation breakdown
