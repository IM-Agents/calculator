# Data Model and Logic Notes

## Frontend State
```ts
interface HistoryEntry {
  expression: string;
  result: string;
  createdAt?: string;
}
```

```ts
interface CalculatorState {
  currentExpression: string;
  displayValue: string;
  memoryValue: number | null;
  history: HistoryEntry[];
  angleMode: 'deg' | 'rad';
  error: string | null;
}
```

## Backend Request Contract
```ts
interface EvaluateRequest {
  expression: string;
  angleMode: 'deg' | 'rad';
}
```

## Backend Response Contract
```ts
interface EvaluateResponse {
  success: boolean;
  data?: {
    expression: string;
    result: number | string;
    angleMode: 'deg' | 'rad';
  };
  error?: {
    code: string;
    message: string;
  };
}
```

## Calculation Rules
- Support operators: `+`, `-`, `*`, `/`, `%`, `^`
- Support functions: `sqrt`, `sin`, `cos`, `tan`, `log`, `ln`
- Support constants: `pi`, `e`
- Sign toggle should transform current numeric token safely
- Trigonometric functions must respect selected angle mode
- Domain errors must return readable messages

## History Rules
- Maximum 10 entries
- Newest first is recommended for usability
- Auto-update after every successful calculation
