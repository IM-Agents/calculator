---
name: nodejs-standards
description: Server-side Node.js standards for HTTP APIs, middleware, async I/O, logging, clustering, and performance. Use when building services, workers, BFFs, or reviewing backend JavaScript/TypeScript.
disable-model-invocation: true
---

# Node.js Standards

## 1. Application shape

- **Entry clarity:** `server.js` or `main.ts` wires config, logger, HTTP server, graceful shutdown.
- **Layers:** router → controller (HTTP DTO) → service (use cases) → repositories (data). **No DB clients in controllers.**
- **Config:** 12-factor: environment for secrets and deployment-specific values; validate at startup (zod/joi/env-schema).

```javascript
// routes/user.js
import { Router } from 'express';
import { asyncHandler } from '../lib/async-handler.js';
import * as userService from '../services/user-service.js';

export const userRouter = Router();

userRouter.get('/:id', asyncHandler(async (req, res) => {
  const user = await userService.getUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'not_found' });
  res.json({ data: user });
}));
```

## 2. Middleware

- **Order:** security headers → body parsers with limits → request ID → auth → routes → error handler.
- **Idempotency:** for mutating routes that clients retry, support idempotency keys where appropriate.
- **Timeouts:** server, reverse proxy, and outbound HTTP timeouts aligned.

## 3. Request handling

- Validate input at the edge; respond with **consistent error JSON** (`code`, `message`, optional `details`).
- Stream large downloads/uploads; cap body size.
- Prefer **structured logging** with request correlation ID.

```javascript
// lib/async-handler.js
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
```

## 4. Error handling

- Central **error middleware** maps domain errors to HTTP status; never leak stack traces in production responses.
- Operational vs programmer errors: retry/backoff only for operational (network blips), fail fast on programmer bugs after logging.

## 5. Logging

- **JSON logs** in production; levels `error`, `warn`, `info`, `debug` with sampling for high-volume debug.
- **PII redaction** at logging boundary; never log secrets or full payment payloads.

## 6. Async and performance

- **Non-blocking I/O** only; offload CPU-heavy work to worker threads or separate services.
- **Connection pools** for SQL; configure max connections vs DB limits.
- **Caching:** explicit TTLs; stampede protection for hot keys.
- **Clustering:** use `cluster` or platform-level replicas; **sticky sessions** only if unavoidable—prefer stateless JWT/cookies + shared store.

```javascript
import cluster from 'node:cluster';
import os from 'node:os';

if (cluster.isPrimary) {
  for (let i = 0; i < os.availableParallelism(); i++) cluster.fork();
} else {
  await import('./http-server.js');
}
```

## 7. Memory and reliability

- Watch **event loop lag** and heap in APM. Fix leaks (listeners, global caches) before scaling horizontally.
- **Graceful shutdown:** stop accepting, drain connections, close DB pools, exit with timeout guard.

## 8. Security (API baseline)

- HTTPS termination at edge; HSTS where applicable.
- Rate limiting + authn/authz on mutating routes; CSRF strategy for cookie sessions.
- Dependency audit in CI; lockfiles committed.

## Anti-patterns

- Synchronous `*Sync` fs APIs on request paths.
- Unbounded in-memory queues; unbounded `Promise.all` on user-controlled lists.
- Global mutable singletons without lifecycle tests.

## Cross-references

- JS baseline: [../javascript-advanced/SKILL.md](../javascript-advanced/SKILL.md)
- MySQL/Postgres: [../mysql/SKILL.md](../mysql/SKILL.md), [../postgresql/SKILL.md](../postgresql/SKILL.md)
- Reference (layout + examples): [reference/README.md](reference/README.md)
