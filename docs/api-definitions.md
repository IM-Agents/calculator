# API Definitions

## API Base
`/api/v1`

## 1. POST `/calculate`
Evaluates a calculator expression or scientific operation set.

### Request Body
```json
{
  "expression": "sqrt(81)+5",
  "angleMode": "DEG"
}
```

### Success Response
```json
{
  "success": true,
  "expression": "sqrt(81)+5",
  "normalizedExpression": "9+5",
  "result": 14,
  "errorCode": null,
  "message": "Calculation successful",
  "timestamp": "2026-05-09T05:37:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "expression": "10/0",
  "normalizedExpression": "10/0",
  "result": null,
  "errorCode": "DIVISION_BY_ZERO",
  "message": "Cannot divide by zero",
  "timestamp": "2026-05-09T05:37:00.000Z"
}
```

### Validation Rules
- `expression` is required
- `angleMode` must be `DEG` or `RAD`
- Unsafe tokens or unsupported operations must be rejected

## 2. GET `/history`
Returns up to the last 10 history items.

### Success Response
```json
{
  "success": true,
  "items": []
}
```

## 3. POST `/history`
Optional endpoint for backend-managed persistence.

### Request Body
```json
{
  "expression": "5+5",
  "result": "10",
  "angleMode": "DEG"
}
```

## 4. DELETE `/history`
Optional endpoint to clear history when backend persistence is enabled.

### Success Response
```json
{
  "success": true,
  "message": "History cleared"
}
```

## Error Codes
- `INVALID_EXPRESSION`
- `DIVISION_BY_ZERO`
- `NEGATIVE_SQRT`
- `INVALID_LOG_INPUT`
- `UNSUPPORTED_OPERATION`
- `EMPTY_INPUT`
- `INTERNAL_ERROR`
