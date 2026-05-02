# Calculator

Documentation has been added under /docs on branch Saturday_test_task_three.

## Application behavior (CodeRabbit follow-ups)

- **POST `/api/calculate`** rejects missing, null, and blank or whitespace-only `expression` values with HTTP 400 and `EMPTY_EXPRESSION` / `INVALID_EXPRESSION` so empty input never reaches evaluation as a 500.
- **History** items include a stable **`id`** (UUID) from the server; the history list keys rows by that id only.
- **History scope:** calculation history is stored **per browser session**. The API sets an HttpOnly `calc_sid` cookie (UUID); `GET`/`DELETE` `/api/history` and new entries from `POST` `/api/calculate` use that session. The SPA sends `credentials: 'include'` on API calls so the cookie is honored through the dev proxy. Buckets are capped in memory to limit abuse.
- **± (sign toggle)** on the in-progress expression: if the last number is preceded by a **binary** `+` or `-` (e.g. `5-3`, `10+2`), that operator is flipped so the pair toggles as `5+3` / `10-2`. Otherwise the last numeric literal is negated (e.g. `2*3` → `2*-3`, `-5` → `5`), with a small merge when a unary `-` would stack awkwardly.
- **“Empty” for evaluate** treats only `null`/`undefined` or strings empty after trim as empty; numeric **0** is never treated as empty.

## Security notes

- **CORS:** With `credentials: true`, the API must not reflect arbitrary `Origin` headers. Set **`CORS_ORIGIN`** to a comma-separated allowlist (for example `https://app.example.com` or `http://localhost:5173,http://127.0.0.1:5173`). If unset, only common local dev origins (`http://localhost:5173`, `http://localhost:3000`) are accepted.
- No secrets are embedded in the client; the session id is an opaque UUID in an HttpOnly cookie, not echoed in JSON bodies.
- Expression input is validated at the controller (trim, empty check) and again in the parser (character whitelist, structure).
