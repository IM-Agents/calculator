# Calculator Web Application

## Project Summary
A responsive calculator web application with a React frontend and Node.js backend that supports standard arithmetic, scientific functions, memory operations, angle mode switching, and a rolling history of the last 10 calculations.

## Recommended Stack
- Frontend: React 18
- Backend: Node.js 24.13.1 with Express
- Styling: CSS Modules or structured plain CSS
- State handling: Native React state/hooks
- Persistence: Optional localStorage for history, with future API-backed persistence

## Core Goals
- Fast and intuitive calculator experience
- Support both button and keyboard input
- Cover basic and scientific calculations
- Keep dependencies minimal and intentional
- Provide clear, user-friendly error feedback
- Ensure responsive UI across mobile, tablet, and desktop

## Suggested Documentation Set
- `docs/project-overview.md`
- `docs/frontend-spec.md`
- `docs/backend-spec.md`
- `docs/api-spec.md`
- `docs/data-model.md`
- `docs/development-tasks.md`
- `docs/clickup-card-description.md`

## Suggested Alternative Considerations
- For a calculator this simple, backend calculation could be avoided entirely and handled client-side with a controlled parser for lower complexity.
- Keeping a Node.js API is still acceptable here because it matches the technical constraint and leaves room for future persistence, analytics, and shared history.
