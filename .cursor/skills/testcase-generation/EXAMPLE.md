# User Registration Test Cases

## Metadata
- **Requirement:** User registration with email validation, password strength, duplicate account prevention, email verification, and role assignment.
- **Stack:** React SPA + REST API

---

## Positive Cases

### TC-POS-001: Valid registration with all required fields

**Type:** API  
**Priority:** High  
**Preconditions:** Database empty, email service mocked

**Test data:**
- email: `"john@example.com"`
- password: `"SecurePass123!"`
- firstName: `"John"`
- lastName: `"Doe"`

**Steps:**
1. POST `/api/auth/register` with valid data
2. Verify response status

**Expected result:**
- HTTP 201 Created
- Response contains `id`, `email`, `firstName`, `lastName`
- User created in database
- Verification email queued

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch('http://localhost:3000/api/auth/register', { method: 'POST', body: JSON.stringify({ email: 'john@example.com', password: 'SecurePass123!', firstName: 'John', lastName: 'Doe' }) })`
- **Assertions:** `status === 201`, `body.id` exists, `body.email === 'john@example.com'`

---

### TC-POS-002: Valid registration with special characters in name

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"marie.dupont@example.com"`
- password: `"StrongPass456!"`
- firstName: `"Marie-Anne"`
- lastName: `"O'Brien"`

**Steps:**
1. POST `/api/auth/register` with special characters in names

**Expected result:**
- HTTP 201 Created
- Names stored correctly with special characters

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { firstName: 'Marie-Anne', lastName: 'O'Brien' })`
- **Assertions:** `status === 201`, `body.firstName === 'Marie-Anne'`, `body.lastName === 'O'Brien'`

---

### TC-POS-003: Valid registration with minimum password length (8 chars)

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"user@test.com"`
- password: `"Pass1234"` (exactly 8 characters)
- firstName: `"Min"`
- lastName: `"Pass"`

**Steps:**
1. POST `/api/auth/register` with minimum length password

**Expected result:**
- HTTP 201 Created
- User registered successfully

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'Pass1234' })`
- **Assertions:** `status === 201`, `body.id` exists

---

### TC-POS-004: Valid registration with maximum password length (128 chars)

**Type:** API  
**Priority:** Low  

**Test data:**
- email: `"user@example.com"`
- password: `"P@$$w0rd!" + "x" * 119` (128 chars total)
- firstName: `"Max"`
- lastName: `"Pass"`

**Steps:**
1. POST `/api/auth/register` with maximum length password

**Expected result:**
- HTTP 201 Created
- Long password accepted and hashed

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: longPassword })`
- **Assertions:** `status === 201`, password hashed in database

---

### TC-POS-005: Valid registration with uppercase and lowercase letters

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"alex@example.com"`
- password: `"TestPassword123!"`
- firstName: `"Alex"`
- lastName: `"Smith"`

**Steps:**
1. POST `/api/auth/register` with mixed case password

**Expected result:**
- HTTP 201 Created
- Password validation passes

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'TestPassword123!' })`
- **Assertions:** `status === 201`, `body.id` exists

---

### TC-POS-006: Valid registration with numbers in password

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"numeric@example.com"`
- password: `"Password2024!"`
- firstName: `"Num"`
- lastName: `"User"`

**Steps:**
1. POST `/api/auth/register` with numbers in password

**Expected result:**
- HTTP 201 Created
- Numbers accepted in password

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'Password2024!' })`
- **Assertions:** `status === 201`

---

### TC-POS-007: Valid registration with special characters in password

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"special@example.com"`
- password: `"Pass@word#123$%"`
- firstName: `"Spec"`
- lastName: `"Char"`

**Steps:**
1. POST `/api/auth/register` with special characters in password

**Expected result:**
- HTTP 201 Created
- Special characters (@#$%) accepted

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'Pass@word#123$%' })`
- **Assertions:** `status === 201`, `body.id` exists

---

### TC-POS-008: Case-insensitive email registration

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"USER@EXAMPLE.COM"` (uppercase)
- password: `"ValidPass123!"`
- firstName: `"Case"`
- lastName: `"Test"`

**Steps:**
1. POST `/api/auth/register` with uppercase email

**Expected result:**
- HTTP 201 Created
- Email stored in lowercase

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'USER@EXAMPLE.COM' })`
- **Assertions:** `status === 201`, `body.email === 'user@example.com'`

---

## Negative Cases

### TC-NEG-001: Missing email field

**Type:** API  
**Priority:** High  

**Test data:**
- body: `{ password: "Pass123!", firstName: "John", lastName: "Doe" }` (no email)

**Steps:**
1. POST `/api/auth/register` without email

**Expected result:**
- HTTP 400 Bad Request
- Error code: `MISSING_EMAIL` or `INVALID_REQUEST`
- No user created

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'Pass123!', firstName: 'John', lastName: 'Doe' })`
- **Assertions:** `status === 400`, `body.error === 'MISSING_EMAIL'`

---

### TC-NEG-002: Missing password field

**Type:** API  
**Priority:** High  

**Test data:**
- body: `{ email: "user@example.com", firstName: "John", lastName: "Doe" }` (no password)

**Steps:**
1. POST `/api/auth/register` without password

**Expected result:**
- HTTP 400 Bad Request
- Error code: `MISSING_PASSWORD`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'user@example.com', firstName: 'John', lastName: 'Doe' })`
- **Assertions:** `status === 400`, `body.error === 'MISSING_PASSWORD'`

---

### TC-NEG-003: Invalid email format (missing @)

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"userexample.com"` (no @ symbol)
- password: `"Pass123!"`
- firstName: `"Invalid"`
- lastName: `"Email"`

**Steps:**
1. POST `/api/auth/register` with invalid email format

**Expected result:**
- HTTP 400 Bad Request
- Error code: `INVALID_EMAIL_FORMAT`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'userexample.com' })`
- **Assertions:** `status === 400`, `body.error === 'INVALID_EMAIL_FORMAT'`

---

### TC-NEG-004: Invalid email format (missing domain)

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"user@"` (no domain)
- password: `"Pass123!"`
- firstName: `"No"`
- lastName: `"Domain"`

**Steps:**
1. POST `/api/auth/register` with incomplete email

**Expected result:**
- HTTP 400 Bad Request
- Error code: `INVALID_EMAIL_FORMAT`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'user@' })`
- **Assertions:** `status === 400`, `body.error === 'INVALID_EMAIL_FORMAT'`

---

### TC-NEG-005: Invalid email format (multiple @ symbols)

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"user@@example.com"`
- password: `"Pass123!"`
- firstName: `"Multi"`
- lastName: `"At"`

**Steps:**
1. POST `/api/auth/register` with multiple @ symbols

**Expected result:**
- HTTP 400 Bad Request
- Error code: `INVALID_EMAIL_FORMAT`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'user@@example.com' })`
- **Assertions:** `status === 400`

---

### TC-NEG-006: Password too short (7 characters)

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"short@example.com"`
- password: `"Pass12!"` (7 chars)
- firstName: `"Short"`
- lastName: `"Pass"`

**Steps:**
1. POST `/api/auth/register` with password below minimum length

**Expected result:**
- HTTP 400 Bad Request
- Error code: `PASSWORD_TOO_SHORT`
- Message: "Password must be at least 8 characters"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'Pass12!' })`
- **Assertions:** `status === 400`, `body.error === 'PASSWORD_TOO_SHORT'`

---

### TC-NEG-007: Password without uppercase letter

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"lowercase@example.com"`
- password: `"password123!"`
- firstName: `"No"`
- lastName: `"Upper"`

**Steps:**
1. POST `/api/auth/register` with lowercase-only password

**Expected result:**
- HTTP 400 Bad Request
- Error code: `PASSWORD_WEAK`
- Message: "Password must contain uppercase letters"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'password123!' })`
- **Assertions:** `status === 400`, `body.error === 'PASSWORD_WEAK'`

---

### TC-NEG-008: Password without lowercase letter

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"uppercase@example.com"`
- password: `"PASSWORD123!"`
- firstName: `"No"`
- lastName: `"Lower"`

**Steps:**
1. POST `/api/auth/register` with uppercase-only password

**Expected result:**
- HTTP 400 Bad Request
- Error code: `PASSWORD_WEAK`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'PASSWORD123!' })`
- **Assertions:** `status === 400`, `body.error === 'PASSWORD_WEAK'`

---

### TC-NEG-009: Password without numbers

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"nonumber@example.com"`
- password: `"PasswordWithout!"`
- firstName: `"No"`
- lastName: `"Number"`

**Steps:**
1. POST `/api/auth/register` with password lacking numbers

**Expected result:**
- HTTP 400 Bad Request
- Error code: `PASSWORD_WEAK`
- Message: "Password must contain numbers"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'PasswordWithout!' })`
- **Assertions:** `status === 400`, `body.error === 'PASSWORD_WEAK'`

---

### TC-NEG-010: Password without special characters

**Type:** API  
**Priority:** High  

**Test data:**
- email: `"nospecial@example.com"`
- password: `"Password123"`
- firstName: `"No"`
- lastName: `"Special"`

**Steps:**
1. POST `/api/auth/register` with password lacking special characters

**Expected result:**
- HTTP 400 Bad Request
- Error code: `PASSWORD_WEAK`
- Message: "Password must contain special characters"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: 'Password123' })`
- **Assertions:** `status === 400`, `body.error === 'PASSWORD_WEAK'`

---

### TC-NEG-011: Duplicate email (already registered)

**Type:** API  
**Priority:** High  
**Preconditions:** User with email "existing@example.com" already exists

**Test data:**
- email: `"existing@example.com"`
- password: `"NewPass123!"`
- firstName: `"Duplicate"`
- lastName: `"User"`

**Steps:**
1. POST `/api/auth/register` with existing email

**Expected result:**
- HTTP 409 Conflict
- Error code: `EMAIL_ALREADY_EXISTS`
- Message: "Email already registered"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'existing@example.com' })`
- **Assertions:** `status === 409`, `body.error === 'EMAIL_ALREADY_EXISTS'`

---

### TC-NEG-012: Null email value

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `null`
- password: `"Pass123!"`
- firstName: `"Null"`
- lastName: `"Email"`

**Steps:**
1. POST `/api/auth/register` with null email

**Expected result:**
- HTTP 400 Bad Request
- Error code: `MISSING_EMAIL`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: null })`
- **Assertions:** `status === 400`

---

### TC-NEG-013: Empty email string

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `""` (empty string)
- password: `"Pass123!"`
- firstName: `"Empty"`
- lastName: `"Email"`

**Steps:**
1. POST `/api/auth/register` with empty email

**Expected result:**
- HTTP 400 Bad Request
- Error code: `MISSING_EMAIL` or `INVALID_EMAIL_FORMAT`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: '' })`
- **Assertions:** `status === 400`

---

### TC-NEG-014: Whitespace-only email

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"   "` (spaces only)
- password: `"Pass123!"`
- firstName: `"Spaces"`
- lastName: `"Email"`

**Steps:**
1. POST `/api/auth/register` with whitespace email

**Expected result:**
- HTTP 400 Bad Request
- Error code: `INVALID_EMAIL_FORMAT`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: '   ' })`
- **Assertions:** `status === 400`

---

## Edge Cases

### TC-EDGE-001: Email at maximum length (254 characters)

**Type:** API  
**Priority:** Low  

**Test data:**
- email: `"a" * 243 + "@example.com"` (254 chars total, RFC 5321 max)
- password: `"ValidPass123!"`
- firstName: `"Max"`
- lastName: `"Email"`

**Steps:**
1. POST `/api/auth/register` with maximum length email

**Expected result:**
- HTTP 201 Created
- Email accepted and stored

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: longEmail })`
- **Assertions:** `status === 201`, `body.email.length === 254`

---

### TC-EDGE-002: Email exceeds maximum length (255 characters)

**Type:** API  
**Priority:** Low  

**Test data:**
- email: `"a" * 244 + "@example.com"` (255 chars, over RFC limit)
- password: `"ValidPass123!"`
- firstName: `"Over"`
- lastName: `"Max"`

**Steps:**
1. POST `/api/auth/register` with oversized email

**Expected result:**
- HTTP 400 Bad Request
- Error code: `INVALID_EMAIL_FORMAT` or `EMAIL_TOO_LONG`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: tooLongEmail })`
- **Assertions:** `status === 400`

---

### TC-EDGE-003: Name with unicode characters

**Type:** API  
**Priority:** Low  

**Test data:**
- email: `"unicode@example.com"`
- password: `"ValidPass123!"`
- firstName: `"José"` (contains é)
- lastName: `"Müller"` (contains ü)

**Steps:**
1. POST `/api/auth/register` with unicode names

**Expected result:**
- HTTP 201 Created
- Unicode characters stored correctly

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { firstName: 'José', lastName: 'Müller' })`
- **Assertions:** `status === 201`, `body.firstName === 'José'`

---

### TC-EDGE-004: Name with emojis

**Type:** API  
**Priority:** Low  

**Test data:**
- email: `"emoji@example.com"`
- password: `"ValidPass123!"`
- firstName: `"Alex👨"` (contains emoji)
- lastName: `"Smith"`

**Steps:**
1. POST `/api/auth/register` with emoji in name

**Expected result:**
- HTTP 400 Bad Request (or HTTP 201 depending on spec)
- Error code: `INVALID_NAME` or accepted

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { firstName: 'Alex👨' })`
- **Assertions:** `status === 400 || status === 201`

---

### TC-EDGE-005: Password exactly 128 characters (max)

**Type:** API  
**Priority:** Low  

**Test data:**
- email: `"edge@example.com"`
- password: `"P@$$w0rd123" + "x" * 117` (128 chars exactly)
- firstName: `"Max"`
- lastName: `"Length"`

**Steps:**
1. POST `/api/auth/register` with maximum password length

**Expected result:**
- HTTP 201 Created
- Password accepted

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: maxLengthPassword })`
- **Assertions:** `status === 201`

---

### TC-EDGE-006: Password 129 characters (exceeds max)

**Type:** API  
**Priority:** Low  

**Test data:**
- email: `"over@example.com"`
- password: `"P@$$w0rd123" + "x" * 118` (129 chars)
- firstName: `"Over"`
- lastName: `"Max"`

**Steps:**
1. POST `/api/auth/register` with password exceeding maximum

**Expected result:**
- HTTP 400 Bad Request
- Error code: `PASSWORD_TOO_LONG`

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { password: overLengthPassword })`
- **Assertions:** `status === 400`, `body.error === 'PASSWORD_TOO_LONG'`

---

### TC-EDGE-007: Email with subdomain (multiple dots)

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"user@mail.example.co.uk"`
- password: `"ValidPass123!"`
- firstName: `"Sub"`
- lastName: `"Domain"`

**Steps:**
1. POST `/api/auth/register` with subdomain email

**Expected result:**
- HTTP 201 Created
- Email with multiple dots accepted

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'user@mail.example.co.uk' })`
- **Assertions:** `status === 201`, `body.email === 'user@mail.example.co.uk'`

---

### TC-EDGE-008: Email with plus sign (email alias)

**Type:** API  
**Priority:** Medium  

**Test data:**
- email: `"user+tag@example.com"`
- password: `"ValidPass123!"`
- firstName: `"Plus"`
- lastName: `"Sign"`

**Steps:**
1. POST `/api/auth/register` with plus sign in email

**Expected result:**
- HTTP 201 Created
- Plus sign email accepted

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** `fetch(...with { email: 'user+tag@example.com' })`
- **Assertions:** `status === 201`

---

## Logical Cases

### TC-LOG-001: Registration creates verification token

**Type:** Workflow  
**Priority:** High  
**Preconditions:** Email service enabled, database ready

**Test data:**
- email: `"verify@example.com"`
- password: `"ValidPass123!"`
- firstName: `"Verify"`
- lastName: `"Token"`

**Steps:**
1. POST `/api/auth/register` with valid data
2. Verify verification email sent
3. Extract verification token from email
4. Verify token exists in database

**Expected result:**
- HTTP 201 Created
- User marked as `email_verified: false`
- Verification token created with 24h expiry
- Verification email queued

**Automation mapping:**
- **Layer:** Mixed (API + Email service)
- **Entry:** `POST /api/auth/register` + email verification
- **Actions:** `fetch(...), check email inbox, extract token`
- **Assertions:** `status === 201`, user `email_verified === false`, token exists

---

### TC-LOG-002: User cannot login before email verification

**Type:** Workflow  
**Priority:** High  
**Preconditions:** User registered but not verified

**Test data:**
- email: `"unverified@example.com"`
- password: `"ValidPass123!"`

**Steps:**
1. Register user with email
2. Attempt to login without verifying email
3. Verify login fails

**Expected result:**
- HTTP 403 Forbidden
- Error code: `EMAIL_NOT_VERIFIED`
- Message: "Please verify your email before logging in"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/login`
- **Actions:** Register user, `fetch(...login)` without verification
- **Assertions:** `status === 403`, `body.error === 'EMAIL_NOT_VERIFIED'`

---

### TC-LOG-003: User can login after email verification

**Type:** Workflow  
**Priority:** High  
**Preconditions:** Verification token available

**Test data:**
- email: `"verified@example.com"`
- password: `"ValidPass123!"`
- verification_token: `"token123abc"`

**Steps:**
1. Register user
2. Verify email using token
3. Attempt login with credentials
4. Verify login succeeds

**Expected result:**
- HTTP 200 OK (after verification)
- Response contains auth token
- User can access dashboard

**Automation mapping:**
- **Layer:** Mixed
- **Entry:** `POST /api/auth/register` → `POST /api/auth/verify-email` → `POST /api/auth/login`
- **Actions:** Register, verify with token, login
- **Assertions:** All status 200/201, auth token in response

---

### TC-LOG-004: Default role assigned on registration

**Type:** Workflow  
**Priority:** High  
**Preconditions:** System configured with default role "USER"

**Test data:**
- email: `"role@example.com"`
- password: `"ValidPass123!"`
- firstName: `"Role"`
- lastName: `"Check"`

**Steps:**
1. POST `/api/auth/register`
2. Query database for user role
3. Verify default role assigned

**Expected result:**
- HTTP 201 Created
- User role in database = "USER" (default)
- User cannot access admin functions

**Automation mapping:**
- **Layer:** Mixed (API + Database)
- **Entry:** `POST /api/auth/register`
- **Actions:** Register user, query database
- **Assertions:** `user.role === 'USER'`

---

### TC-LOG-005: Multiple simultaneous registration attempts (same email)

**Type:** Workflow  
**Priority:** Medium  

**Test data:**
- email: `"concurrent@example.com"`
- password: `"ValidPass123!"`

**Steps:**
1. Send 5 concurrent POST requests with same email
2. Verify only 1 user created
3. Verify 4 requests get duplicate error

**Expected result:**
- 1 request: HTTP 201 Created
- 4 requests: HTTP 409 Conflict with `EMAIL_ALREADY_EXISTS`
- Database has exactly 1 user record

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register` (concurrent)
- **Actions:** `Promise.all([fetch(...), fetch(...), ...])`
- **Assertions:** 1 status 201, 4 status 409

---

### TC-LOG-006: Registration triggers audit log entry

**Type:** Workflow  
**Priority:** Medium  
**Preconditions:** Audit logging enabled

**Test data:**
- email: `"audit@example.com"`
- password: `"ValidPass123!"`

**Steps:**
1. POST `/api/auth/register`
2. Query audit logs
3. Verify registration entry created

**Expected result:**
- HTTP 201 Created
- Audit log entry created with:
  - Event type: `USER_REGISTERED`
  - User email
  - IP address
  - Timestamp

**Automation mapping:**
- **Layer:** Mixed
- **Entry:** `POST /api/auth/register`
- **Actions:** Register, query audit logs
- **Assertions:** `audit_log[0].event === 'USER_REGISTERED'`

---

### TC-LOG-007: Password reset email sent on registration

**Type:** Workflow  
**Priority:** Medium  
**Preconditions:** Email service configured

**Test data:**
- email: `"resetmail@example.com"`
- password: `"ValidPass123!"`

**Steps:**
1. POST `/api/auth/register`
2. Check email queue for verification + welcome emails
3. Verify correct emails sent

**Expected result:**
- HTTP 201 Created
- 2 emails queued:
  - Email verification email
  - Welcome email with login instructions
- Both emails contain correct user details

**Automation mapping:**
- **Layer:** Mixed
- **Entry:** `POST /api/auth/register`
- **Actions:** Register, check email service queue
- **Assertions:** 2 emails in queue, subject lines correct

---

### TC-LOG-008: Weak password rejected with specific error

**Type:** Workflow  
**Priority:** High  

**Test data:**
- Attempts with various weak passwords:
  1. `"password"` (no numbers/special)
  2. `"12345678"` (no letters/special)
  3. `"Pass123"` (no special char)
  4. `"PASS123!"` (no lowercase)

**Steps:**
1. POST `/api/auth/register` with each weak password
2. Verify each returns 400 with specific error

**Expected result:**
- All return HTTP 400
- Each has specific error message:
  - "Must contain numbers and special characters"
  - "Must contain letters"
  - "Must contain special characters"
  - "Must contain lowercase letters"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register` (loop 4 times)
- **Actions:** Test each password variation
- **Assertions:** Each status 400, specific error code

---

### TC-LOG-009: Rate limiting on registration attempts (brute force)

**Type:** Security  
**Priority:** High  

**Test data:**
- IP address: `"192.168.1.100"`
- 20 registration attempts from same IP

**Steps:**
1. Send 20 registration POST requests from same IP
2. Verify rate limiting kicks in after threshold (e.g., 10)
3. Verify requests blocked with 429

**Expected result:**
- Requests 1-10: HTTP 201 or 400 (normal processing)
- Requests 11-20: HTTP 429 Too Many Requests
- Message: "Too many registration attempts. Try again in 15 minutes"

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register`
- **Actions:** Loop 20 requests from same IP
- **Assertions:** Requests 1-10 processed, 11-20 return 429

---

### TC-LOG-010: Registration requires HTTPS in production

**Type:** Security  
**Priority:** High  
**Preconditions:** Environment = production

**Test data:**
- HTTP request: `http://api.example.com/api/auth/register`
- HTTPS request: `https://api.example.com/api/auth/register`

**Steps:**
1. Attempt registration over HTTP
2. Attempt registration over HTTPS
3. Verify HTTP is redirected or rejected

**Expected result:**
- HTTP: 301 Redirect to HTTPS or 403 Forbidden
- HTTPS: Normal 201/400 response
- No sensitive data over HTTP

**Automation mapping:**
- **Layer:** API
- **Entry:** `POST /api/auth/register` (HTTP vs HTTPS)
- **Actions:** `fetch(httpUrl)`, `fetch(httpsUrl)`
- **Assertions:** HTTP returns 301/403, HTTPS returns 200-level

---

_Generated using Cursor skill **testcase-generation** · **File:** `user-registration-test-cases.md`_
