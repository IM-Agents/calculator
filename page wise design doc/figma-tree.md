# Figma Tree (Page-wise)

## 1) Authentication Flow (Optional)

- `Auth / Login`
  - Header (Logo, Product Name)
  - Login Form (Email, Password)
  - Actions (Login Button, Forgot Password)
  - Footer Links

## 2) Calculator Home Page

- `Calculator / Main`
  - App Header
    - Title: Calculator
    - Mode Toggle: Basic / Scientific
    - Angle Toggle: Degree / Radian
  - Display Section
    - Current Input Display
    - Result Display
    - Error Message Slot
  - Keypad Section
    - Number Keys (0-9, decimal)
    - Arithmetic Operators (+, -, *, /, =)
    - Utility Keys (AC, C, DEL, +/-)
    - Advanced Keys (%, sqrt, power)
    - Constants (pi, e)
  - Memory Controls
    - M+, M-, MR, MC

## 3) Scientific Functions Panel

- `Calculator / Scientific Panel`
  - Trigonometric Group (sin, cos, tan)
  - Logarithmic Group (log, ln)
  - Exponential Group (x^y, e^x)
  - Root Group (sqrt, n-th root)
  - Parenthesis Controls ((, ))

## 4) History Page / Drawer

- `Calculator / History`
  - History Header
    - Title
    - Clear History Action
  - History List (last 10 calculations)
    - Expression
    - Result
    - Timestamp (optional)
  - Reuse Action
    - Tap to restore expression to calculator

## 5) Settings Page (Optional)

- `Calculator / Settings`
  - Theme Selection (Light / Dark)
  - Default Angle Mode (Deg / Rad)
  - Precision Controls
  - Data Controls
    - Clear History
    - Reset Memory

## 6) Responsive Variants

- `Mobile`
  - Stacked layout
  - Bottom keypad priority
- `Tablet`
  - Split layout for display and keypad
- `Desktop`
  - Full scientific grid + side history panel

## Naming Convention Suggestion (Figma Layers/Frames)

- `Page/<PageName>`
- `Section/<SectionName>`
- `Component/<ComponentName>`
- `State/<Default|Active|Error|Disabled>`

Example:

- `Page/Calculator-Main`
  - `Section/Display`
  - `Section/Keypad`
  - `Component/Button-Operator`
  - `State/Error`
