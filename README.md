# Calculator Web App

Single-file scientific calculator web application designed for direct browser use.

## Stack
- HTML5
- Embedded CSS3
- Vanilla JavaScript (no external libraries)

## Delivery Goal
Build a responsive calculator that supports standard arithmetic, scientific functions, memory operations, trig and logarithmic calculations, keyboard input, and a rolling history of the last 10 calculations.

## Core Features
- Basic arithmetic: `+`, `-`, `×`, `÷`
- Advanced operations: `%`, `√`, `^`, `±`
- Trigonometric functions: `sin`, `cos`, `tan`
- Angle mode toggle: Degrees / Radians
- Logarithmic functions: `log`, `ln`
- Constants: `π`, `e`
- Memory controls: `M+`, `M-`, `MR`, `MC`
- History panel with the latest 10 calculations
- Keyboard support for numeric and operator input
- Friendly error handling for invalid math and malformed input

## UX Requirements
- Modern minimal UI
- Responsive layout for mobile, tablet, and desktop
- Distinct styling for numbers, operators, scientific functions, and destructive actions
- Clear focus, hover, and active states

## Technical Constraints
- One self-contained HTML file
- Embedded CSS and JavaScript only
- No external frameworks, packages, or APIs
- Works in modern browsers

## Documentation
- `docs/project-brief.md` - scope, goals, and boundaries
- `docs/requirements.md` - functional and non-functional requirements
- `docs/technical-design.md` - recommended architecture and evaluation approach
- `docs/ui-ux.md` - layout, interaction, accessibility, and responsive guidance
- `docs/api-endpoints.md` - confirms no backend API scope for V1
- `docs/database-schema.md` - in-memory data model for calculator state
- `docs/development-tasks.md` - implementation backlog and delivery order
- `docs/raid-log.md` - risks, assumptions, issues, and dependencies

## Recommended Build Approach
1. Create the single-file layout and responsive grid
2. Implement controlled expression input and validation
3. Add the safe evaluation engine for arithmetic and scientific functions
4. Add memory and history state management
5. Add keyboard support, accessibility polish, and edge-case handling
6. Validate across mobile and desktop viewports
