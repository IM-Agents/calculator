# Product Requirements Document (PRD)

## 1. Overview
A fully functional calculator web application built using React for the frontend and Node.js for the backend. The product supports standard arithmetic, scientific calculations, memory operations, angle-mode-based trigonometric functions, logarithmic functions, and a recent calculation history.

## 2. Objectives
- Provide a fast, responsive, and intuitive calculator interface
- Support both basic and scientific calculations
- Use minimal and essential dependencies only
- Support button-based and keyboard-based interaction
- Deliver robust error handling with user-friendly feedback

## 3. Target Users
- Students
- Developers
- General users needing quick calculations

## 4. Functional Scope
### 4.1 Core Calculations
- Addition (`+`)
- Subtraction (`-`)
- Multiplication (`*`)
- Division (`/`)

### 4.2 Advanced Operations
- Percentage (`%`)
- Square root (`√`)
- Exponents (`^`)
- Sign toggle (`±`)

### 4.3 Trigonometric Functions
- `sin`
- `cos`
- `tan`
- Degree / Radian toggle

### 4.4 Logarithmic Functions
- `log` (base 10)
- `ln` (natural log)

### 4.5 Constants
- `π`
- `e`

### 4.6 Memory Functions
- `M+`
- `M−`
- `MR`
- `MC`

### 4.7 History Panel
- Show last 10 calculations
- Display expression and result
- Update automatically after each successful calculation

### 4.8 Keyboard Support
- Numeric keys `0-9`
- Operators `+`, `-`, `*`, `/`
- `Enter` for evaluate
- `Backspace` for delete last input

### 4.9 Error Handling
- Division by zero
- Invalid expressions
- Square root of negative number
- Empty evaluation
- Repeated operators and malformed decimals

## 5. System Behavior
### 5.1 Input Handling
The application must accept both button clicks and keyboard input while maintaining a synchronized expression state in React.

### 5.2 Calculation Engine
The backend should parse and evaluate calculator expressions safely through controlled logic or a validated parser approach. Chained operations must be supported.

### 5.3 State Management
The application must maintain:
- Current input
- Memory value
- History list (maximum 10 items)
- Angle mode (`DEG` / `RAD`)
- Current error message or status state

### 5.4 UI Rendering
- Real-time display updates
- Clear indication of active angle mode
- Responsive layout across mobile, tablet, and desktop

## 6. Non-Functional Requirements
### 6.1 Performance
Calculations should feel instant with no noticeable delay under normal usage.

### 6.2 Responsiveness
The calculator must follow a responsive design strategy for mobile, tablet, and desktop breakpoints.

### 6.3 Compatibility
The application must work in modern browsers.

### 6.4 Maintainability
- Modular React component structure
- Structured backend layers such as controllers/services
- Readable and maintainable CSS organization

## 7. Deliverables
- React frontend application specification
- Node.js backend server specification
- API documentation
- Data model documentation
- Acceptance criteria
- Edge case handling guide
- Ready-to-run project documentation
