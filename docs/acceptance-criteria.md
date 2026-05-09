# Acceptance Criteria

## Calculation Features
- The system shall support addition, subtraction, multiplication, and division.
- The system shall support percentage, square root, exponents, and sign toggle.
- The system shall support `sin`, `cos`, `tan`, `log`, and `ln`.
- The system shall allow insertion of `π` and `e` constants.

## Interaction
- Users shall be able to interact via on-screen buttons.
- Users shall be able to interact via supported keyboard inputs.
- Pressing `Enter` shall trigger evaluation.
- Pressing `Backspace` shall remove the last input token or character according to the implemented input model.

## Modes and Memory
- Users shall be able to toggle between `DEG` and `RAD` mode.
- Trigonometric results shall respect the selected angle mode.
- Users shall be able to use M+, M−, MR, and MC operations.

## History
- The system shall display up to the 10 most recent calculations.
- Each history item shall contain expression and result.
- The history list shall update automatically after successful calculations.

## Error Handling
- Division by zero shall show a user-friendly error.
- Invalid expressions shall show a user-friendly error.
- Square root of negative numbers shall show a user-friendly error.
- Empty evaluations shall not crash the UI or API.

## UI/UX
- The interface shall provide a modern minimal look.
- Operator buttons shall be visually distinct from numeric buttons.
- The UI shall provide hover and active feedback states.
- The application shall be responsive across mobile, tablet, and desktop.
- The UI shall support accessible contrast and keyboard navigation.

## Technical Quality
- The backend shall avoid unsafe raw `eval` usage.
- The frontend shall use modular and maintainable React components.
- Backend responses shall be low latency during normal use.
