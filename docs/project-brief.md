# Project Brief

## Project Name
Calculator Web App

## Overview
Create a fully functional calculator web application delivered as a single HTML file with embedded CSS and JavaScript. The product must support both standard and scientific calculations while staying lightweight, dependency-free, and browser-ready.

## Objectives
- Provide a fast, responsive, and intuitive calculator UI
- Support both basic and scientific calculations
- Keep the app fully self-contained with zero external dependencies
- Support both button-based and keyboard-based input
- Handle invalid input gracefully without crashes

## Target Users
- Students
- Developers
- General users needing quick calculations

## In Scope
- Basic arithmetic operations
- Scientific operations and constants
- Trigonometric functions with degree/radian toggle
- Logarithmic functions
- Memory operations
- History of the last 10 calculations
- Real-time display updates
- Keyboard support
- Responsive UI for mobile, tablet, and desktop
- User-friendly error handling

## Out of Scope
- Backend services
- Database integration
- External JavaScript or CSS libraries
- Multi-file architecture
- Persistent storage in V1
- Graph plotting
- Theme switching in V1

## Deliverable
- One self-contained HTML file ready to open in a browser

## Success Metrics
- Instant-feeling calculations
- Zero crashes on invalid input
- Smooth mobile usability
- Clear and intuitive interaction flow

## Recommended Delivery Approach
Use a state-driven UI with a controlled input pipeline and a safe evaluation layer instead of raw `eval`.
