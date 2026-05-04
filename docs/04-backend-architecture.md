# 04 - Backend Architecture

## Backend Stack
- Node.js 24.13.1
- Express.js
- Minimal middleware only

## Backend Responsibilities
- Safely evaluate expressions
- Apply scientific/math function rules
- Handle degree/radian conversions
- Return structured responses
- Maintain optional recent-history state
- Centralize validation and error formatting

## Suggested Layered Structure

### Routes
- Receive HTTP requests
- Delegate to controllers

### Controllers
- Parse request payload
- Validate required fields
- Call services
- Return success/error responses

### Services
- `calculationService`: tokenization, parsing, evaluation, math guards
- `historyService`: add/read/remove history items, cap at 10 items

### Utilities
- `parser.js`: expression tokenization and parsing
- `mathHelpers.js`: trig conversion, log guards, square root checks, precision handling

### Middleware
- Global error handler
- Input validation error formatter

## Recommended Evaluation Strategy
Use a controlled parser rather than `eval`.

### Preferred Approach
- Tokenize expression string
- Convert infix to postfix or use a simple expression parser
- Evaluate using an allowlisted operator/function set
- Apply domain-specific validations before final execution

### Why
- Safer than direct evaluation
- Easier to test
- Supports custom functions and constants cleanly
- Produces predictable errors for UI consumption

## History Handling Recommendation
For V1:
- Keep history in backend memory per running server instance
- Also return newly created history entries in evaluation responses
- Frontend mirrors the latest 10 entries in state

Future upgrade path:
- Persist history in localStorage or database if needed

## Error Response Standard
Every error should return a predictable shape:
```json
{
  "success": false,
  "error": {
    "code": "DIVISION_BY_ZERO",
    "message": "Cannot divide by zero."
  }
}
```

## Success Response Standard
```json
{
  "success": true,
  "data": {
    "expression": "5+5",
    "result": 10,
    "angleMode": "DEG",
    "historyItem": {
      "expression": "5+5",
      "result": 10,
      "timestamp": "2025-01-01T10:00:00.000Z"
    }
  }
}
```

## Backend Guardrails
- Reject invalid/empty expressions
- Reject divide-by-zero operations
- Reject square root of negative numbers
- Reject invalid log/ln input values
- Normalize floating-point precision for display-friendly output where practical
- Cap history length at 10
