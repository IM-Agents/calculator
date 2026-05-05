---
name: testcase-generation
description: Generate ALL possible comprehensive automation-ready functional test cases (Positive, Negative, Edge, Logical) as Markdown with MULTIPLE EXTENSIVE cases per type. ONLY GENERATION—NO execution/testing. Covers any stack with Automation mapping.
license: Proprietary
---

# Test Case Generation Skill

## Purpose

Generate **ALL POSSIBLE comprehensive test cases** in Markdown from requirements with **multiple extensive cases per type** (POS, NEG, EDGE, LOG).

**Core Principle:** Only generation of test cases—NO implementation, NO execution, NO testing at AI end. This skill is for other users/teams to implement and run tests themselves.

## When to Use

✅ User requests: "Generate test cases," "test plan," "QA coverage"  
✅ Feature requirement → comprehensive test case generation needed  
✅ Need extensive test suite for another team/person to implement  
✅ Generate ALL possible scenarios (not just examples)  
❌ NOT for executing/running tests  
❌ NOT for manual testing checklists  
❌ NOT for code reviews or performance testing


## Core Rules

### 1. Generation-Only (No Execution)
- AI generates comprehensive TCs in Markdown ONLY
- AI does NOT implement/code the tests
- AI does NOT execute/run the tests
- AI does NOT test at its end
- Other users/teams implement and execute based on generated TCs

### 2. Multiple Extensive Cases Per Type
Generate **multiple cases per type**, not just one example:

| Type | Min Cases | Focus |
|------|-----------|-------|
| **POS** | 5-10+ | All happy paths, valid input variations, success scenarios |
| **NEG** | 5-10+ | All error types, invalid inputs, edge rejections, access denials |
| **EDGE** | 4-8+ | Boundaries, limits, special values, empty/null, unicode, max/min |
| **LOG** | 4-8+ | Workflows, state transitions, business rules, integrations |

### 3. Coverage Mandate
Decompose systematically and generate TCs for ALL:

| Aspect | Generate TC For |
|--------|---|
| **Inputs** | EVERY valid/invalid/boundary equivalence class |
| **Outputs** | EACH distinct success + error type |
| **Actors** | EACH role/permission with different behavior |
| **State** | EVERY workflow, transition, business rule |
| **Integration** | External services (success, timeout, fail, retry) |
| **Edge cases** | Boundaries, limits, empty, null, unicode, max length, min value |
| **Errors** | ALL possible error codes and messages |

### 4. Automation Mapping (Required for Each TC)
Every TC must include concrete, executable automation mapping:

```markdown
**Automation mapping:**
- **Layer:** [UI | API | CLI | Mixed]
- **Entry:** [URL/endpoint/command]
- **Actions:** [concrete: "fill #email", "POST /login", "npm migrate"]
- **Assertions:** [machine-checkable: "status 200", "text Welcome", "exitCode 0"]
```

---

## Test Case Template

```markdown
### TC-[TYPE]-[NUM]: [Title]

**Type:** [Functional | UI | API | Business Logic | Workflow]
**Priority:** [High | Medium | Low]

**Preconditions:**
- Machine setup (not manual steps)

**Test data:**
- `key`: explicit_value

**Steps:**
1. [Atomic action]
2. [Next action]

**Expected result:**
- [Assertable outcome 1]
- [Assertable outcome 2]

**Automation mapping:**
- **Layer:** [UI | API | CLI | Mixed]
- **Entry:** [URL/endpoint/command]
- **Actions:** [concrete automation steps]
- **Assertions:** [machine-checkable assertions]
```

**TC Naming Pattern:**
- `TC-POS-001, TC-POS-002, TC-POS-003...` (all positive paths)
- `TC-NEG-001, TC-NEG-002, TC-NEG-003...` (all error scenarios)
- `TC-EDGE-001, TC-EDGE-002, TC-EDGE-003...` (all boundaries)
- `TC-LOG-001, TC-LOG-002, TC-LOG-003...` (all workflows)

**IMPORTANT:** This is TEMPLATE ONLY for GENERATION. AI generates markdown, user/team implements and runs tests.
---

## Four Test Case Types - COMPREHENSIVE APPROACH

| Type | Purpose | Target Count | Examples |
|------|---------|---------------|----------|
| **POS** (Positive) | Happy paths, valid inputs, success scenarios | 5-10+ | Valid login, valid payment, valid submission, etc. |
| **NEG** (Negative) | Errors, invalid inputs, denied access, all error types | 5-10+ | Wrong password, invalid email, missing field, expired token, etc. |
| **EDGE** (Edge) | Boundaries, limits, special values, empty, null, unicode | 4-8+ | Max length, min value, leading zeros, special chars, null input, etc. |
| **LOG** (Logical) | Workflows, state transitions, business rules, integrations | 4-8+ | Session persistence, state changes, multi-step processes, etc. |

**IMPORTANT:** Generate MULTIPLE cases per type, each testing a DISTINCT behavior/scenario.
---

## Coverage Techniques - GENERATE MULTIPLE CASES

### Equivalence Partitioning - Multiple Cases Per Class
Group inputs by behavior. Generate 1+ TC per distinct class.

**Example (email) - Generate ALL:**
- TC-POS-001: Valid email format → POS
- TC-NEG-001: Missing @ → NEG
- TC-NEG-002: Missing domain → NEG
- TC-NEG-003: Extra @ symbols → NEG
- TC-EDGE-001: Very long email (255 chars) → EDGE
- TC-EDGE-002: Subdomain with multiple dots → EDGE

### Boundary Analysis - Multiple Cases Per Boundary
Test: min-1, min, max, max+1 for EACH boundary.

**Example (age 18-120) - Generate ALL:**
- TC-NEG-001: Age 17 (below min) → NEG
- TC-POS-001: Age 18 (at min) → POS
- TC-POS-002: Age 50 (mid-range) → POS
- TC-POS-003: Age 120 (at max) → POS
- TC-NEG-002: Age 121 (above max) → NEG
- TC-EDGE-001: Age 0 (boundary) → EDGE
- TC-EDGE-002: Age 999 (extreme) → EDGE

### State Transitions - Multiple Cases Per Flow
Each state change = TC. Generate for every possible path.

**Example (order workflow) - Generate ALL paths:**
- TC-LOG-001: Draft → Submitted (happy path)
- TC-LOG-002: Submitted → Approved (happy path)
- TC-LOG-003: Submitted → Rejected (error path)
- TC-LOG-004: Approved → Shipped (happy path)
- TC-LOG-005: Shipped → Delivered (happy path)
- TC-LOG-006: Cancel from Draft
- TC-LOG-007: Cancel from Submitted
- TC-LOG-008: Invalid state transition attempt

### Error Types - Multiple Cases Per Error
Generate separate TC for EACH distinct error code/message.

**Example (login) - Generate ALL error types:**
- TC-NEG-001: Invalid email format
- TC-NEG-002: Invalid password format
- TC-NEG-003: Email not found
- TC-NEG-004: Wrong password
- TC-NEG-005: Account locked
- TC-NEG-006: Account disabled
- TC-NEG-007: Too many failed attempts
- TC-NEG-008: Session expired

---

## Preconditions & Test Data

**Preconditions:** Machine setup ONLY (not manual steps for QA)
```markdown
- Test user exists: test@example.com (fixture: users.json)
- Database seeded with test data (via migration/seed script)
- Email service mocked (TEST_EMAIL_SERVICE=mock)
- API server running on http://localhost:3000
- Browser cache cleared (automation handles this)
```

**Test Data:** Explicit, concrete values (NEVER placeholders)
```markdown
- `email`: "user@example.com"
- `password`: "SecurePass123!"
- `max_length`: "x" * 255
- `invalid_format`: "not-an-email"
- `null_value`: null
- `empty_string`: ""
```

**NEVER use:**
- "valid email" (use specific: user@test.com)
- "wrong password" (use specific: WrongPass123)
- "any number" (use specific: 42, 999, 0)
---

## Quick Checklist

- [ ] **Multiple cases per type:** POS (5+), NEG (5+), EDGE (4+), LOG (4+)
- [ ] **Every TC has Automation mapping** (Layer, Entry, Actions, Assertions)
- [ ] **Preconditions are machine setup** (not manual steps)
- [ ] **Test data is explicit** (no placeholders)
- [ ] **No duplicate TCs** - each tests DISTINCT behavior
- [ ] **Comprehensive coverage:** inputs, outputs, actors, state, errors, integrations
- [ ] **All error types covered** - separate TC per error code
- [ ] **All boundaries tested** - min-1, min, max, max+1
- [ ] **All state transitions covered** - every possible workflow path
- [ ] **Markdown valid** (proper formatting)
- [ ] **GENERATION ONLY** - no code implementation, no test execution
- [ ] **Footer appended** with skill reference

---

## File Format

Save as: `[feature]-test-cases.md`

**Footer:**
```markdown
---
_Generated using Cursor skill **testcase-generation** · **File:** `login-test-cases.md`_
```