# Functional Test Cases

## Metadata
- **Source:** `README.md` + docs specifications for calculator app
- **Stack:** React 18 + Vite, Node.js + Express, REST API
- **Coverage:** API evaluation, math guards, history/session behavior, frontend shell rendering

## Positive Test Cases

### TC-POS-001: Evaluate arithmetic expression
**Type:** API  
**Priority:** High  
**Preconditions:**
- Backend server running

**Test data:**
- `expression`: `2+3*4`
- `angleMode`: `DEG`

**Steps:**
1. Send `POST /api/calculate` with valid payload.
2. Read response body.

**Expected result:**
- HTTP status `200`
- `success` is `true`
- `result` equals `14`

### TC-POS-002: History retrieval in same session
**Type:** API  
**Priority:** High  
**Preconditions:**
- Session cookie exists from previous calculate call

**Test data:**
- Two valid expressions: `10/2`, `5+5`

**Steps:**
1. Send two `POST /api/calculate` requests using same session.
2. Send `GET /api/history`.

**Expected result:**
- Response contains 2 items
- Latest calculation appears first

### TC-POS-003: Frontend renders calculator controls
**Type:** UI  
**Priority:** Medium  
**Preconditions:**
- Frontend test runner configured

**Test data:**
- Mocked history API response

**Steps:**
1. Render `Calculator` component.
2. Locate `History`, `DEG`, `RAD` controls.

**Expected result:**
- All controls render without errors

## Negative Test Cases

### TC-NEG-001: Reject blank expression
**Type:** API  
**Priority:** High  
**Preconditions:**
- Backend server running

**Test data:**
- `expression`: whitespace string

**Steps:**
1. Send `POST /api/calculate` with whitespace expression.

**Expected result:**
- HTTP status `400`
- Error code `EMPTY_EXPRESSION`

### TC-NEG-002: Reject negative square root
**Type:** API  
**Priority:** High  
**Preconditions:**
- Backend server running

**Test data:**
- `expression`: `sqrt(-1)`

**Steps:**
1. Send `POST /api/calculate`.

**Expected result:**
- HTTP status `422`
- Error code `NEGATIVE_SQRT`

## Edge Cases

### TC-EDGE-001: History cap at 10 items
**Type:** API  
**Priority:** Medium  
**Preconditions:**
- Same active session for repeated calls

**Test data:**
- 12 valid expressions

**Steps:**
1. Submit 12 valid calculate calls.
2. Fetch history.

**Expected result:**
- History length is exactly 10
- Oldest 2 items are dropped

### TC-EDGE-002: Degree vs radian trig difference
**Type:** API  
**Priority:** Medium  
**Preconditions:**
- Backend server running

**Test data:**
- `expression`: `sin(30)` in `DEG`
- `expression`: `sin(30)` in `RAD`

**Steps:**
1. Send first request with `DEG`.
2. Send second request with `RAD`.

**Expected result:**
- DEG result is close to `0.5`
- RAD result differs from DEG output

## Logical Validation Cases

### TC-LOG-001: Clear history flow
**Type:** API  
**Priority:** Medium  
**Preconditions:**
- History has at least one item

**Test data:**
- Existing history items in session

**Steps:**
1. Call `DELETE /api/history`.
2. Call `GET /api/history`.

**Expected result:**
- Clear response includes `cleared: true`
- Follow-up history list is empty

### TC-LOG-002: Memory update should require numeric result
**Type:** UI  
**Priority:** Medium  
**Preconditions:**
- Frontend rendered

**Test data:**
- Error state on calculator display

**Steps:**
1. Trigger invalid evaluation to create error state.
2. Press `M+` or `M-`.

**Expected result:**
- Memory value remains unchanged

---

_Generated using Cursor skill **testcase-generation** · **File:** `TEST_CASES.md`_
