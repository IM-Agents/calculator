# Figma Tree (Page-wise)

## 1. Calculator Main Page

- `Page/Calculator-Main`
  - `Section/Header`
    - App title
    - Mode toggle (Basic/Scientific)
    - Angle toggle (Degree/Radian)
  - `Section/Display`
    - Current input
    - Result output
    - Error state message
  - `Section/Keypad`
    - Number keys (`0-9`, `.`)
    - Operators (`+`, `-`, `*`, `/`, `=`)
    - Utility actions (`AC`, `C`, `DEL`, `+/-`)
    - Advanced actions (`%`, `sqrt`, `x^y`)
    - Constants (`pi`, `e`)
  - `Section/Memory`
    - `M+`, `M-`, `MR`, `MC`

## 2. Scientific Panel

- `Page/Calculator-Scientific`
  - `Section/Trig`
    - `sin`, `cos`, `tan`
  - `Section/Logs`
    - `log`, `ln`
  - `Section/Exponents`
    - `x^y`, `e^x`
  - `Section/Roots`
    - `sqrt`, `n-th root`
  - `Section/Grouping`
    - `(`, `)`

## 3. History Drawer/Page

- `Page/Calculator-History`
  - `Section/Header`
    - History title
    - Clear history action
  - `Section/List`
    - Last 10 calculations
    - Expression and result
    - Optional timestamp
  - `Section/Actions`
    - Restore calculation into input

## 4. Optional Settings Page

- `Page/Calculator-Settings`
  - `Section/Theme`
    - Light and dark theme options
  - `Section/Angle`
    - Default degree/radian mode
  - `Section/Precision`
    - Decimal precision selector
  - `Section/Data`
    - Clear history
    - Reset memory

## 5. Responsive Variants

- `Page/Calculator-Mobile`
  - Vertical stack layout
  - Keypad prioritized near bottom
- `Page/Calculator-Tablet`
  - Split display + keypad layout
- `Page/Calculator-Desktop`
  - Full scientific keypad
  - Side-by-side history panel

## Layer Naming Convention

- `Page/<Name>`
- `Section/<Name>`
- `Component/<Name>`
- `State/<Default|Active|Error|Disabled>`
