# 07 - Development Tasks

## ClickUp Card Title
Calculator Web Application - React + Node.js Scientific Calculator

## ClickUp Card Description
Build a responsive calculator web application using React 18 (frontend) and Node.js 24.13.1 + Express (backend). The app must support standard arithmetic, scientific functions, memory operations, DEG/RAD trigonometric calculations, logarithms, constants, keyboard interaction, and a rolling last-10 history panel. Keep dependencies minimal, avoid unsafe expression evaluation, provide clean modular architecture, and ensure smooth mobile/tablet/desktop responsiveness with clear error handling.

## Delivery Milestones

### Phase 1 - Project Setup
1. Initialize frontend with React 18 and Vite
2. Initialize backend with Node.js + Express
3. Create base folder structure for components, routes, controllers, services, and utilities
4. Add shared environment/config setup if required

### Phase 2 - Frontend UI
5. Build calculator shell layout
6. Build responsive display area
7. Build button grid for numbers/operators/functions
8. Build DEG/RAD toggle UI
9. Build history panel UI
10. Implement responsive mobile/tablet/desktop styling
11. Add hover, focus, and active button states

### Phase 3 - Frontend Logic
12. Implement calculator state management
13. Implement input normalization and validation
14. Implement keyboard event handling
15. Implement memory operations (M+, M−, MR, MC)
16. Implement local history rendering and cap at 10 items
17. Handle display formatting for large numbers and errors

### Phase 4 - Backend Logic
18. Create `/api/calculate` endpoint
19. Create safe parser/evaluation service (no unrestricted eval)
20. Implement support for arithmetic operators
21. Implement support for percentage, exponent, sqrt, sign toggle
22. Implement support for sin, cos, tan with angle mode conversion
23. Implement support for log, ln, pi, and e
24. Create optional `/api/history` endpoint
25. Implement history management service with max 10 entries
26. Implement structured error handling middleware

### Phase 5 - Integration
27. Connect frontend evaluation requests to backend API
28. Update history panel from successful backend responses
29. Surface backend validation errors as user-friendly UI messages
30. Verify memory behavior remains stable during API-driven calculations

### Phase 6 - QA & Hardening
31. Test divide-by-zero, invalid expressions, negative sqrt, invalid logs, empty input, repeated operators, and multiple decimals
32. Test keyboard interactions across supported keys
33. Test mobile responsiveness and layout behavior
34. Test modern browser compatibility
35. Clean up code and documentation

## Suggested ClickUp Task Breakdown

### Epic 1 - Frontend Foundation
- Set up React app structure
- Create responsive calculator layout
- Build button grid and display components
- Build history panel and mode toggle

### Epic 2 - Input & State Management
- Implement expression state flow
- Implement keyboard bindings
- Add input validation/normalization
- Add memory management

### Epic 3 - Calculation Engine API
- Create calculation endpoint
- Build parser and evaluation service
- Add scientific/math support
- Add error code mapping

### Epic 4 - History & Polish
- Add history endpoint/service
- Sync frontend history state
- Finish responsiveness/accessibility polish
- Complete QA regression tests

## Definition Of Done
- All listed calculator features work end-to-end
- Responsive design works on mobile, tablet, and desktop
- Error cases show friendly messages and do not crash the app
- History is capped at 10 entries
- Code structure is modular and maintainable
- Documentation is ready for a coding agent or developer handoff
