# Calculator application — functional test cases

Test cases align with `README.md`, `docs/02-functional-specification.md`, and `docs/06-api-specification.md`. Session history behavior follows README (HttpOnly `calc_sid`, per-session cap of 10 items, stable `id` per row).

---

## Positive scenarios

| ID | Area | Preconditions | Steps | Expected result |
|----|------|---------------|-------|-----------------|
| P-01 | Evaluate | API and UI running | Enter `5+5`, press `=` | Success response; display shows `10`; history gains one row with expression `5+5`, numeric result, UUID `id`, ISO `timestamp`. |
| P-02 | Trigonometry DEG | Mode `DEG` | Enter `sin(30)`, `=` | Result `0.5` (within floating tolerance). |
| P-03 | Trigonometry RAD | Mode `RAD` | Enter `sin(1.5707963267948966)` (≈ π/2), `=` | Result ≈ `1`. |
| P-04 | Power | — | Enter `2^3^2`, `=` | Result `512` (right-associative exponentiation). |
| P-05 | Percent binary | — | Enter `10%50`, `=` | Result `5` (`10 * 50 / 100`). |
| P-06 | Constants | — | Enter `pi+0` or use π button then `+0`, `=` | Result ≈ `π`. |
| P-07 | Functions | — | Enter `sqrt(16)`, `=` | Result `4`. |
| P-08 | Log | — | Enter `log(100)`, `=` | Result `2`. |
| P-09 | History reuse | History has an item | Click a history row | Expression field fills with that expression; no crash. |
| P-10 | Clear history | History non-empty | Click **Clear** in history panel | `DELETE /api/history` succeeds; list empties. |
| P-11 | Keyboard | Focus not in an input | Type digits and `+`, press Enter | Same as button evaluate path; cookie sent with `credentials: 'include'`. |
| P-12 | Memory | Valid result shown | Press **M+**, then **MR** | Memory recall inserts formatted value into expression. |
| P-13 | Session isolation | Two browsers or profiles | Run calculations in each | Each session’s history list differs (cookie-scoped). |

---

## Negative scenarios

| ID | Area | Steps | Expected result |
|----|------|-------|-----------------|
| N-01 | Empty expression API | `POST /api/calculate` with `{}` or `{"expression":""}` or whitespace-only | HTTP `400`; `error.code` is `EMPTY_EXPRESSION` or appropriate validation code per contract; no `500`. |
| N-02 | Invalid type | `POST` with `"expression": 0` (number) | HTTP `400`; `INVALID_EXPRESSION` (non-string). |
| N-03 | Zero is not empty | `POST` with `"expression":"0"` | HTTP `200`; result `0`. |
| N-04 | Division by zero | Enter `1/0`, `=` | HTTP `422`; friendly error in UI; `DIVISION_BY_ZERO`. |
| N-05 | Negative sqrt | Enter `sqrt(-1)`, `=` | HTTP `422`; `NEGATIVE_SQRT`. |
| N-06 | Invalid log | Enter `log(0)` or `ln(-1)`, `=` | HTTP `422`; `INVALID_LOG_INPUT`. |
| N-07 | Invalid characters | `POST` with `"expression":"2$2"` | HTTP `400`/`422` with structured error (not silent success). |
| N-08 | UI empty evaluate | Clear display, press `=` | Client message such as “Enter an expression first.”; no request with blank expression. |

---

## Edge scenarios

| ID | Area | Steps | Expected result |
|----|------|-------|-----------------|
| E-01 | History cap | Perform 11 successful evaluations in same session | At most 10 items visible; oldest dropped. |
| E-02 | Duplicate decimal | Type `1..` via UI | Second `.` blocked. |
| E-03 | Operator replace | Type `5+`, then press `−` | Trailing operator replaced; expression ends with `−`. |
| E-04 | Sign toggle binary | `5-3` then ± (toggle) | Operator flips to `5+3` per README. |
| E-05 | Sign toggle unary | `2*3` then ± | Becomes `2*-3` (or equivalent valid negation). |
| E-06 | CORS allowlist | Set `CORS_ORIGIN` to a list not containing the browser `Origin` | Browser blocks response; server does not reflect arbitrary `Origin`. |
| E-07 | Large display | Enter a very long expression | Display truncates with ellipsis without layout break (`truncateExpression`). |

---

## Logical validation

| ID | Rule | Verification |
|----|------|--------------|
| L-01 | No `eval` on server | Code review: parser/evaluator is allowlisted tokens only. |
| L-02 | History keys | React list keys use only `historyItem.id` from server. |
| L-03 | Cookie flags | `calc_sid` is HttpOnly; API routes set cookie when missing. |
| L-04 | Proxy dev | Vite dev server proxies `/api` to backend so same-site cookie works with `credentials: 'include'`. |

---

## Regression notes

- When fixing bugs, add or adjust a row here under the relevant section and note the PR or change reference.
- Automated tests (if added later) should map to these IDs where possible.
- Monorepo `npm run dev` forces `PORT=3001` for the API child process so the Vite proxy (`/api` → `127.0.0.1:3001`) stays aligned even if the parent shell exports a different `PORT`.
