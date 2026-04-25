# RAID Log

## Risks
- Building scientific evaluation without unsafe `eval` may increase implementation complexity.
- Floating-point precision issues may affect displayed results for some operations.
- Trigonometric edge cases (e.g. tan near 90°) require careful error/overflow handling.

## Assumptions
- Frontend will manage immediate interaction state while backend remains source of truth for evaluation.
- History persistence can start in-memory and later move to database without changing the API contract.
- Minimal dependencies means avoiding heavy math/parser libraries unless truly necessary.

## Issues
- No confirmed persistence requirement beyond optional history persistence in V1.
- Existing repository currently appears minimal, so scaffold decisions will shape implementation direction.

## Dependencies
- GitHub repository access for branch updates
- Node.js runtime for backend
- Browser environment with modern JavaScript support

## Recommendation
Use a small custom tokenizer/parser or tightly controlled expression evaluator service instead of relying on `eval` or large third-party math engines. This best matches the minimal-dependency and safety requirements.
