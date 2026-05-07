# ClickUp Task Description - Calculator Web Application

## Task Title
Build responsive full-stack calculator web application with scientific functions, memory operations, and history

## Task Summary
Create a ready-to-run calculator web application using **React 18** for the frontend and **Node.js 24.13.1** for the backend. The application must support both standard and scientific calculations, keyboard and button interactions, memory operations, angle mode toggling, and a rolling history of the last 10 calculations.

## Core Requirements
- Responsive UI for **mobile, tablet, and desktop**
- Modern minimal calculator layout
- Basic arithmetic: `+`, `-`, `*`, `/`
- Scientific functions: `%`, `√`, `^`, `±`, `sin`, `cos`, `tan`, `log`, `ln`
- Constants: `π`, `e`
- Memory functions: `M+`, `M-`, `MR`, `MC`
- History panel showing expression + result for the latest 10 calculations
- Keyboard support for numbers, operators, Enter, and Backspace
- Friendly error handling for invalid expressions, divide-by-zero, invalid square roots, and related domain errors
- Clean modular frontend and backend structure
- Minimal external libraries only where truly necessary

## Technical Expectations
- Frontend: React 18 with modular components and responsive CSS
- Backend: Node.js 24.13.1 with structured controllers/services
- Safe calculation processing with controlled validation
- API endpoints for calculation and optional memory/history state handling
- Maintainable code organization for future feature additions

## Deliverables
- React frontend
- Node.js backend
- API wiring between frontend and backend
- Responsive calculator UI
- Scientific and memory functionality
- History support
- Ready-to-run project structure
- Basic validation and QA coverage for critical flows

## Acceptance Criteria
- All listed calculator functions work correctly
- UI is responsive across mobile, tablet, and desktop
- Keyboard input works as expected
- History correctly stores the most recent 10 calculations
- Invalid input does not crash the app
- Backend responses are fast and consistent
- Codebase is clean and modular

## Suggested Dev Notes
- Prefer a controlled expression parser/service over raw unrestricted evaluation
- Keep persistence lightweight for V1 unless explicitly required
- Design the UI so future enhancements like theming and persistent history can be added cleanly
