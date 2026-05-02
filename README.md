# Calculator

Documentation has been added under /docs on branch Saturday_test_task_three.

## Application behavior (CodeRabbit follow-ups)

- **POST `/api/calculate`** rejects missing, null, and blank or whitespace-only `expression` values with HTTP 400 and `EMPTY_EXPRESSION` / `INVALID_EXPRESSION` so empty input never reaches evaluation as a 500.
- **History** items include a stable **`id`** (UUID) from the server; the history list uses that for React keys so duplicate timestamps and identical expressions cannot collide.
- **± (sign toggle)** on the in-progress expression negates the **last numeric literal** using the same token rules as the backend parser, so expressions like `5-3` and `2*3` become `5--3` and `2*-3`, which evaluate correctly with unary minus.
- **“Empty” for evaluate** uses nullish checks: numeric **0** is not treated as empty, only `null`, `undefined`, or strings that are empty after trim.
