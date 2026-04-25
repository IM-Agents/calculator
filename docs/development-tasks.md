# Development Tasks

## Epic 1: Shell and Responsive Layout

### Story 1.1 Build the single-file app shell
**Description**  
Create `index.html` with embedded HTML, CSS, and JavaScript.

**Acceptance Criteria**
- One self-contained HTML file exists
- No external CSS or JavaScript files are used
- The file opens directly in the browser

### Story 1.2 Build the responsive calculator layout
**Description**  
Create the display, controls grid, and history panel with a mobile-first structure.

**Acceptance Criteria**
- Display is visible at the top
- Controls follow a calculator-style grid
- History appears beside the calculator on large screens and below on smaller screens
- Layout works on mobile, tablet, and desktop

## Epic 2: Input and Evaluation Engine

### Story 2.1 Implement controlled expression input
**Description**  
Accept button and keyboard input while preventing malformed sequences where feasible.

**Acceptance Criteria**
- Current expression updates in real time
- Supported keyboard keys work correctly
- Repeated operators and malformed decimal patterns are handled safely

### Story 2.2 Implement basic arithmetic evaluation
**Description**  
Support addition, subtraction, multiplication, division, and chained operations.

**Acceptance Criteria**
- Expressions evaluate correctly
- Division by zero shows a friendly error

### Story 2.3 Implement advanced and scientific functions
**Description**  
Add percentage, square root, exponents, sign toggle, trig functions, logs, and constants.

**Acceptance Criteria**
- Supported functions return correct values
- Degree/radian mode changes trig behavior correctly
- Invalid domains show friendly errors

## Epic 3: State Features

### Story 3.1 Implement memory operations
**Description**  
Add `M+`, `M-`, `MR`, and `MC` behavior.

**Acceptance Criteria**
- Memory value updates correctly
- Recalled memory inserts or displays predictably

### Story 3.2 Implement history tracking
**Description**  
Store and render the last 10 successful calculations.

**Acceptance Criteria**
- New successful calculations appear in history automatically
- Each history item shows expression and result
- History is capped at 10 items

## Epic 4: UX, Accessibility, and QA

### Story 4.1 Polish interaction states and accessibility
**Description**  
Add visible focus states, contrast-safe styling, and clear error presentation.

**Acceptance Criteria**
- Keyboard focus is visible
- Contrast remains readable
- Error messages are understandable

### Story 4.2 Validate edge cases and browser behavior
**Description**  
Test empty input, repeated operators, multiple decimals, negative square root, and large values across modern browsers.

**Acceptance Criteria**
- No crashes occur on invalid input
- Edge cases fail gracefully
- App remains usable across common modern browsers

## Recommended Delivery Order
1. Single-file shell and responsive layout
2. Input handling and safe evaluation path
3. Scientific features and angle mode
4. Memory and history
5. Accessibility and QA

## Strong ClickUp Card Description
Build a single-file responsive calculator web app using HTML, embedded CSS, and vanilla JavaScript. The app must support standard arithmetic, scientific functions, trig with degree/radian mode, logarithms, constants, memory operations, keyboard interaction, and a rolling history of the last 10 calculations. It must handle invalid expressions and math edge cases gracefully, work without external dependencies, and open directly in a browser.
