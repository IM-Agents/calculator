# Product Requirements

## 1. Overview
A single-file, fully functional calculator web application built using HTML, CSS, and vanilla JavaScript. The application supports standard arithmetic, advanced mathematical functions, memory operations, trigonometric and logarithmic calculations, and calculation history.

## 2. Functional Requirements

### 2.1 Core Calculations
- Addition (`+`)
- Subtraction (`-`)
- Multiplication (`×`)
- Division (`÷`)

### 2.2 Advanced Operations
- Percentage (`%`)
- Square root (`√`)
- Exponents (`^`)
- Sign toggle (`±`)

### 2.3 Trigonometric Functions
- `sin`
- `cos`
- `tan`
- Degree / Radian mode toggle
- Visible active-mode highlight

### 2.4 Logarithmic Functions
- `log` (base 10)
- `ln` (natural logarithm)

### 2.5 Constants
- `π`
- `e`

### 2.6 Memory Functions
- `M+`
- `M-`
- `MR`
- `MC`

### 2.7 History Panel
- Display the last 10 calculations
- Show expression and result together
- Auto-update after each successful evaluation

### 2.8 Keyboard Support
- Numeric keys `0-9`
- Operators `+`, `-`, `*`, `/`
- `Enter` to evaluate
- `Backspace` to delete the last input

### 2.9 Error Handling
- Division by zero
- Invalid expressions
- Square root of negative numbers
- Empty input evaluation
- Multiple decimal misuse
- Repeated operators
- Very large number handling
- User-friendly feedback instead of crashes

## 3. State Requirements
The application must maintain:
- current input / expression state
- memory value
- history list capped at 10 items
- angle mode (`deg` or `rad`)

## 4. UI Requirements
- Display at the top
- Calculator button grid in a familiar layout
- History panel shown beside the calculator on larger screens or below on smaller screens
- Real-time rendering updates
- Responsive UI/design for mobile, tablet, and desktop

## 5. Non-Functional Requirements
- Instant-feeling calculations
- Compatible with modern browsers
- Clean, modular JavaScript
- Readable CSS organization
- Keyboard accessibility and clear visual contrast

## 6. Acceptance Criteria
- Users can perform both basic and scientific calculations
- Users can operate the app through both buttons and keyboard input
- Memory operations work correctly
- History retains only the latest 10 calculations
- Degree/radian state visibly updates and affects trig results
- Invalid operations show friendly errors and do not crash the app
- The app runs entirely from a single HTML file without dependencies
