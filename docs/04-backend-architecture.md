# Backend Architecture

## 1. Backend Stack
- Node.js 24.13.1
- Express.js
- Native Math functions for scientific operations
- Minimal helper libraries only if required for safe parsing/validation

## 2. Backend Responsibilities
- Receive calculation requests from frontend
- Validate payloads and reject malformed inputs
- Safely evaluate expressions/functions
- Apply angle mode conversions for trigonometric calculations
- Return normalized result/error responses
- Optionally expose endpoints for history persistence later

## 3. Suggested Project Structure
```text
server/src/
├─ app.js
├─ server.js
├─ routes/
│  └─ calculator.routes.js
├─ controllers/
│  └─ calculator.controller.js
├─ services/
│  ├─ calculator.service.js
│  ├─ trig.service.js
│  └─ history.service.js
├─ validators/
│  └─ calculator.validator.js
├─ utils/
│  ├─ errors.js
│  ├─ formatter.js
│  └─ constants.js
└─ middleware/
   ├─ errorHandler.js
   └─ requestLogger.js
```

## 4. Calculation Strategy
### Preferred V1 Approach
Use structured calculation payloads rather than arbitrary raw strings wherever possible.

Example payload types:
- Binary operation payloads
- Unary scientific function payloads
- Full expression payload with strict validation

### Safe Evaluation Principle
Avoid direct runtime `eval`. If full expression support is required:
- tokenize input
- validate allowed symbols/functions
- parse with controlled logic
- evaluate only supported operations

## 5. Core Service Behavior
### Arithmetic
- `+`, `-`, `*`, `/`, `%`, `^`

### Unary Functions
- `sqrt`, `sin`, `cos`, `tan`, `log`, `ln`, `signToggle`

### Constants
- map `pi` to `Math.PI`
- map `e` to `Math.E`

### Angle Mode
- if mode = `deg`, convert degrees to radians before trig functions
- if mode = `rad`, use input directly

## 6. Error Handling Rules
Return consistent error responses for:
- division by zero
- invalid token sequence
- invalid domain for scientific operations
- unsupported operator/function
- empty expression or malformed payload

## 7. Response Design Goals
- predictable JSON shape
- frontend-friendly messaging
- normalized precision strategy to avoid display noise

## 8. Future Extensibility
- persist history to MySQL
- add user-specific sessions
- support copy/export history
- support graphing module integration
