# 02 - Functional Specification

## Functional Modules

### 1. Display & Input Module
**Purpose:** Show the current expression, current result, error states, and active modes.

**Responsibilities:**
- Render the current expression in real time
- Render evaluated result after execution
- Accept input from button clicks
- Accept input from keyboard events
- Prevent malformed input sequences where possible

**Rules:**
- Empty input should not evaluate
- Multiple decimal points in a single numeric token should be blocked
- Repeated operators should be normalized or replaced instead of appended blindly
- Backspace should remove the last entered token/character

### 2. Calculation Engine Module
**Purpose:** Safely parse and evaluate user expressions.

**Supported Operations:**
- `+`, `-`, `*`, `/`
- `%`
- `sqrt`
- exponentiation `^`
- sign toggle `±`
- `sin`, `cos`, `tan`
- `log`, `ln`
- constants `π`, `e`

**Rules:**
- Support chained expressions
- Reject invalid expression patterns
- Handle degree/radian conversion for trigonometric functions
- Return structured errors for unsupported or invalid cases
- Never use unrestricted `eval`

### 3. Memory Module
**Purpose:** Provide temporary calculator memory behavior.

**Functions:**
- `M+` add current display/result to memory
- `M−` subtract current display/result from memory
- `MR` recall memory value into active input
- `MC` clear memory

**Rules:**
- Memory defaults to `0`
- Memory updates should use the most recent valid numeric result
- Invalid/error states should not update memory

### 4. Angle Mode Module
**Purpose:** Control trigonometric calculations in degrees or radians.

**Functions:**
- Toggle between `DEG` and `RAD`
- Visually highlight the active mode
- Pass mode to backend calculation API when needed

### 5. History Module
**Purpose:** Display recent calculations.

**Behavior:**
- Store the last 10 successful calculations
- Each history item contains expression, result, and timestamp
- New items push older entries down
- Oldest item is removed when the cap exceeds 10

### 6. Error Handling Module
**Purpose:** Convert technical errors into user-friendly feedback.

**Must Handle:**
- Division by zero
- Invalid expressions
- Square root of negative number
- Invalid logarithm inputs (`log(<=0)`, `ln(<=0)`)
- Tangent undefined edge cases if represented
- Empty evaluation requests
- Very large numbers beyond supported precision

## Non-Functional Specification

### Performance
- UI interactions should feel immediate
- Backend calculation response should be low latency
- No unnecessary re-renders in core calculator interactions

### Responsiveness
- Mobile-first responsive design
- Layout must adapt for mobile, tablet, and desktop
- History panel may collapse beneath the calculator on small screens

### Accessibility
- Keyboard navigation support
- Clear contrast and legible display text
- Distinct focus styles for interactive controls
- Buttons should include accessible labels where symbols are ambiguous

### Maintainability
- Reusable React components
- Clear backend separation: routes, controllers, services, utils
- Minimal dependencies
- Readable CSS organization

## Acceptance Criteria
- Users can complete all listed arithmetic and scientific operations
- Keyboard support works for numbers, operators, Enter, and Backspace
- The history panel shows the latest 10 successful calculations
- Errors are displayed clearly and do not crash the app
- The interface remains usable on mobile/tablet/desktop
