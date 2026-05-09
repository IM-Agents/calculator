# Data Models

## 1. Calculation Request
```json
{
  "expression": "(5+3)*2",
  "angleMode": "DEG"
}
```

### Fields
- `expression` (string, required): Raw expression or structured scientific input to evaluate
- `angleMode` (enum, required): `DEG` or `RAD`

## 2. Calculation Response
```json
{
  "success": true,
  "expression": "(5+3)*2",
  "normalizedExpression": "(5+3)*2",
  "result": 16,
  "errorCode": null,
  "message": "Calculation successful",
  "timestamp": "2026-05-09T05:37:00.000Z"
}
```

### Fields
- `success` (boolean): Whether the calculation succeeded
- `expression` (string): Original submitted expression
- `normalizedExpression` (string): Backend-normalized safe expression representation
- `result` (number|string|null): Final result or null on failure
- `errorCode` (string|null): Machine-readable error code
- `message` (string): User-facing outcome message
- `timestamp` (ISO string): Response timestamp

## 3. History Item
```json
{
  "id": "hist_001",
  "expression": "sin(30)",
  "result": "0.5",
  "angleMode": "DEG",
  "createdAt": "2026-05-09T05:37:00.000Z"
}
```

### Fields
- `id` (string): Unique history record identifier
- `expression` (string): Expression evaluated
- `result` (string): Result stored as display-safe text
- `angleMode` (enum): `DEG` or `RAD`
- `createdAt` (ISO string): Creation timestamp

## 4. Frontend UI State
```json
{
  "currentInput": "12/4",
  "displayValue": "3",
  "memoryValue": 0,
  "angleMode": "DEG",
  "history": [],
  "errorMessage": null
}
```

### Fields
- `currentInput` (string): Current typed or composed expression
- `displayValue` (string): Value shown in main display
- `memoryValue` (number): Stored memory value
- `angleMode` (enum): `DEG` or `RAD`
- `history` (array): Last 10 history items
- `errorMessage` (string|null): Active user-facing error
