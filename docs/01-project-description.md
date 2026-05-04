# 01 - Project Description

## Product Name
Calculator Web Application

## Goal
Build a fast, responsive, minimal-dependency calculator web application using React for the frontend and Node.js for the backend. The product should support both standard and scientific calculations while remaining simple to maintain and easy to extend.

## Business Outcome
This application is intended to give students, developers, and general users a reliable browser-based calculator that works smoothly across desktop, tablet, and mobile devices.

## Primary Objectives
- Deliver an intuitive modern calculator UI
- Support standard and scientific calculation flows
- Keep dependencies minimal and essential only
- Support both mouse/touch and keyboard interaction
- Prevent crashes from invalid inputs through robust validation and error handling

## Target Users
- Students solving arithmetic/scientific problems
- Developers needing quick browser-based calculations
- General users needing a clean utility calculator

## Scope Included In V1
- Basic arithmetic operations
- Scientific operations and constants
- Degree/Radian mode toggle
- Memory functions
- Rolling history of the last 10 calculations
- Keyboard support
- User-friendly error messaging
- Responsive UI for mobile/tablet/desktop

## Out Of Scope For V1
- Graph plotting
- Theme management beyond a default modern theme
- Advanced formula editing/history replay
- User accounts or cloud sync
- Full persistent audit/history unless specifically enabled later

## Success Criteria
- Calculations feel instant to the user
- Invalid input does not crash the app
- Mobile usability is smooth and readable
- Core features work consistently across modern browsers

## Recommended Product Decisions
- Keep evaluation logic centralized in the backend to avoid inconsistent calculation behavior.
- Keep history capped at 10 entries to match the PRD and simplify UI handling.
- Use modular components in the frontend and controller/service separation in the backend.
