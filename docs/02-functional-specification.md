# Functional Specification

## 1. Input Handling
The system must accept calculator input via:
- Button clicks
- Keyboard keys

Supported keyboard actions:
- `0-9` for numeric entry
- `+`, `-`, `*`, `/` for operators
- `Enter` to evaluate
- `Backspace` to delete last character
- `.` for decimal input

## 2. Calculation Features
### 2.1 Basic Arithmetic
- Addition
- Subtraction
- Multiplication
- Division

### 2.2 Advanced Math
- Percentage
- Square root
- Exponents
- Sign toggle

### 2.3 Trigonometry
- `sin`
- `cos`
- `tan`
- Angle mode toggle: Degrees / Radians

### 2.4 Logarithmic Functions
- `log` (base 10)
- `ln` (natural logarithm)

### 2.5 Constants
- `pi`
- `e`

### 2.6 Memory Features
- `M+`: add displayed result to memory
- `M-`: subtract displayed result from memory
- `MR`: recall memory value into current expression/display
- `MC`: clear memory

### 2.7 History
- Keep last 10 calculations only
- Each record includes:
  - Expression
  - Result
- Update automatically after every successful evaluation

## 3. State Requirements
Frontend state must maintain:
- Current input / expression
- Display value
- Memory value
- History list (max 10)
- Angle mode (`deg` or `rad`)
- Error state

## 4. Evaluation Rules
- Empty input evaluation should not crash; show neutral behavior or validation message
- Division by zero must return a user-friendly error
- Square root of negative numbers must return a user-friendly error
- Invalid expressions must be rejected safely
- Repeated operators should be normalized or blocked before evaluation
- Multiple decimal points in a single number token should be prevented

## 5. Non-Functional Behavior
- Calculations should feel instant to the user
- UI updates must occur in real time
- App must be responsive on mobile, tablet, and desktop
- UI must remain keyboard-accessible
