# Main Specification - Calculator Web Application

## 1. Product Requirements
### Product Summary
Build a modern calculator web application with a React frontend and Node.js backend. The product must support standard arithmetic, scientific functions, memory operations, keyboard input, and a history view of the last 10 calculations.

### Goals
- Fast and intuitive user experience
- Reliable support for basic and scientific calculations
- Minimal dependency footprint
- Strong error handling
- Responsive experience across mobile, tablet, and desktop

### In Scope
- Basic arithmetic operations
- Scientific functions and constants
- Degree/radian mode toggle
- Memory operations
- Rolling history panel
- Keyboard support
- User-friendly error states

### Out of Scope for V1
- User accounts
- Multi-device sync
- Graph plotting
- Theme personalization
- Long-term persistent storage beyond optional local persistence

## 2. User Stories
- As a student, I want to perform scientific calculations so I can solve math problems quickly.
- As a developer, I want keyboard support so I can calculate without relying on the mouse.
- As a general user, I want a clean and simple interface so I can calculate basic values quickly.
- As a mobile user, I want a responsive layout so I can use the calculator comfortably on my phone.
- As a user, I want clear errors so I understand why a calculation failed.
- As a user, I want to review my last calculations so I can reuse previous results.

## 3. Acceptance Criteria
- Users can perform `+`, `-`, `*`, `/` operations from buttons and keyboard.
- Users can execute `%`, `sqrt`, exponent, and sign toggle actions.
- Users can use `sin`, `cos`, `tan`, `log`, and `ln` functions.
- Users can switch between degree and radian modes, and trigonometric results must reflect the selected mode.
- Users can insert `π` and `e` constants into expressions.
- Users can use M+, M−, MR, and MC controls.
- The system stores and displays up to the latest 10 calculations.
- Invalid operations show readable error messages.
- The UI renders correctly on mobile, tablet, and desktop.
- No unsafe raw expression evaluation is used in production logic.

## 4. Data Models
### Calculation Request
- expression: string
- angleMode: `DEG | RAD`
- memoryValue: number (optional if needed in request flow)
- metadata: object (optional)

### Calculation Response
- success: boolean
- expression: string
- normalizedExpression: string
- result: number | string | null
- errorCode: string | null
- message: string
- timestamp: ISO string

### History Item
- id: string
- expression: string
- result: string
- angleMode: `DEG | RAD`
- createdAt: ISO string

### UI State
- currentInput: string
- displayValue: string
- memoryValue: number
- angleMode: `DEG | RAD`
- history: HistoryItem[]
- errorMessage: string | null

## 5. Edge Cases
- Multiple decimal points in one number segment
- Consecutive operators like `5++2`
- Evaluate pressed with empty input
- Divide by zero
- Square root of a negative number
- Invalid trig/log inputs
- Very large numbers causing overflow or precision loss
- Repeated equals behavior
- Backspace after error state
- History overflow beyond 10 entries

## 6. API Definitions
### POST `/api/v1/calculate`
Evaluates calculator input and returns a validated result.

Request example:
```json
{
  "expression": "sin(30)+5^2",
  "angleMode": "DEG"
}
```

Response example:
```json
{
  "success": true,
  "expression": "sin(30)+5^2",
  "normalizedExpression": "sin(30)+25",
  "result": 25.5,
  "errorCode": null,
  "message": "Calculation successful",
  "timestamp": "2026-05-09T05:37:00.000Z"
}
```

### GET `/api/v1/history`
Returns the last 10 calculations.

### POST `/api/v1/history`
Adds a new history item when backend persistence is enabled.

### DELETE `/api/v1/history`
Clears history when backend-managed history is enabled.

## 7. Technical Constraints
- Frontend must use React.
- Backend must use Node.js.
- Dependencies must remain minimal and justified.
- The UI must be responsive across mobile, tablet, and desktop.
- Expression evaluation must be controlled and safe.
- Codebase should stay modular and maintainable.
- API responses must be low latency for normal calculator usage.
