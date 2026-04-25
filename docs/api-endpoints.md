# API Endpoints

## V1 API Scope
This project has no backend API requirements.

## Reason
- The calculator is a browser-only single-file application
- All calculations happen locally in JavaScript
- No server persistence or network communication is required

## Internal Interaction Contracts
The frontend may still be organized around internal action handlers such as:
- `appendToken(token)`
- `evaluateExpression()`
- `clearAll()`
- `backspace()`
- `toggleAngleMode(mode)`
- `memoryAdd()`
- `memorySubtract()`
- `memoryRecall()`
- `memoryClear()`
- `pushHistory(expression, result)`

## Future Possibilities
If persistence is added later, likely additions would include endpoints for history storage or sync, but that is explicitly out of scope for V1.
