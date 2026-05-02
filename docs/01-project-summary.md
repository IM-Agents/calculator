# Calculator Web Application - Project Summary

## 1. Product Vision
Build a fast, reliable, and modern calculator web application that combines standard calculator behavior with scientific functions, memory controls, and recent calculation history.

## 2. Objectives
- Provide a clean and intuitive interface
- Support both basic and scientific calculations
- Keep dependencies minimal and essential
- Allow both button and keyboard input
- Handle invalid input gracefully
- Maintain responsive usability on mobile, tablet, and desktop

## 3. Target Users
- Students
- Developers
- General users needing quick calculations

## 4. Scope
### In Scope (V1)
- Basic arithmetic operations
- Percentage, square root, exponents, sign toggle
- Trigonometric calculations with degree/radian mode
- Logarithmic calculations: `log`, `ln`
- Constants: `pi`, `e`
- Memory operations: `M+`, `M-`, `MR`, `MC`
- History panel showing the latest 10 calculations
- Keyboard-based interaction
- User-friendly error handling
- Backend calculation API

### Optional in V1
- Persisting history using localStorage
- Backend history endpoint for future persistence expansion

### Out of Scope (for current delivery)
- Graph plotting
- Theme switching
- Authentication/user accounts
- Multi-user persistent profiles

## 5. Success Criteria
- Instant-feeling calculations under normal usage
- No app crashes on invalid input
- Smooth responsive experience on small and large screens
- Clear separation between frontend presentation and backend calculation logic

## 6. Key Product Decisions
- Use **React 18** for a component-based responsive frontend
- Use **Node.js 24.13.1 + Express** for calculation APIs
- Keep calculation logic centralized in backend services for safer evaluation and future extensibility
- Store recent history in frontend state for V1, with an optional persistence-ready backend contract

## 7. Identified Non-Blocker Recommendations
- Prefer structured function-based operations over free-form raw expression evaluation wherever possible
- If expression parsing is supported, use a safe parser strategy instead of unsafe runtime eval
- Add telemetry/logging hooks later only if required; avoid unnecessary complexity in V1
