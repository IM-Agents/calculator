# API Specification

## Base Path
`/api/calculator`

## 1. Evaluate Expression
### Endpoint
`POST /api/calculator/evaluate`

### Request Body
```json
{
  "expression": "sin(30)+5^2",
  "angleMode": "deg"
}
```

### Validation Rules
- `expression` is required
- `angleMode` must be `deg` or `rad`
- Unsupported tokens/functions must be rejected

### Success Response
```json
{
  "success": true,
  "data": {
    "expression": "sin(30)+5^2",
    "result": 25.5,
    "angleMode": "deg"
  }
}
```

### Error Responses
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EXPRESSION",
    "message": "The expression is invalid."
  }
}
```

```json
{
  "success": false,
  "error": {
    "code": "NEGATIVE_SQRT",
    "message": "Square root of a negative number is not allowed."
  }
}
```

## 2. Optional: Get History
### Endpoint
`GET /api/calculator/history`

### Success Response
```json
{
  "success": true,
  "data": [
    {
      "expression": "2+2",
      "result": 4,
      "angleMode": "deg",
      "createdAt": "2026-04-30T10:00:00.000Z"
    }
  ]
}
```

## 3. Optional: Clear History
### Endpoint
`DELETE /api/calculator/history`

### Success Response
```json
{
  "success": true,
  "message": "History cleared successfully."
}
```
