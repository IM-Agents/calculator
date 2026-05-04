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

### Validation
- `expression` is required and must be a non-empty string
- `angleMode` must be `deg` or `rad`

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

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EXPRESSION",
    "message": "The expression could not be evaluated."
  }
}
```

## 2. Get Recent History
### Endpoint
`GET /api/calculator/history`

### Success Response
```json
{
  "success": true,
  "data": [
    {
      "expression": "2+2",
      "result": "4",
      "createdAt": "2026-05-04T07:00:00.000Z"
    }
  ]
}
```

## 3. Clear History
### Endpoint
`DELETE /api/calculator/history`

### Success Response
```json
{
  "success": true,
  "message": "History cleared successfully."
}
```

## Notes
- History should be capped to the latest 10 entries.
- Frontend may also maintain local state history for immediate rendering.
- Backend persistence is optional in V1 but API design should allow future extension.
