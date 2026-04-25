# Calculator Web Application

A full-stack calculator web application built with **React 18**, **Node.js 24**, and **Express**. It supports standard arithmetic, scientific functions, memory operations, trigonometric and logarithmic calculations, keyboard input, and a calculation history panel.

## Tech Stack

- **Frontend:** React 18, Vite, CSS Modules or plain modular CSS
- **Backend:** Node.js 24, Express
- **Testing:** Vitest + React Testing Library, Supertest
- **State Management:** Native React state/hooks
- **Persistence:** In-memory by default, optional localStorage/frontend persistence and optional backend history persistence

## Key Product Capabilities

- Basic arithmetic: `+`, `-`, `*`, `/`
- Advanced operations: `%`, `√`, exponent, sign toggle
- Scientific functions: `sin`, `cos`, `tan`, `log`, `ln`
- Constants: `π`, `e`
- Memory operations: `M+`, `M-`, `MR`, `MC`
- History panel with last 10 calculations
- Keyboard and button interaction
- Degree/Radian toggle
- Friendly error handling for invalid operations
- **Responsive UI for mobile, tablet, and desktop**

## Recommended Project Structure

```text
calculator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── app.js
│   └── package.json
└── docs/
```

## Documentation

- `docs/project-brief.md`
- `docs/architecture.md`
- `docs/frontend-spec.md`
- `docs/backend-api.md`
- `docs/database-schema.md`
- `docs/development-plan.md`
- `docs/code-structure.md`
- `docs/raid-log.md`
- `doc/figma-tree.md` (page-wise design structure)
- `page wise design doc/figma-tree.md` (page-wise design structure)

## Design Documentation

This repository includes a page-wise design tree document for mapping screens/sections into a Figma-friendly hierarchy:

- `doc/figma-tree.md`
- `page wise design doc/figma-tree.md`

## JavaScript Logging Note

Requested `console.log` insertion in all `.js` files could not be applied because there are currently no `.js` files in this repository.

If `.js` files are added later, apply logging updates at that point.

## Suggested Development Flow

1. Build calculator UI shell and responsive layout
2. Implement expression parsing/evaluation service
3. Add scientific operations and angle mode handling
4. Add history and memory state flows
5. Expose backend calculation/history endpoints
6. Add tests for edge cases and invalid inputs

## Notes

- Keep dependencies minimal and essential only.
- Avoid unsafe `eval`; use controlled parsing/evaluation logic.
- Backend should be modular even if initial persistence is in-memory.
