# Calculator Web Application

## Overview
This project is a full-stack calculator web application based on the provided PRD. It uses a **React 18 frontend** and a **Node.js 24.13.1 backend** to deliver a fast, responsive, and maintainable calculator experience for both standard and scientific calculations.

The system is designed to support:
- Basic arithmetic
- Scientific operations
- Memory functions
- Trigonometric and logarithmic calculations
- Calculation history
- Keyboard and button-based interaction
- Robust error handling

## Recommended Technology Stack
- **Frontend:** React 18, JavaScript, responsive CSS
- **Backend:** Node.js 24.13.1, Express.js
- **API style:** REST
- **State handling:** React local state / context where needed
- **Persistence:** In-memory for V1, with optional history persistence via localStorage or backend storage
- **Testing (recommended):** Vitest/Jest for unit logic, React Testing Library for UI, Supertest for backend API tests

## Important UI Requirement
The UI must be **fully responsive across mobile, tablet, and desktop**.

## Project Goals
- Deliver a clean and intuitive calculator UI
- Keep external dependencies minimal and essential only
- Support safe expression evaluation
- Maintain clean separation between frontend UI and backend calculation services
- Make future enhancements easy to add

## Suggested Project Structure
```text
calculator/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ services/
│  │  ├─ utils/
│  │  ├─ styles/
│  │  └─ App.jsx
│  └─ package.json
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ validators/
│  │  └─ app.js
│  └─ package.json
└─ docs/
   ├─ requirements.md
   ├─ architecture.md
   ├─ api-spec.md
   ├─ db-schema.md
   ├─ implementation-plan.md
   └─ clickup-task.md
```

## Documentation Included
- `docs/requirements.md` — refined product and functional requirements
- `docs/architecture.md` — system architecture and module responsibilities
- `docs/api-spec.md` — backend API contract for calculations, memory, and history
- `docs/db-schema.md` — suggested data structures and optional persistence schema
- `docs/implementation-plan.md` — phased delivery and task breakdown
- `docs/clickup-task.md` — strong ClickUp-ready task description

## Suggested Delivery Approach
1. Build the React calculator UI with responsive layout
2. Implement calculation engine and validation logic in the backend
3. Wire frontend actions to backend APIs
4. Add history, memory, keyboard support, and angle-mode handling
5. Validate edge cases and error messaging
6. Test responsiveness and browser compatibility

## Future Enhancements
- Dark/light theme toggle
- Copy result to clipboard
- Persistent history
- Graph plotting

## Notes
- If desired, the backend can be kept optional for some scientific operations, but the preferred V1 approach is to keep calculation logic centralized and safely controlled through Node.js services.
- For very large numbers or advanced precision handling, a dedicated math library may be considered later, but V1 should stay minimal unless precision issues make it necessary.
