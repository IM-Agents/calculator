# Implementation Notes

## Expression Evaluation Strategy
Do not use raw JavaScript `eval`. Implement tokenization + parsing or a controlled math evaluation layer that explicitly supports:
- Operators: `+`, `-`, `*`, `/`, `^`
- Functions: `sqrt`, `sin`, `cos`, `tan`, `log`, `ln`
- Constants: `pi`, `e`
- Parentheses

## Frontend UX Notes
- Keep primary numeric keys large and thumb-friendly on mobile
- Separate scientific keys visually from numeric keys
- Highlight active angle mode clearly
- Show error messages inline without breaking layout
- Keep the history panel below the calculator on smaller screens and beside it on larger screens

## Suggested Acceptance Test Set
- `2+2 = 4`
- `10/2 = 5`
- `10/0` returns divide-by-zero error
- `sqrt(16) = 4`
- `sqrt(-1)` returns negative-square-root error
- `sin(30)` in degree mode = `0.5`
- `sin(pi/2)` in radian mode = `1`
- `log(100) = 2`
- `ln(e) = 1`
- `5^3 = 125`
