# API Specification

## 1. API Overview
Base path suggestion: `/api/v1/calculator`

The backend should provide a small, focused API set for calculation and optional history management.

## 2. Endpoints

### 2.1 POST `/api/v1/calculator/evaluate`
Safely evaluates an expression or structured calculation request.

#### Request Body
```json
{
  "expression": "12+7*3",
  "angleMode": "deg"
}
```

#### Alternative Structured Request
```json
{
  "operation": "sin",
  "operands": [30],
  "angleMode": "deg"
}
```

#### Success Response
```json
{
  "success": true,
  "data": {
    "expression": "sin(30)",
    "result": 0.5,
    "angleMode": "deg",
    "timestamp": "2026-05-02T05:41:00.000Z"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_DOMAIN",
    "message": "Square root of a negative number is not allowed."
  }
}
```

### 2.2 GET `/api/v1/calculator/health`
Used for quick backend availability checks.

#### Success Response
```json
{
  "success": true,
  "message": "Calculator API is healthy"
}
```

### 2.3 GET `/api/v1/calculator/history` (Optional)
Returns recent history entries if backend persistence is enabled.

#### Success Response
```json
{
  "success": true,
  "data": [
    {
      "expression": "5+5",
      "result": 10,
      "angleMode": "deg",
      "timestamp": "2026-05-02T05:41:00.000Z"
    }
  ]
}
```

### 2.4 POST `/api/v1/calculator/history` (Optional)
Stores a history item for persistence-ready implementations.

#### Request Body
```json
{
  "expression": "2^8",
  "result": 256,
  "angleMode": "deg"
}
```

## 3. Validation Rules
- `angleMode` must be `deg` or `rad`
- Request must contain either:
  - a valid `expression`, or
  - a valid structured `operation` + `operands`
- Only supported symbols/functions may pass validation
- Numeric payloads must be finite values

## 4. Error Codes
- `DIVISION_BY_ZERO`
- `INVALID_EXPRESSION`
- `INVALID_DOMAIN`
- `UNSUPPORTED_OPERATION`
- `EMPTY_INPUT`
- `VALIDATION_ERROR`
- `INTERNAL_ERROR`

## 5. Precision and Formatting
- Internal calculation can use JavaScript number precision
- Response formatting should avoid excessive floating-point artifacts where possible
- Final UI formatting remains a frontend concern

## 6. Security Notes
- Do not evaluate raw input unsafely
- Restrict accepted operations and functions to an allowlist
- Sanitize all incoming request payloads
