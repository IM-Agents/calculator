# Backend API

## Base URL
`/api`

## 1. Evaluate Expression
### `POST /api/calculate`
Evaluates a normalized calculator request.

#### Request Body
```json
{
  "expression": "sin(90)+5^2",
  "angleMode": "DEG"
}
```

#### Success Response
```json
{
  "success": true,
  "data": {
    "expression": "sin(90)+5^2",
    "result": "26",
    "angleMode": "DEG"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "DIVISION_BY_ZERO",
    "message": "Cannot divide by zero."
  }
}
```

## 2. Get Calculation History
### `GET /api/history`
Returns the last 10 calculations.

#### Success Response
```json
{
  "success": true,
  "data": [
    {
      "expression": "2+2",
      "result": "4",
      "timestamp": "2026-04-25T10:00:00.000Z"
    }
  ]
}
```

## 3. Clear History
### `DELETE /api/history`
Clears stored history.

#### Success Response
```json
{
  "success": true,
  "message": "History cleared successfully."
}
```

## Optional Future Endpoints
- `POST /api/memory/add`
- `POST /api/memory/subtract`
- `GET /api/memory`
- `DELETE /api/memory`

## Validation Rules
- `expression` is required
- `angleMode` must be `DEG` or `RAD`
- Reject malformed function names or unsupported symbols
- Reject expressions that exceed safe input length

## Error Codes
- `INVALID_EXPRESSION`
- `DIVISION_BY_ZERO`
- `NEGATIVE_SQRT`
- `UNSUPPORTED_OPERATION`
- `EMPTY_EXPRESSION`
- `OVERFLOW`

## Controller/Service Notes
- Controller should remain thin
- Evaluator service owns parsing, conversion, and error mapping
- History service should cap records at 10
