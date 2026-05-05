## Calculator Test Cases

### TC-POS-001: Evaluate arithmetic expression
**Type:** API  
**Priority:** High

**Preconditions:**
- Backend app is running in test mode
- HTTP client supports cookie persistence

**Test data:**
- `expression`: `2+3*4`
- `angleMode`: `DEG`

**Steps:**
1. Send `POST /api/calculate` with expression payload.
2. Send `GET /api/history` with the same session cookie.

**Expected result:**
- API returns `200` with `result = 14`.
- History returns one item containing expression `2+3*4`.

**Automation mapping:**
- **Layer:** API
- **Entry:** `/api/calculate`, `/api/history`
- **Actions:** POST expression then GET history with same cookie jar
- **Assertions:** status is `200`, numeric result is `14`, history length is `1`

### TC-NEG-001: Reject blank expression
**Type:** API  
**Priority:** High

**Preconditions:**
- Backend app is running

**Test data:**
- `expression`: `"   "`

**Steps:**
1. Send `POST /api/calculate` with whitespace-only expression.

**Expected result:**
- API returns `400`.
- Response body has `code = EMPTY_EXPRESSION`.

**Automation mapping:**
- **Layer:** API
- **Entry:** `/api/calculate`
- **Actions:** POST blank expression payload
- **Assertions:** status is `400`, error code equals `EMPTY_EXPRESSION`

### TC-EDGE-001: Keep history capped at 10
**Type:** Workflow  
**Priority:** Medium

**Preconditions:**
- Backend app is running
- Client keeps one calculator session

**Test data:**
- `expressions`: `1+1` ... `11+11`

**Steps:**
1. Submit 11 valid calculations using one session cookie.
2. Request `GET /api/history`.

**Expected result:**
- History length is exactly 10.
- Most recent item is the 11th calculation.

**Automation mapping:**
- **Layer:** API
- **Entry:** `/api/calculate`, `/api/history`
- **Actions:** loop 11 POST calls and fetch history
- **Assertions:** history length equals `10`, index `0` is latest expression

### TC-EDGE-002: UI selectors remain deterministic with duplicate labels
**Type:** UI  
**Priority:** Medium

**Preconditions:**
- Frontend test environment uses React Testing Library + Vitest
- Calculator is rendered once per test case

**Test data:**
- `buttonLabel`: `2`

**Steps:**
1. Query all buttons using role `button` and accessible name `2`.
2. Click one deterministic index from the returned list.
3. Continue expression input using role-based selectors.

**Expected result:**
- Test does not fail with "multiple elements found" selector errors.
- Click sequence produces stable calculator input behavior.

**Automation mapping:**
- **Layer:** UI
- **Entry:** `frontend/src/App.test.jsx`
- **Actions:** use `getAllByRole` for duplicate labels, click indexed button
- **Assertions:** no selector ambiguity errors, display updates as expected

### TC-LOG-001: DEG mode trig behavior
**Type:** Business Logic  
**Priority:** Medium

**Preconditions:**
- Backend app is running

**Test data:**
- `expression`: `sin(90)`
- `angleMode`: `DEG`

**Steps:**
1. Send `POST /api/calculate` with trig expression and DEG mode.

**Expected result:**
- API returns `200`.
- Result rounds to `1`.

**Automation mapping:**
- **Layer:** API
- **Entry:** `/api/calculate`
- **Actions:** POST trig expression with angle mode
- **Assertions:** status is `200`, rounded result equals `1`

---
_Generated using Cursor skill **testcase-generation** · **File:** `calculator-test-cases.md`_
