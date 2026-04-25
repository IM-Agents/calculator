# Database Schema and Data Model

## Database Requirement
No database is required for V1.

## In-Memory State Model

```json
{
  "currentInput": "12+5*3",
  "memoryValue": 0,
  "history": [
    {
      "expression": "2+2",
      "result": "4"
    }
  ],
  "angleMode": "deg",
  "error": null,
  "lastResult": "4"
}
```

## Data Rules
- `currentInput` stores the live expression
- `memoryValue` defaults to `0`
- `history` stores a maximum of 10 items
- `angleMode` supports only `deg` or `rad`
- `error` stores the current user-facing error message or `null`
- `lastResult` can be used for result reuse after evaluation

## Persistence
Persistent storage is out of scope for V1.

## Optional Future Local Storage Keys
- `calculator.history`
- `calculator.memoryValue`
- `calculator.angleMode`
