# Calculator Web Application

## Overview
A responsive calculator web application built with **React 18** on the frontend and **Node.js 24.x** on the backend. It supports basic arithmetic, scientific functions, memory operations, angle mode switching, keyboard interaction, and a rolling history of recent calculations.

## Recommended Stack
- **Frontend:** React 18, Vite, CSS Modules or plain modular CSS
- **Backend:** Node.js 24.x, Express.js
- **State Management:** React built-in state/hooks
- **API Style:** REST
- **History Persistence:** In-memory for V1, with an easy upgrade path to localStorage or database persistence

## Core Product Goals
- Deliver a fast, intuitive, and reliable calculator experience
- Support both everyday and scientific calculation needs
- Keep dependencies minimal and purposeful
- Provide responsive UI for **mobile, tablet, and desktop**
- Handle invalid input safely with clear user feedback

## Primary Features
- Basic arithmetic: addition, subtraction, multiplication, division
- Advanced operations: percentage, square root, exponents, sign toggle
- Trigonometric functions: sin, cos, tan with degree/radian toggle
- Logarithmic functions: log, ln
- Constants: π and e
- Memory functions: M+, M−, MR, MC
- Calculation history panel showing the last 10 calculations
- Keyboard support for common calculator interactions
- Friendly error handling for invalid scenarios

## Proposed Project Structure
```text
calculator/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ Calculator/
│  │  │  ├─ Display/
│  │  │  ├─ ButtonGrid/
│  │  │  ├─ HistoryPanel/
│  │  │  └─ ModeToggle/
│  │  ├─ hooks/
│  │  ├─ services/
│  │  ├─ utils/
│  │  ├─ styles/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ validators/
│  │  ├─ utils/
│  │  ├─ app.js
│  │  └─ server.js
│  └─ package.json
└─ docs/
   ├─ main.md
   ├─ prd.md
   ├─ user-stories.md
   ├─ acceptance-criteria.md
   ├─ data-models.md
   ├─ edge-cases.md
   ├─ api-definitions.md
   └─ technical-constraints.md
```

## Architecture Summary
### Frontend Responsibilities
- Render calculator UI and history panel
- Manage input state, angle mode, memory state, and recent history state
- Support keyboard and button-driven interaction
- Show responsive layout and inline validation/error states

### Backend Responsibilities
- Safely evaluate submitted expressions and scientific operations
- Return normalized results and error responses
- Optionally store or return recent history entries for future persistence use cases
- Enforce request validation and controlled operation handling

## Suggested API Scope
- `POST /api/v1/calculate` → evaluate an expression or scientific operation
- `GET /api/v1/history` → retrieve recent calculations
- `POST /api/v1/history` → optionally add history entry if server-side persistence is used
- `DELETE /api/v1/history` → clear history if persistence is enabled

## Security / Reliability Notes
- Do **not** use raw `eval` on user input
- Use a controlled parsing/evaluation strategy on the backend
- Validate operation payloads and numeric inputs before execution
- Return user-friendly errors without exposing internal stack traces

## Future Enhancements
- Dark/light theme toggle
- Copy-to-clipboard for results
- Persistent history via localStorage or backend store
- Graph plotting for supported expressions

## Deliverables Included in Docs
- Product requirements
- User stories
- Acceptance criteria
- Data models
- API definitions
- Edge cases
- Technical constraints
- Suggested implementation structure
