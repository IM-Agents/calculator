# Calculator Web Application

A full-stack calculator web application built with **React** (frontend) and **Node.js** (backend). It supports standard arithmetic, scientific functions, memory operations, keyboard input, and a rolling calculation history.

## Technologies / Stack

- **Frontend:** React 18, Vite, JavaScript, responsive CSS
- **Backend:** Node.js 24, Express
- **State Management:** Native React state/hooks
- **Calculation Engine:** Controlled parser/evaluation service (no unsafe `eval`)
- **Persistence:** In-memory history on backend, with optional localStorage/history persistence later
- **Testing (recommended):** Vitest, React Testing Library, Supertest

## Product Summary

This calculator is intended for students, developers, and general users who need fast everyday calculations plus scientific functions. The app must provide:

- Basic arithmetic: `+`, `-`, `*`, `/`
- Advanced operations: `%`, `√`, `^`, sign toggle `±`
- Trigonometric functions: `sin`, `cos`, `tan`
- Angle mode toggle: `DEG` / `RAD`
- Logarithmic functions: `log`, `ln`
- Constants: `π`, `e`
- Memory functions: `M+`, `M-`, `MR`, `MC`
- History panel showing the last 10 calculations
- Button + keyboard interaction
- Friendly error handling
- **Responsive UI/design for mobile, tablet, and desktop**

## Recommended Project Structure

```text
calculator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── constants/
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
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
└── docs/
```

## Documentation Files

- `docs/project-brief.md`
- `docs/architecture.md`
- `docs/frontend-spec.md`
- `docs/backend-api.md`
- `docs/database-schema.md`
- `docs/development-plan.md`
- `docs/code-structure.md`
- `docs/raid-log.md`
- `docs/figma-tree.md`

## Implementation Notes

- Use a controlled calculation engine instead of unsafe expression execution.
- Keep dependencies minimal and essential only.
- Structure backend code with clear controller/service separation.
- Prefer last-10 rolling history logic at the service layer.
- If persistence is deferred in V1, keep storage abstraction ready so localStorage or DB can be added later.

## Suggested Future Enhancements

- Dark/light theme toggle
- Copy result to clipboard
- Persistent history
- Graph plotting
