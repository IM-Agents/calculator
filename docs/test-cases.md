# Functional Test Cases — Calculator Web Application

## Metadata

- **Source:** README.md, docs/requirements.md, docs/api-spec.md, docs/architecture.md
- **Stack:** React 18 (Vite), Node.js (Express), REST `/api/v1`
- **Coverage:** UI flows, keyboard input, responsive layout, calculation API, history & memory, validation & errors (TC-POS / TC-NEG / TC-EDGE / TC-LOG)

---

## Positive Test Cases

### TC-POS-001: Basic addition evaluates correctly

**Type:** UI | API  
**Priority:** High  
**Preconditions:**

- Backend running with `PORT=3001` (or matching Vite proxy target); frontend dev server or production build served.

**Test data:**

- `expression`: `12+5*3`
- `angleMode`: `deg`

**Steps:**

1. Open the calculator app in the browser.
2. Enter `12+5*3` via buttons or keyboard.
3. Press `=` or Enter.

**Expected result:**

- Response `success: true` with `result` numerically `27` and matching `formattedResult`.
- History panel shows an entry with expression `12+5*3` and result `27`.

---

### TC-POS-002: Trigonometry respects degree mode

**Type:** API | Business Logic  
**Priority:** High  
**Preconditions:**

- API reachable at `/api/v1/calculate`.

**Test data:**

- `expression`: `sin(90)`
- `angleMode`: `deg`

**Steps:**

1. `POST /api/v1/calculate` with the JSON body above.

**Expected result:**

- `success: true`, `result` equals `1` within floating-point tolerance.

---

### TC-POS-003: Trigonometry respects radian mode

**Type:** API | Business Logic  
**Priority:** High  
**Preconditions:**

- API reachable.

**Test data:**

- `expression`: `sin(pi/2)`
- `angleMode`: `rad`

**Steps:**

1. `POST /api/v1/calculate` with the JSON body above.

**Expected result:**

- `success: true`, `result` approximately `1`.

---

### TC-POS-004: Power operator is right-associative

**Type:** Business Logic  
**Priority:** Medium  
**Preconditions:**

- Parser accepts `^`.

**Test data:**

- `expression`: `2^3^2`

**Steps:**

1. Evaluate via UI or `POST /calculate`.

**Expected result:**

- `success: true`, `result` equals `512`.

---

### TC-POS-005: Square root of non-negative number

**Type:** UI | API  
**Priority:** High  
**Test data:**

- `expression`: `sqrt(16)`

**Steps:**

1. Tap √ (inserts `sqrt(`), complete `sqrt(16)`), evaluate.

**Expected result:**

- `success: true`, `result` equals `4`.

---

### TC-POS-006: Log base 10 and natural log

**Type:** API  
**Priority:** Medium  
**Test data:**

- `expression`: `log(100)`
- `expression`: `ln(e)`

**Steps:**

1. `POST /calculate` for each expression.

**Expected result:**

- `log(100)` → `2`; `ln(e)` → `1`.

---

### TC-POS-007: Constants pi and e tokenize correctly

**Type:** API  
**Priority:** Medium  
**Test data:**

- `expression`: `pi`
- `expression`: `e`

**Steps:**

1. Evaluate both via API.

**Expected result:**

- Both succeed with finite values matching `Math.PI` and `Math.E`.

---

### TC-POS-008: Memory add and recall

**Type:** UI | API  
**Priority:** High  
**Preconditions:**

- Fresh backend process (or known memory state).

**Test data:**

- Evaluate `5`, then `M+` with operand `5`; then `MR`.

**Steps:**

1. Evaluate `5`.
2. Press `M+`.
3. Clear display (`C`), press `MR`.

**Expected result:**

- `GET /memory` returns `memoryValue` of `5`.
- After `MR`, expression line shows `5`.

---

### TC-POS-009: History lists last successful calculations

**Type:** API  
**Priority:** Medium  
**Steps:**

1. Perform two successful evaluations via UI.
2. `GET /api/v1/history`.

**Expected result:**

- Up to `10` entries, newest first, each with `expression`, numeric `result`, ISO `createdAt`.

---

### TC-POS-010: Health check

**Type:** API  
**Priority:** Low  
**Steps:**

1. `GET /api/v1/health`.

**Expected result:**

- HTTP 200, JSON `success: true`, message indicates API running.

---

### TC-POS-011: Keyboard numeric and operator entry

**Type:** UI  
**Priority:** High  
**Steps:**

1. Focus page body (not an input).
2. Type `8`, `*`, `9`, Enter.

**Expected result:**

- Expression builds `8*9`, evaluation shows `72`.

---

### TC-POS-012: Toggle angle mode from UI

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Set mode to Rad, evaluate `sin(pi/2)`.
2. Switch to Deg, evaluate `sin(90)`.

**Expected result:**

- Both evaluations succeed with result near `1`.

---

### TC-POS-013: Percent converts trailing number

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Enter `50`, press `%`.

**Expected result:**

- Expression updates to `(50/100)` (or equivalent evaluated form); evaluating yields `0.5`.

---

### TC-POS-014: Parentheses alter precedence

**Type:** API  
**Priority:** High  
**Test data:**

- `(1+2)*3`

**Steps:**

1. Evaluate.

**Expected result:**

- `result` equals `9`.

---

## Negative Test Cases

### TC-NEG-001: Division by zero

**Type:** API  
**Priority:** High  
**Test data:**

- `10/0`

**Steps:**

1. `POST /calculate`.

**Expected result:**

- HTTP 400 or contract-defined error status; `success: false`, `error.code` `DIVIDE_BY_ZERO`, user-facing message present.

---

### TC-NEG-002: Square root of negative number

**Type:** API  
**Priority:** High  
**Test data:**

- `sqrt(-1)`

**Expected result:**

- `success: false`, `NEGATIVE_SQRT`.

---

### TC-NEG-003: Logarithm of non-positive value

**Type:** API  
**Priority:** High  
**Test data:**

- `log(0)`, `ln(-3)`

**Expected result:**

- Both fail with `INVALID_LOG_INPUT`.

---

### TC-NEG-004: Empty expression

**Type:** API | UI  
**Priority:** High  
**Steps:**

1. Clear expression; press `=` without input.

**Expected result:**

- API returns `EMPTY_INPUT` or validation failure; UI shows an error string (no crash).

---

### TC-NEG-005: Invalid angle mode

**Type:** API  
**Priority:** Medium  
**Test data:**

- Body includes `angleMode`: `grad`

**Steps:**

1. `POST /calculate` with valid expression.

**Expected result:**

- HTTP 400, `VALIDATION_ERROR`.

---

### TC-NEG-006: Non-string expression

**Type:** API  
**Priority:** Medium  
**Test data:**

- `expression`: `123` (number JSON type)

**Expected result:**

- HTTP 400 validation error.

---

### TC-NEG-007: Unsupported identifier

**Type:** API  
**Priority:** Medium  
**Test data:**

- `foo(1)`

**Expected result:**

- `UNSUPPORTED_OPERATION` or `INVALID_EXPRESSION` per implementation.

---

### TC-NEG-008: Malformed parentheses

**Type:** API  
**Priority:** Medium  
**Test data:**

- `(1+2`

**Expected result:**

- Evaluation fails with `INVALID_EXPRESSION`.

---

### TC-NEG-009: Duplicate decimal in one number literal

**Type:** API  
**Priority:** Medium  
**Test data:**

- `1..2`

**Expected result:**

- Tokenization fails; `INVALID_EXPRESSION`.

---

### TC-NEG-010: M+ without evaluable operand

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Enter `3+5` (do not evaluate), press `M+`.

**Expected result:**

- UI shows guidance error (no silent incorrect memory write).

---

### TC-NEG-011: History POST with invalid body

**Type:** API  
**Priority:** Low  
**Steps:**

1. `POST /history` missing `expression`.

**Expected result:**

- HTTP 400, validation error payload.

---

## Edge Test Cases

### TC-EDGE-001: History capped at 10 entries

**Type:** API  
**Priority:** Medium  
**Steps:**

1. Perform 11 distinct successful calculations.
2. `GET /history`.

**Expected result:**

- At most `10` entries returned.

---

### TC-EDGE-002: Very long expression rejected or bounded

**Type:** API  
**Priority:** Low  
**Test data:**

- String longer than parser limit (512 characters).

**Expected result:**

- Safe rejection (`INVALID_EXPRESSION` or validation), no crash.

---

### TC-EDGE-003: Unary minus with exponentiation

**Type:** Business Logic  
**Priority:** Medium  
**Test data:**

- `-5^2`

**Steps:**

1. Evaluate once; record outcome.

**Expected result:**

- Finite numeric answer (`25` with current parser: unary minus binds to `5` before the power, then squared). Behavior should remain stable across releases.

---

### TC-EDGE-004: Large finite magnitudes

**Type:** Business Logic  
**Priority:** Low  
**Test data:**

- `10^20`

**Steps:**

1. Evaluate.

**Expected result:**

- `success: true` with finite display formatting OR graceful non-success without server crash.

---

### TC-EDGE-005: Mobile viewport layout

**Type:** UI  
**Priority:** High  
**Steps:**

1. Resize viewport to ~390×844.
2. Verify keypad tap targets and readable display.

**Expected result:**

- No horizontal overflow; history stacks below main panel per responsive layout.

---

### TC-EDGE-006: Tablet / desktop split layout

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Widen viewport beyond layout breakpoint (~900px).

**Expected result:**

- History appears beside calculator panel.

---

### TC-EDGE-007: Clear and backspace after error

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Provoke an error (e.g. `sqrt(-1)`).
2. Press `C`, enter `2+2`, evaluate.

**Expected result:**

- Error clears; new calculation succeeds.

---

### TC-EDGE-008: DELETE `/history` clears list

**Type:** API | UI  
**Priority:** Medium  
**Steps:**

1. Add entries; click History **Clear** or call `DELETE /history`.
2. `GET /history`.

**Expected result:**

- Empty `data` array.

---

## Logical / Workflow Test Cases

### TC-LOG-001: Evaluate → digit starts fresh expression

**Type:** UI  
**Priority:** High  
**Steps:**

1. Evaluate `4+4` → `8`.
2. Press `3`.

**Expected result:**

- Expression resets to `3` (not appending to prior expression).

---

### TC-LOG-002: Operator after result continues chain

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Evaluate `9` → shows result `9`.
2. Press `+`, `1`, `=`.

**Expected result:**

- Final evaluation succeeds (builder allows continuing from result).

---

### TC-LOG-003: MC resets memory

**Type:** API workflow  
**Priority:** Medium  
**Steps:**

1. `M+` after evaluating `7`.
2. `POST /memory` with `MC`.
3. `GET /memory`.

**Expected result:**

- `memoryValue` is `0`.

---

### TC-LOG-004: MR loads memory into workspace

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Store non-zero memory via `M+`.
2. Clear, press `MR`, evaluate.

**Expected result:**

- Result equals stored memory.

---

### TC-LOG-005: Angle mode toggle mid-session

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. With Deg active, evaluate `cos(0)` → `1`.
2. Switch to Rad, evaluate `cos(0)` → `1`.

**Expected result:**

- Both succeed; mode label reflects selection.

---

### TC-LOG-006: Concurrent evaluate requests (stress)

**Type:** API  
**Priority:** Low  
**Steps:**

1. Fire two rapid `POST /calculate` calls with different bodies.

**Expected result:**

- Both return coherent JSON; no process crash.

---

### TC-LOG-007: Frontend offline handling

**Type:** UI  
**Priority:** Medium  
**Preconditions:**

- Stop backend.

**Steps:**

1. Attempt evaluation.

**Expected result:**

- UI shows connectivity message (`Unable to reach the calculator service.`).

---

### TC-LOG-008: Percent then arithmetic

**Type:** UI  
**Priority:** Low  
**Steps:**

1. Enter `100*50`, press `%`, complete expression as `100*(50/100)` pattern, evaluate.

**Expected result:**

- Result `50`.

---

## Notes for automation

- Prefer stable selectors: `data-testid` on `display-expression` and `display-result`.
- API tests can run with Supertest against `app` export if refactored for tests; current server binds in `app.js` listener.
