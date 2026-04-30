# Backend API Specification

## Base URL
`/api`

## Purpose
The backend provides safe expression evaluation and history management. It should be structured cleanly using controllers and services so future persistence upgrades remain straightforward.

---

## 1. Evaluate Expression
### `POST /api/calculate`

Safely evaluates a calculator expression using the selected angle mode.

### Request Body
```json
{
  "expression": "sin(90)+5^2",
  "angleMode": "DEG"
}
```

### Success Response
```json
{
  "success": true,
  "data": {
    "expression": "sin(90)+5^2",
    "result": "26",
    "angleMode": "DEG",
    "timestamp": "2025-08-06T12:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "DIVISION_BY_ZERO",
    "message": "Cannot divide by zero."
  }
}
```

### Evaluation Rules
- Support chained arithmetic operations
- Support `%`, `√`, `^`, `±`
- Support `sin`, `cos`, `tan`, `log`, `ln`
- Support constants `π` and `e`
- Respect `DEG` / `RAD` mode for trigonometric functions
- Reject malformed or unsupported expressions safely
- Avoid unsafe `eval`

---

## 2. Get History
### `GET /api/history`

Returns the most recent 10 successful calculations.

### Success Response
```json
{
  "success": true,
  "data": [
    {
      "expression": "2+2",
      "result": "4",
      "timestamp": "2025-08-06T12:00:00.000Z"
    }
  ]
}
```

---

## 3. Clear History
### `DELETE /api/history`

Clears stored calculation history.

### Success Response
```json
{
  "success": true,
  "message": "History cleared successfully."
}
```

---

## Optional Future Memory Endpoints
If memory state is later synchronized through the backend:
- `POST /api/memory/add`
- `POST /api/memory/subtract`
- `GET /api/memory`
- `DELETE /api/memory`

## Validation Rules
- `expression` is required
- `angleMode` must be `DEG` or `RAD`
- Reject expressions over a safe size limit
- Reject repeated unsupported tokens and malformed function calls
- Handle empty input without crashing

## Error Codes
- `EMPTY_EXPRESSION`
- `INVALID_EXPRESSION`
- `DIVISION_BY_ZERO`
- `NEGATIVE_SQRT`
- `UNSUPPORTED_OPERATION`
- `OVERFLOW`

## Backend Structure Guidance
- Controllers should stay thin
- Evaluator service should own parsing and execution rules
- History service should own last-10 cap logic
- Validation layer should sanitize and normalize request payloads before evaluation
