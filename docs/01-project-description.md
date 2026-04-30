# Project Description

## Product Summary
Build a fully functional calculator web application that enables users to perform standard arithmetic and scientific calculations through a responsive React interface backed by a Node.js calculation API.

## Primary Users
- Students
- Developers
- General users needing quick calculations

## Business / Product Outcome
The application should provide a reliable, fast, and clean experience for everyday and advanced calculations without unnecessary dependencies or bloated architecture.

## Scope
### In Scope
- Basic arithmetic: addition, subtraction, multiplication, division
- Advanced operations: percentage, square root, exponents, sign toggle
- Trigonometric functions: sin, cos, tan
- Logarithmic functions: log base 10, natural log
- Constants: pi, e
- Memory operations: M+, M-, MR, MC
- History panel with last 10 calculations
- Keyboard input support
- Friendly error handling
- Responsive UI for mobile, tablet, and desktop
- Node.js backend API for safe calculation processing

### Out of Scope (V1)
- Graph plotting
- Theme switching
- Clipboard tools
- Authentication / user accounts
- Multi-device persisted history

## Assumptions
- Single-user local/session-style calculator behavior is acceptable for V1
- Backend persistence for history is optional in V1 unless explicitly required later
- Browser support means modern Chromium, Firefox, Safari, and Edge versions

## Risks
- Incorrect math parsing if expression logic is not normalized consistently
- Precision edge cases with floating-point operations
- Trigonometric mode confusion if deg/rad state is not visually prominent
- UX issues on small screens if scientific button layout is overcrowded

## Recommended Delivery Approach
1. Build backend evaluation engine first
2. Define clean API contracts
3. Implement frontend calculator state and button layout
4. Integrate keyboard handling and history tracking
5. Finish validation, edge cases, and responsive polishing
