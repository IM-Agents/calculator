# Calculator Web Application - API Specification

## 1. API Overview
The backend exposes a small REST API for calculations and optional state synchronization.

Base path example:
```text
/api/v1
```

## 2. Endpoints

### 2.1 POST `/calculate`
Evaluate a calculator expression or function request.

#### Request Body
```json
{
  "expression": "12+5*3",
  "angleMode": "deg",
  "context": {
    "source": "button"
  }
}
```

#### Response - Success
```json
{
  "success": true,
  "data": {
    "expression": "12+5*3",
    "result": 27,
    "formattedResult": "27"
  }
}
```

#### Response - Error
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EXPRESSION",
    "message": "Please enter a valid calculation."
  }
}
```

#### Supported Use Cases
- Basic arithmetic
- Percentage calculations
- Square root
- Exponents
- Sign toggle handling
- Trigonometric calculations using active angle mode
- Logarithmic calculations
- Constant insertion

### 2.2 GET `/health`
Simple healthcheck endpoint.

#### Response
```json
{
  "success": true,
  "message": "Calculator API is running"
}
```

### 2.3 GET `/history` (optional)
Fetch current history entries.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "expression": "2+2",
      "result": 4,
      "createdAt": "2025-01-01T10:00:00.000Z"
    }
  ]
}
```

### 2.4 POST `/history` (optional)
Persist a successful calculation entry.

#### Request Body
```json
{
  "expression": "2+2",
  "result": 4
}
```

### 2.5 DELETE `/history` (optional)
Clear stored history.

#### Response
```json
{
  "success": true,
  "message": "History cleared successfully"
}
```

### 2.6 GET `/memory` (optional)
Fetch current memory value.

#### Response
```json
{
  "success": true,
  "data": {
    "memoryValue": 10
  }
}
```

### 2.7 POST `/memory` (optional)
Apply a memory action.

#### Request Body
```json
{
  "action": "M+",
  "value": 5
}
```

#### Supported actions
- `M+`
- `M-`
- `MR`
- `MC`

#### Response
```json
{
  "success": true,
  "data": {
    "memoryValue": 15
  }
}
```

## 3. Validation Rules
- `expression` must be a non-empty string for calculate requests
- `angleMode` must be either `deg` or `rad`
- Memory actions must be one of the supported action values
- Invalid payloads should return a `400 Bad Request`

## 4. Error Codes
- `INVALID_EXPRESSION`
- `DIVIDE_BY_ZERO`
- `NEGATIVE_SQRT`
- `INVALID_LOG_INPUT`
- `EMPTY_INPUT`
- `UNSUPPORTED_OPERATION`
- `VALIDATION_ERROR`
- `INTERNAL_SERVER_ERROR`

## 5. Response Contract
Recommended standard response wrapper:
```json
{
  "success": true,
  "data": {}
}
```

or

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-friendly message"
  }
}
```

## 6. Security / Safety Notes
- Never use unrestricted evaluation on raw user input
- Sanitize and normalize expression input
- Validate all scientific function parameters before execution
- Keep API surface intentionally small
