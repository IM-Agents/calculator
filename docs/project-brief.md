# Project Brief - Calculator Web Application

## Goal
Build a responsive calculator web application using React and Node.js that supports both standard and scientific calculations with a smooth, low-latency user experience.

## Objectives
- Provide a fast, intuitive calculator UI
- Support basic and scientific operations
- Keep external libraries minimal
- Support keyboard and button input
- Prevent crashes through robust validation and error handling

## In Scope
- Standard arithmetic operations
- Percentage, square root, exponent, sign toggle
- Trigonometric functions with degree/radian mode
- Logarithmic functions (`log`, `ln`)
- Constants (`π`, `e`)
- Memory operations (`M+`, `M-`, `MR`, `MC`)
- Last 10 calculations history panel
- Keyboard support
- Friendly error states
- Responsive UI for mobile, tablet, and desktop
- Node.js API for calculation and optional history persistence

## Out of Scope (V1)
- Graph plotting
- Authentication or multi-user accounts
- Cloud persistence
- Theme switching
- Clipboard helpers

## Target Users
- Students
- Developers
- General users

## Success Metrics
- Instant perceived calculation response
- Zero crashes on invalid inputs
- Smooth mobile usability
- Accurate scientific calculations across supported functions

## Assumptions
- V1 can store history in memory or localStorage, while backend persistence remains modular and optional.
- Node.js backend is required for clean API-based architecture even if some logic can also run client-side.
- Scientific precision will rely on JavaScript `Math` with controlled rounding/display handling.
