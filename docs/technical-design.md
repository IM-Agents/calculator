# Technical Design

## Architecture
The app will be implemented in a single `index.html` file containing:
- semantic HTML structure
- embedded CSS for layout and visual states
- embedded JavaScript for state, input control, evaluation, and rendering

## Logical Modules Inside the File

### 1. State Layer
Maintain a single source of truth:

```js
{
  currentInput: '',
  memoryValue: 0,
  history: [],
  angleMode: 'deg',
  error: null,
  lastResult: null
}
```

### 2. Input Controller
Responsibilities:
- handle button clicks
- handle keyboard events
- normalize visible operators to evaluation-safe tokens
- prevent malformed sequences where practical
- route function buttons like `sin`, `log`, `√`, and constants consistently

### 3. Evaluation Engine
Responsibilities:
- safely parse and evaluate user expressions
- support chained operations
- map supported scientific tokens to controlled `Math` operations
- convert trig input based on active angle mode
- validate domains before evaluation

## Safe Evaluation Strategy
Do not use raw `eval` on unsanitized input.

Recommended approach:
1. tokenize and normalize the input
2. replace symbols like `×` and `÷` with safe internal operators
3. map supported functions and constants explicitly
4. validate edge cases before execution
5. evaluate through a constrained parser or controlled expression transformer

## Math Rules
- reject division by zero
- reject `sqrt(x)` for `x < 0`
- reject `log(x)` and `ln(x)` for `x <= 0`
- prevent malformed decimal sequences
- return friendly errors for unsupported or broken expressions

## History Rules
- add only successful evaluations to history
- store `expression` and `result`
- cap history length at 10
- show newest first

## Rendering Rules
- update the expression display in real time
- show friendly errors without losing recoverable user context
- highlight the active angle mode button
- visually distinguish operator, number, function, memory, and destructive buttons

## Browser Compatibility Goal
- Chrome
- Edge
- Firefox
- Safari
