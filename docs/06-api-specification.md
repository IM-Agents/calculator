# 06 - API Specification

## API Overview
The backend provides a minimal REST API for calculation and optional history retrieval.

## Base URL
```text
/api
```

## 1. Evaluate Calculation
### Endpoint
```http
POST /api/calculate
```

### Request Body
```json
{
  "expression": "sin(30)+5^2",
  "angleMode": "DEG"
}
```

### Request Rules
- `expression` is required
- `angleMode` must be `DEG` or `RAD`
- Expression must contain only allowlisted operators, functions, constants, and valid numeric tokens

### Success Response
```json
{
  "success": true,
  "data": {
    "expression": "sin(30)+5^2",
    "result": 25.5,
    "angleMode": "DEG",
    "historyItem": {
      "expression": "sin(30)+5^2",
      "result": 25.5,
      "timestamp": "2025-01-01T10:00:00.000Z"
    }
  }
}
```

### Error Response Example
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EXPRESSION",
    "message": "The expression is invalid."
  }
}
```

## 2. Get Recent History
### Endpoint
```http
GET /api/history
```

### Success Response
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "expression": "5+5",
        "result": 10,
        "timestamp": "2025-01-01T10:00:00.000Z"
      }
    ]
  }
}
```

## 3. Clear History (Optional)
### Endpoint
```http
DELETE /api/history
```

### Success Response
```json
{
  "success": true,
  "data": {
    "cleared": true
  }
}
```

## HTTP Status Recommendations
- `200` successful read/evaluation
- `400` invalid input or unsupported expression
- `422` mathematically invalid operation
- `500` unexpected server error

## Error Codes
- `EMPTY_EXPRESSION`
- `INVALID_EXPRESSION`
- `DIVISION_BY_ZERO`
- `NEGATIVE_SQRT`
- `INVALID_LOG_INPUT`
- `UNSUPPORTED_OPERATION`
- `INTERNAL_ERROR`

## Notes
- Memory operations can remain frontend-managed for V1 and do not require a dedicated API.
- If future persistence is added, history endpoints can be expanded without changing the calculator UI contract significantly.
