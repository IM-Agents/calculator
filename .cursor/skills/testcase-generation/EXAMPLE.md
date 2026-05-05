# Login Test Cases

## Metadata
- **Requirement:** Login with email + password. Lockout after 5 failed attempts.
- **Stack:** React + REST API

---

## Positive Cases

### TC-POS-001: Login with valid credentials

**Type:** UI  
**Priority:** High  
**Preconditions:** Test user `user@test.com` / `Pass123!` exists

**Test data:**
- email: `user@test.com`
- password: `Pass123!`

**Steps:**
1. Navigate to `/login`
2. Fill email
3. Fill password
4. Click Sign In

**Expected result:**
- Redirect to `/dashboard`
- Auth token in localStorage
- User name visible

**Automation mapping:**
- **Layer:** UI
- **Entry:** `${BASE_URL}/login`
- **Actions:** `page.goto("/login")`, `page.fill("[name='email']", "user@test.com")`, `page.fill("[name='password']", "Pass123!")`, `page.click("button[type='submit']")`
- **Assertions:** `page.url()` contains `/dashboard`, `localStorage.getItem('auth_token')` exists

---

### TC-POS-002: Case-insensitive email

**Type:** UI  
**Priority:** Medium  

**Test data:**
- email: `USER@TEST.COM`
- password: `Pass123!`

**Steps:**
1. Navigate to `/login`
2. Fill uppercase email
3. Fill password
4. Click Sign In

**Expected result:**
- Login succeeds
- Redirect to `/dashboard`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/login`
- **Actions:** POST with uppercase email
- **Assertions:** Status 200, response contains token

---

## Negative Cases

### TC-NEG-001: Wrong password

**Type:** UI  
**Priority:** High  

**Test data:**
- email: `user@test.com`
- password: `Wrong123!`

**Steps:**
1. Navigate to `/login`
2. Fill correct email, wrong password
3. Click Sign In

**Expected result:**
- Stay on `/login`
- Error message: "Invalid email or password"
- No token stored

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/login`
- **Actions:** POST with wrong password
- **Assertions:** Status 401, error response

---

### TC-NEG-002: Empty email

**Type:** Functional  
**Priority:** Medium  

**Test data:**
- email: `` (empty)
- password: `Pass123!`

**Steps:**
1. Leave email empty
2. Fill password
3. Click Sign In

**Expected result:**
- Validation error: "Email required"
- Form not submitted

**Automation mapping:**
- **Layer:** UI
- **Entry:** `/login` form
- **Actions:** Leave email blank, click submit
- **Assertions:** Validation error visible

---

### TC-NEG-003: Account locked after 5 failures

**Type:** Logical  
**Priority:** High  
**Preconditions:** User has 4 failed attempts

**Test data:**
- 5th attempt: wrong password
- 6th attempt: correct password

**Steps:**
1. Attempt with wrong password (5th)
2. Attempt with correct password

**Expected result:**
- 5th: "Invalid email or password"
- 6th: "Account locked for 15 minutes"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/login`
- **Actions:** 5 requests wrong password, then 1 correct
- **Assertions:** 5th: 401, 6th: 429/403 with "locked"

---

## Edge Cases

### TC-EDGE-001: Password minimum length (8 chars)

**Type:** Functional  
**Priority:** Medium  

**Test data:**
- password: `Pass1234` (exactly 8 chars)

**Steps:**
1. Navigate to `/login`
2. Fill email + 8-char password
3. Click Sign In

**Expected result:**
- Login succeeds

**Automation mapping:**
- **Layer:** UI
- **Entry:** `/login`
- **Assertions:** Redirect to `/dashboard`

---

### TC-EDGE-002: Special characters in password

**Type:** Functional  
**Priority:** Low  

**Test data:**
- password: `P@$$w0rd!`

**Steps:**
1. Log in with special char password

**Expected result:**
- Login succeeds

**Automation mapping:**
- **Layer:** API
- **Assertions:** Status 200, token issued

---

## Logical Cases

### TC-LOG-001: Session persists across refresh

**Type:** Workflow  
**Priority:** High  
**Preconditions:** User logged in

**Steps:**
1. Log in successfully
2. Refresh page
3. Verify dashboard accessible

**Expected result:**
- Dashboard loads (no redirect)
- User name visible

**Automation mapping:**
- **Layer:** UI
- **Actions:** `page.reload()`
- **Assertions:** `page.url()` contains `/dashboard`

---

### TC-LOG-002: Failed attempts reset after success

**Type:** Logical  
**Priority:** Medium  
**Preconditions:** User has 3 failed attempts

**Steps:**
1. Log in successfully
2. Fail login 5 more times

**Expected result:**
- Successful login resets counter
- 5 new failures doesn't lock (needs 5 total)

**Automation mapping:**
- **Layer:** API
- **Actions:** Success, then 5 failed attempts
- **Assertions:** After success: counter reset, 6th attempt still fails with 401

---

_Generated using Cursor skill **testcase-generation** · **File:** `login-test-cases.md`_
