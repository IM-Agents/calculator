# Calculator Test Cases

## Scope
- Frontend calculator interactions and backend API integration.
- Backend expression validation, evaluation, and session-scoped history behavior.

## Functional Test Cases

| ID | Area | Scenario | Steps | Expected Result |
|---|---|---|---|---|
| TC-001 | Calculate API | Basic addition | POST `/api/calculate` with `2+3` | HTTP 200, `result: 5`, history entry returned with `id` |
| TC-002 | Calculate API | Empty expression rejected | POST `/api/calculate` with `expression: ""` | HTTP 400, `code: INVALID_EXPRESSION` |
| TC-003 | Calculate API | Missing expression rejected | POST `/api/calculate` with empty body | HTTP 400, `code: EMPTY_EXPRESSION` |
| TC-004 | Calculate API | Scientific function in DEG mode | POST `/api/calculate` with `sin(30)` and `angleMode: DEG` | HTTP 200, result approximately `0.5` |
| TC-005 | Calculate API | Scientific function in RAD mode | POST `/api/calculate` with `sin(1.57079632679)` and `angleMode: RAD` | HTTP 200, result approximately `1` |
| TC-006 | Calculate API | Invalid sqrt input | POST `/api/calculate` with `sqrt(-1)` | HTTP 400 with validation message |
| TC-007 | History API | History capped to 10 entries | Send 12 valid calculations, then GET `/api/history` | Response contains max 10 entries, newest first |
| TC-008 | History API | Session isolated history | Use two different cookie sessions | Each session sees only its own history |
| TC-009 | History API | Clear history | DELETE `/api/history`, then GET `/api/history` | HTTP 204 from delete, subsequent GET returns empty list |
| TC-010 | Frontend | Keyboard input evaluate | Type `1+2`, press Enter | Display shows `3`, history item appears |
| TC-011 | Frontend | Memory add/recall | Compute value, press `M+`, then `MR` | Recalled value is appended into expression |
| TC-012 | Frontend | User-friendly error message | Enter invalid expression and press `=` | Error text shown in display area; app does not crash |

## Regression Cases For Bugs/Issues
- None recorded yet in this branch.  
- Rule: for every future bug fix, append a dedicated regression row (`BUG-XXX`) with original failure and expected non-regression behavior.
