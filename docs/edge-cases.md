# Edge Cases

## Input Validation
- Prevent multiple decimal points within the same number token.
- Prevent malformed operator sequences unless explicitly normalized.
- Handle empty input evaluation without crashing.
- Gracefully handle trailing operators before evaluation.

## Mathematical Errors
- Division by zero must return a clear error.
- Square root of a negative number must return a clear error.
- Logarithm of zero or a negative number must return a clear error.
- Tangent near undefined angles should be validated or handled carefully.

## Precision / Range
- Very large numbers may exceed floating-point precision.
- Repeated decimal arithmetic may introduce rounding artifacts.
- Overflow or non-finite results should surface readable messages.

## UX Behavior
- Backspace after an error should reset or recover predictably.
- Repeated equals behavior should be defined consistently.
- History should never exceed 10 visible items.
- Switching angle mode should not silently corrupt existing input state.

## Accessibility / Responsiveness
- Small screens must preserve tappable button sizes.
- Keyboard focus order must remain usable.
- Contrast should remain readable across all button types.
