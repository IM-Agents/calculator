# Project Brief - Calculator Web Application

## Overview
Build a fully functional calculator web application using **React** for the frontend and **Node.js** for the backend. The product must support both standard and scientific calculations while keeping the user experience fast, responsive, and intuitive.

## Primary Objectives
- Provide a fast and clean calculator UI
- Support both basic and scientific calculations
- Keep external dependencies minimal and essential only
- Support both keyboard and button-based interaction
- Deliver robust, user-friendly error handling

## Target Users
- Students
- Developers
- General users needing quick calculations

## In Scope
- Standard arithmetic: addition, subtraction, multiplication, division
- Advanced operations: percentage, square root, exponent, sign toggle
- Scientific functions: `sin`, `cos`, `tan`, `log`, `ln`
- Constants: `π`, `e`
- Memory functions: `M+`, `M-`, `MR`, `MC`
- History panel with the last 10 calculations
- Keyboard support for numbers, operators, Enter, and Backspace
- Degree/Radian mode toggle
- Friendly error states for invalid operations
- Node.js calculation API and optional history persistence support
- **Responsive UI for mobile, tablet, and desktop**

## Out of Scope for V1
- Graph plotting
- User accounts/authentication
- Multi-device sync
- Theme toggle
- Clipboard shortcuts

## Success Metrics
- Instant-feeling calculation response time
- Zero crashes on invalid input
- Smooth usability on mobile devices
- Accurate scientific calculations across supported operations

## Product Decisions
- Use a controlled calculation engine rather than unsafe direct execution.
- Keep history capped at 10 records.
- Backend remains modular even if initial storage is in-memory.
- Frontend owns interactive state; backend owns safe evaluation rules and optional persistence hooks.

## Inputs Provided
- Repo: `calculator`
- Branch requested: `test_calcad`
- Figma URL: not provided
- Comment person: not provided
