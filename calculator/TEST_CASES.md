# Functional Test Cases

## Metadata

- **Source:** `README.md`, `docs/02-functional-specification.md`, `docs/06-api-specification.md`
- **Stack:** React 18 + Vite frontend, Express backend (`calculator/`)
- **Coverage:** REST calculator/history APIs, expression parsing/evaluation, UI keypad/memory/history/DEG-RAD/keyboard

## Positive Test Cases

### TC-POS-001: Basic addition evaluates correctly

**Type:** API  
**Priority:** High  

**Preconditions:**

- Backend running with empty history

**Test data:**

- `expression`: `12+30`
- `angleMode`: `DEG`

**Steps:**

1. Send `POST /api/calculate` with JSON body `expression`, `angleMode`.

**Expected result:**

- HTTP `200`
- `success` is `true`
- `data.result` equals `42`
- Response includes `data.historyItem` with matching expression and result ISO timestamp

### TC-POS-002: Operator precedence applies multiplication before addition

**Type:** Business Logic | API  
**Priority:** High  

**Preconditions:**

- Backend running

**Test data:**

- `expression`: `2+3*4`

**Steps:**

1. `POST /api/calculate` with expression.

**Expected result:**

- `data.result` equals `14`

### TC-POS-003: Right-associative exponent chains evaluate correctly

**Type:** Business Logic | API  
**Priority:** Medium  

**Test data:**

- `expression`: `2^3^2`

**Steps:**

1. Evaluate via API.

**Expected result:**

- `data.result` equals `512`

### TC-POS-004: Degree trig evaluates sine example from API doc

**Type:** API  
**Priority:** High  

**Test data:**

- `expression`: `sin(30)+5^2`
- `angleMode`: `DEG`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- `data.result` equals `25.5`

### TC-POS-005: Postfix percentage applies after preceding primary within multiplication

**Type:** Business Logic | API  
**Priority:** Medium  

**Test data:**

- `expression`: `10*50%`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- `data.result` equals `5`

### TC-POS-006: Square root of positive integer succeeds

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `sqrt(16)`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- `data.result` equals `4`

### TC-POS-007: Natural log and base-10 log accept positive arguments

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `ln(2.718281828459045)` and separately `log(100)`

**Steps:**

1. Evaluate each expression via API.

**Expected result:**

- Both responses succeed with values approximately `1` within tolerance for ln expression

### TC-POS-008: Constants `pi` and `e` tokenize and evaluate

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `pi+e`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- Success response with finite numeric `result`

### TC-POS-009: Parentheses override precedence

**Type:** Business Logic | API  
**Priority:** High  

**Test data:**

- `expression`: `(2+3)*4`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- `data.result` equals `20`

### TC-POS-010: Unary minus interacts correctly with literals

**Type:** Business Logic | API  
**Priority:** Medium  

**Test data:**

- `expression`: `-5+10`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- `data.result` equals `5`

### TC-POS-011: GET history returns last evaluations capped at ten entries

**Type:** API  
**Priority:** High  

**Preconditions:**

- Backend freshly cleared (`DELETE /api/history`)

**Steps:**

1. Submit more than ten distinct successful calculations sequentially via `POST /api/calculate`.
2. Send `GET /api/history`.

**Expected result:**

- HTTP `200`
- `data.items.length` is `10`
- Most recent evaluation appears first in `items`

### TC-POS-012: DELETE history clears rolling memory buffer for subsequent reads

**Type:** API  
**Priority:** Medium  

**Steps:**

1. Perform at least one successful calculation.
2. `DELETE /api/history`.
3. `GET /api/history`.

**Expected result:**

- Second step returns `cleared: true`
- Third step returns empty `items`

### TC-POS-013: UI evaluates expression via equals and displays numeric result

**Type:** UI  
**Priority:** High  

**Preconditions:**

- Frontend (`npm run dev`) with backend (`npm run dev` for API) running

**Steps:**

1. Click digit buttons forming `8`, `/`, `2`.
2. Activate equals (`=`).

**Expected result:**

- Primary display shows `4`
- Expression line reflects normalized expression returned by API

### TC-POS-014: Mode toggle sends RAD versus DEG correctly for trig evaluation

**Type:** UI  
**Priority:** High  

**Steps:**

1. With expression `sin(30)`, toggle `RAD`, evaluate.
2. Toggle `DEG`, evaluate again.

**Expected result:**

- RAD evaluation differs from DEG evaluation when comparing numeric outputs

### TC-POS-015: Memory recall inserts numeric glue when preceded by digit or closing parenthesis

**Type:** UI  
**Priority:** Medium  

**Preconditions:**

- Memory seeded via prior successful evaluation

**Steps:**

1. Evaluate `5`.
2. Press `M+`.
3. Append `2` then press `MR`.

**Expected result:**

- Expression becomes `2` multiplied implicitly or prefixed consistent with glue logic (`2` followed by memory token without illegal concatenation)

### TC-POS-016: History chip click repopulates editable expression

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Evaluate multiple expressions successfully.
2. Click first history row item.

**Expected result:**

- Expression field equals stored expression string from history entry

### TC-POS-017: Keyboard digits operators Enter Backspace mirror keypad behavior

**Type:** UI  
**Priority:** High  

**Steps:**

1. Focus document body (outside inputs).
2. Type `3`, `*`, `4`, Enter.
3. Press Backspace twice on fresh expression build.

**Expected result:**

- First evaluation yields `12`
- Backspace removes trailing characters when editing new expression

### TC-POS-018: Auto-balancing closes unmatched parentheses before submission

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Build expression `sin(30` missing closing parenthesis.
2. Evaluate.

**Expected result:**

- Request succeeds by balancing parentheses prior to POST body submission

## Negative Test Cases

### TC-NEG-001: Missing expression field rejected with structured error

**Type:** API  
**Priority:** High  

**Steps:**

1. `POST /api/calculate` with `{}`.

**Expected result:**

- HTTP `400`
- `success` is `false`
- `error.code` signals invalid payload (`INVALID_EXPRESSION`)

### TC-NEG-002: Non-string expression rejected

**Type:** API  
**Priority:** Medium  

**Steps:**

1. `POST /api/calculate` with `"expression": 123`.

**Expected result:**

- HTTP `400`

### TC-NEG-003: Invalid angle mode rejected before evaluation

**Type:** API  
**Priority:** Medium  

**Test data:**

- `angleMode`: `GRAD`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- HTTP `400`

### TC-NEG-004: Empty trimmed expression rejected as EMPTY_EXPRESSION

**Type:** API  
**Priority:** High  

**Steps:**

1. `POST /api/calculate` with `"expression": "   "`.

**Expected result:**

- HTTP `400`
- Error code `EMPTY_EXPRESSION`

### TC-NEG-005: Allowlist rejects unknown identifiers

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `foo(1)`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- HTTP `400`
- `INVALID_EXPRESSION`

### TC-NEG-006: Division by zero surfaces DIVISION_BY_ZERO

**Type:** API  
**Priority:** High  

**Test data:**

- `expression`: `1/(5-5)`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- HTTP `422`
- `error.code` equals `DIVISION_BY_ZERO`

### TC-NEG-007: Square root of negative returns NEGATIVE_SQRT

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `sqrt(-1)`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- HTTP `422`
- `NEGATIVE_SQRT`

### TC-NEG-008: Logarithm domain violations return INVALID_LOG_INPUT

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `ln(0)`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- HTTP `422`
- `INVALID_LOG_INPUT`

### TC-NEG-009: Tan undefined at ninety degrees flagged UNSUPPORTED_OPERATION

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `tan(90)`
- `angleMode`: `DEG`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- HTTP `422`
- `UNSUPPORTED_OPERATION`

### TC-NEG-010: Unevaluable leftover tokens trigger INVALID_EXPRESSION

**Type:** API  
**Priority:** Medium  

**Test data:**

- `expression`: `1 1`

**Steps:**

1. Attempt evaluation.

**Expected result:**

- HTTP `400`

### TC-NEG-011: Frontend surfaces API error payload without crashing view

**Type:** UI  
**Priority:** High  

**Steps:**

1. Submit invalid expression via equals when backend reachable.

**Expected result:**

- Error banner text references backend message and code parenthetically

### TC-NEG-012: Memory operations skip updates when no numeric result exists after error

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Trigger evaluation error state without successful result.
2. Attempt `M+`.

**Expected result:**

- Memory remains unchanged

### TC-NEG-013: Equals with blank expression does nothing destructive

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Clear UI (`AC`).
2. Press equals.

**Expected result:**

- No network request fired for evaluation

## Edge Cases

### TC-EDGE-001: Leading unary plus parses numbers correctly

**Type:** Business Logic | API  
**Priority:** Low  

**Test data:**

- `expression`: `+7`

**Steps:**

1. Evaluate via API.

**Expected result:**

- `data.result` equals `7`

### TC-EDGE-002: Repeated binary operators normalize via replacement rule on keypad

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Press `+` twice after entering `5`.

**Expected result:**

- Expression retains single trailing operator without duplicated symbols

### TC-EDGE-003: Decimal guard prevents duplicate dots inside active literal

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Enter `3..`

**Expected result:**

- Only one decimal separator accepted within token

### TC-EDGE-004: Very large magnitude numbers remain finite or degrade gracefully

**Type:** API  
**Priority:** Low  

**Test data:**

- `expression`: `10^20`

**Steps:**

1. Evaluate via API.

**Expected result:**

- HTTP success with finite numeric output or documented overflow handling without stack traces leaking

### TC-EDGE-005: Expression consisting solely of balanced parentheses fails validation

**Type:** API  
**Priority:** Low  

**Test data:**

- `expression`: `()`

**Steps:**

1. `POST /api/calculate`.

**Expected result:**

- HTTP `400`

### TC-EDGE-006: Case-insensitive identifiers normalize safely

**Type:** API  
**Priority:** Low  

**Test data:**

- `expression`: `PI+Pi`

**Steps:**

1. Evaluate.

**Expected result:**

- Treats identifiers according to tokenizer normalization rules without collision errors

### TC-EDGE-007: Keyboard Escape clears expression state similarly to AC button

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Enter digits.
2. Press Escape.

**Expected result:**

- Expression cleared and error banner cleared

### TC-EDGE-008: History panel empty state messaging renders accessible text

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Load UI before any successful evaluations.

**Expected result:**

- History lists helper copy describing absence of items

## Logical Validation Cases

### TC-LOG-001: Evaluate-store-evaluate workflow mirrors backend rolling history ordering

**Type:** Business Logic | API  
**Priority:** High  

**Steps:**

1. Evaluate `1+1`.
2. Immediately evaluate `2+2`.
3. Fetch history.

**Expected result:**

- Latest expression appears before older expression with capped length honored

### TC-LOG-002: Clearing UI does not wipe backend history until explicit DELETE control run

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Evaluate successfully.
2. Press `AC`.
3. Refresh history panel via reload.

**Expected result:**

- History retains prior successful calculations until server delete invoked

### TC-LOG-003: Sequential evaluations reuse updated angle mode automatically

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Evaluate trig expression in `DEG`.
2. Toggle `RAD` without clearing expression string where applicable.
3. Re-evaluate equivalent trig expression.

**Expected result:**

- Second network payload sends updated `angleMode`

### TC-LOG-004: MR recall after MC restores zero semantics

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Store memory via `M+`.
2. Clear memory via `MC`.
3. Attempt `MR`.

**Expected result:**

- Recalled value behaves as zero insertion rules dictate without stale nonzero leakage

### TC-LOG-005: Busy state prevents duplicate overlapping submissions

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Simulate slow network (throttle) if possible.
2. Rapidly trigger equals twice.

**Expected result:**

- Only one evaluation request active until completion flag resets

### TC-LOG-006: Responsive layout stacks history beneath keypad on narrow breakpoints

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Resize viewport below desktop breakpoint.

**Expected result:**

- Calculator shell stacks vertically without horizontal clipping or unreachable controls

### TC-LOG-007: Focus-visible outlines appear on interactive controls for keyboard users

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Tab through toggles and keypad buttons.

**Expected result:**

- Visible focus ring contrast satisfies accessibility guidance from functional spec

### TC-LOG-008: Sign toggle alternates trailing numeric literal polarity

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Enter `42`.
2. Press `±` twice.

**Expected result:**

- Expression returns to positive `42` after second toggle

---

_Generated using Cursor skill **testcase-generation** · **File:** `TEST_CASES.md`_
