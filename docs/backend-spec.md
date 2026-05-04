# Backend Specification

## Purpose
Provide a lightweight Node.js API for safe calculation evaluation and optional history persistence.

## Suggested Stack
- Node.js 24.13.1
- Express
- Modular controller/service structure

## Suggested Structure
- `src/server.js`
- `src/routes/calculator.routes.js`
- `src/controllers/calculator.controller.js`
- `src/services/calculation.service.js`
- `src/services/history.service.js`
- `src/utils/parser.js`
- `src/middleware/error-handler.js`

## Responsibilities
### Calculation Service
- Parse incoming expressions/functions safely
- Support chained operations
- Respect angle mode for trigonometric functions
- Return normalized result or domain/input errors

### History Service
- Store last 10 calculations in memory for V1
- Optionally expose an easy migration path to file/db persistence later

## Error Handling Rules
- Division by zero ? explicit error message
- Invalid expression ? explicit error message
- Square root of negative number ? explicit error message
- Unsupported token/function ? validation error

## Non-Functional Expectations
- Low latency for requests
- Predictable, testable logic
- Minimal dependency footprint
- Clean separation between transport and business logic

## Security / Safety
- Do not use raw `eval`
- Sanitize and validate payload shape
- Limit accepted operators/functions to known supported tokens
- Reject malformed expressions gracefully
