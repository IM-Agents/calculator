# Calculator Web Application

## Project Overview
A responsive calculator web application built with **React 18** for the frontend and **Node.js 24.13.1** for the backend. The product supports standard arithmetic, scientific functions, memory operations, angle mode switching, keyboard interaction, and a recent history panel.

## Technology Stack
- **Frontend:** React 18, CSS3, JavaScript
- **Backend:** Node.js 24.13.1, Express.js
- **API Style:** REST
- **Data Storage:** In-memory for V1, with optional upgrade path to MySQL for persistent history
- **Testing (recommended):** Vitest/Jest for unit tests, React Testing Library for UI tests, Supertest for API tests

## Core Product Goals
- Fast and intuitive calculator experience
- Responsive UI for **mobile, tablet, and desktop**
- Basic + scientific operations in one interface
- Minimal external libraries
- Reliable error handling and validation

## Key Features
- Basic arithmetic: addition, subtraction, multiplication, division
- Advanced operations: percentage, square root, exponents, sign toggle
- Scientific functions: sin, cos, tan, log, ln
- Constants: π and e
- Angle mode toggle: Degrees / Radians
- Memory functions: M+, M−, MR, MC
- Calculation history: last 10 items
- Keyboard support for fast interaction
- Friendly error states for invalid operations

## Suggested Monorepo Structure
```text
calculator/
├─ client/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ services/
│  │  ├─ utils/
│  │  └─ styles/
│  └─ public/
├─ server/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ validators/
│  │  └─ utils/
│  └─ tests/
└─ docs/
```

## Recommended Delivery Scope for V1
- Stateless calculator UI with local state for input, memory, angle mode, and recent history
- Backend API for safe expression evaluation and function execution
- Optional localStorage or backend-backed history persistence
- Clean modular architecture for easy future extension

## Documentation Index
All implementation planning documents are stored in `docs/`:
- `docs/01-project-summary.md`
- `docs/02-functional-specification.md`
- `docs/03-frontend-architecture.md`
- `docs/04-backend-architecture.md`
- `docs/05-api-specification.md`
- `docs/06-database-schema.md`
- `docs/07-development-task-breakdown.md`
- `docs/08-clickup-card-description.md`

## Suggested Future Enhancements
- Dark/light theme toggle
- Copy result to clipboard
- Persistent history with MySQL
- Graph plotting for advanced math workflows

## Notes
- React UI must be fully responsive across **mobile, tablet, and desktop**.
- Backend should never use unsafe direct evaluation without validation/sanitization controls.
- If persistent history becomes mandatory, MySQL should be introduced as the first storage option to align with the broader preferred stack.
