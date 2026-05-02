# Frontend Architecture

## 1. Frontend Stack
- React 18
- Plain CSS or CSS Modules (preferred for scoped maintainability)
- Fetch/Axios for backend API communication
- Minimal dependencies only

## 2. Frontend Responsibilities
- Render calculator display and controls
- Capture button and keyboard input
- Maintain transient UI state
- Trigger backend calculation requests
- Render history and errors
- Handle responsive behavior for mobile, tablet, and desktop

## 3. Suggested Component Structure
```text
client/src/
├─ App.jsx
├─ components/
│  ├─ CalculatorShell.jsx
│  ├─ DisplayPanel.jsx
│  ├─ Keypad.jsx
│  ├─ Button.jsx
│  ├─ ScientificPad.jsx
│  ├─ MemoryControls.jsx
│  ├─ ModeToggle.jsx
│  └─ HistoryPanel.jsx
├─ hooks/
│  ├─ useCalculatorState.js
│  ├─ useKeyboardInput.js
│  └─ useHistory.js
├─ services/
│  └─ calculatorApi.js
├─ utils/
│  ├─ inputSanitizer.js
│  ├─ formatter.js
│  └─ constants.js
└─ styles/
   ├─ app.css
   ├─ calculator.css
   └─ responsive.css
```

## 4. Suggested State Design
```js
{
  currentInput: '',
  displayValue: '0',
  angleMode: 'deg',
  memoryValue: 0,
  history: [],
  error: null,
  isResultShown: false
}
```

## 5. Interaction Flow
1. User clicks a button or presses a key
2. Input hook validates and normalizes action
3. UI updates the local expression/input state
4. On evaluate or function execution, frontend sends structured payload to backend
5. Backend returns result or error
6. Frontend updates display and prepends/appends to history

## 6. Responsive Layout Guidance
### Mobile
- Single-column calculator layout
- History panel below calculator or collapsed in drawer
- Larger touch targets

### Tablet
- Two-region layout if space allows
- Button sizes optimized for touch and pointer usage

### Desktop
- Full calculator panel with persistent side history
- Larger display and better spacing for scientific keys

## 7. UX Rules
- Operators must be visually distinct from numeric buttons
- Scientific keys grouped logically
- Active angle mode must be highlighted
- Error state should replace ambiguous outputs with a clear message
- Hover and active states should feel responsive but lightweight

## 8. Accessibility Notes
- Use button elements, not clickable divs
- Add `aria-label` for scientific operations
- Support tab navigation and Enter/Space activation
- Ensure focus outline remains visible

## 9. Frontend Validation Rules
- Prevent malformed decimal input before API call when possible
- Prevent obvious double-operator issues
- Preserve user intent for negative values and chaining
- Never silently produce impossible scientific outputs
