---
name: testcase-generation
description: Generate comprehensive automation-ready functional test cases (Positive, Negative, Edge, Logical) as Markdown. AI owns implementation and execution—no manual QA. Covers any stack with Automation mapping for automated test implementation.
license: Proprietary
---

# Test Case Generation Skill

## Purpose

Generate comprehensive, automation-ready test cases in Markdown from requirements. AI implements + runs tests end-to-end. No manual QA execution.

## When to Use

✅ User requests: "Generate test cases," "test plan," "QA coverage"  
✅ Feature requirement → automated test cases expected  
❌ Manual checklists, code reviews, performance testing


## Core Rules

### 1. Human-Free Execution
- AI generates TCs in Markdown
- AI implements automated tests (Playwright, pytest, etc.)
- AI runs suite + reports results
- Humans: provide requirements, secrets (env vars)

### 2. Coverage Mandate
Decompose systematically:

| Aspect | Generate TC For |
|--------|---|
| **Inputs** | Every valid/invalid/boundary class |
| **Outputs** | Each distinct success + error type |
| **Actors** | Each role/permission with different behavior |
| **State** | Every workflow, transition, business rule |
| **Integration** | External services (success, timeout, fail) |

### 3. Automation Mapping (Required)
Every TC must include:

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

**TC IDs:** TC-POS-001, TC-NEG-001, TC-EDGE-001, TC-LOG-001
---

## Four Test Case Types

| Type | Purpose | % |
|------|---------|---|
| **POS** (Positive) | Happy paths, valid inputs | 30-40% |
| **NEG** (Negative) | Errors, invalid inputs, denied access | 30-40% |
| **EDGE** (Edge) | Boundaries, limits, empty, unicode | 10-20% |
| **LOG** (Logical) | Workflows, state, business rules | 10-20% |
---

## Coverage Techniques

### Equivalence Partitioning
Group inputs with same behavior. 1 TC per class with different behavior.

**Example (email):**
- Valid: user@test.com → POS
- Missing @: usertest.com → NEG
- Missing domain: user@ → NEG

### Boundary Analysis
Test at: min-1, min, max, max+1

**Example (age 18-120):**
- 17 → NEG | 18 → POS | 120 → POS | 121 → NEG

### State Transitions
Each state change = TC

**Example (order workflow):**
- Draft → Submitted → Approved → Shipped → Delivered

---

## Preconditions & Test Data

**Preconditions:** Machine setup, not manual actions
```markdown
- Test user exists: test@example.com (fixture: users.json)
- Database seeded with test data
- Email service mocked (TEST_EMAIL_SERVICE=mock)
```
**Test Data:** Explicit values
```markdown
- `email`: "user@example.com"
- `password`: "SecurePass123!"
- `max_length`: "x" * 255
```
---

## Quick Checklist

- [ ] All 4 TC types present (POS, NEG, EDGE, LOG)
- [ ] Every TC has Automation mapping
- [ ] Preconditions are machine setup (not manual)
- [ ] Test data is explicit
- [ ] No duplicate TCs (each tests distinct behavior)
- [ ] Coverage: inputs, outputs, actors, state, integration
- [ ] Markdown valid
- [ ] Footer appended if file saved

---

## File Format

Save as: `[feature]-test-cases.md`

**Footer:**
```markdown
---
_Generated using Cursor skill **testcase-generation** · **File:** `login-test-cases.md`_
```