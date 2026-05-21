---
name: im-coder-agent-architecture
description: Describes IM_coder_agent repository layout—Express Node (and Electron when present) under app/backend, React/Next.js frontend under app/frontend in JavaScript (not TypeScript), Docker and MySQL, Figma libs, repo-wide Cursor assets under src/assets. Use when onboarding, local dev commands (npm run local vs npm start), or folder boundaries.
disable-model-invocation: true
---

# IM_coder_agent — Architecture Skill

## Project overview

**Single-branch full-stack codebase** with clear separation. Source is **JavaScript** (`.js`, `.jsx`)—do not assume TypeScript.

| Layer | Stack | Root |
|-------|--------|------|
| API / desktop shell | Node.js, Express; **Electron** when the project includes it | `app/backend/` |
| UI | Next.js (App Router) or React, Tailwind | `app/frontend/` |
| Data | MySQL (Knex migrations) | `app/backend/knexfile.js` |
| Ops | Docker, Nginx, PM2 (`ecosystem.config.js`) | repo root + `docker/` |
| Tooling | Figma extraction / prototype tree | `app/backend/src/lib/` |
| Agent config | Cursor skills & agents (repo-wide) | `src/assets/` |

Clients are the **React/Next.js** app plus HTTP/WebSocket consumers; **Electron** (if used) is started from the same backend package via `npm run local` as defined below.

---

## Local development commands

Run these from the **package root** of each app (`app/backend` or `app/frontend`).

| App | Command | Notes |
|-----|---------|--------|
| **Node.js API** and **Electron** (when both live in `app/backend`) | `npm run local` | Use this for backend + Electron dev entry as wired in `package.json`. |
| **React / Next.js frontend** | `npm start` | Standard dev server for the UI package. |

Do not document `npm start` for the backend/Electron package or `npm run local` for the React app unless `package.json` explicitly defines those scripts.

---

## Core competencies

### Backend (`app/backend`)

- Express entry (`server.js`), routes, controllers, middleware
- Knex migrations under `app/backend/migrations/`
- DB access via `src/db/` (connection, models)
- Validation (`src/validators/`), structured logging (`src/utils/logger.js`)
- Figma-related integration (`src/lib/figmaExtract.js`, `figmaNavTree.js`)
- **Electron** (if present): main/preload or bundled process per project—still use `npm run local` for local dev unless README says otherwise

### Frontend (`app/frontend`)

- Next.js App Router under `src/app/` (JavaScript: `.jsx` pages/layouts)
- Auth and real-time state: `src/contexts/` (e.g. JWT, Socket.io) as `.jsx`
- API client: `src/lib/api.js`
- UI: `src/components/` (`.jsx`)

### Platform

- **Docker**: root `Dockerfile`, `Dockerfile.dev`, `docker-compose.yml`, `docker-compose.dev.yml`
- **Reverse proxy**: `docker/nginx.conf`, `docker/Dockerfile.nginx`
- **MySQL**: `docker/mysql/` config

### Subprojects

- **`data/qa_automation/`**: QA automation subtree (treat as **separate git repo** when applicable)

---

## Architecture pattern

### Logical view

```text
┌─────────────────────────────────────────┐
│  React / Next.js (app/frontend)          │
│  App Router, contexts, api.js            │
└────────────────┬────────────────────────┘
                 │ HTTP (+ Socket.io as used)
┌────────────────▼────────────────────────┐
│  Express (+ Electron if used)            │
│  app/backend — routes → controllers → db │
└────────────────┬────────────────────────┘
                 │ SQL (Knex / pool)
┌────────────────▼────────────────────────┐
│  MySQL                                   │
└─────────────────────────────────────────┘
```

Optional: **Nginx** in `docker/` terminates TLS and proxies to frontend/backend per compose.

### Request flow (typical API call)

1. User action in Next/React → `api.js` or route handler as applicable  
2. HTTP request to Express route under `src/routes/`  
3. Middleware (CORS, logging, DB init, error handler)  
4. Controller → DB/models or external APIs (e.g. Figma)  
5. JSON response → React state / UI update  

---

## Repository folder structure (canonical, JavaScript)

```text
IM_coder_agent/
├── app/backend/
│   ├── server.js
│   ├── package.json              # scripts: "local" → npm run local
│   ├── package-lock.json
│   ├── knexfile.js
│   ├── nodemonconfig.json
│   ├── ecosystem.config.js
│   ├── migrations/
│   │   ├── 001_create_workspaces_table.js
│   │   └── ...
│   ├── scripts/
│   │   ├── init-db.js
│   │   ├── seed-db.js
│   │   └── entrypoint-dev.sh
│   └── src/
│       ├── config/index.js
│       ├── controllers/
│       │   ├── agentController.js
│       │   └── prototypeTreeController.js
│       ├── db/
│       │   ├── connection.js
│       │   └── models.js
│       ├── middleware/
│       ├── routes/
│       ├── lib/
│       │   ├── figmaExtract.js
│       │   └── figmaNavTree.js
│       ├── utils/
│       ├── validators/
│       └── assets/                # Cursor AI config (not runtime API code)
│
├── app/frontend/
│   ├── package.json              # scripts: "start" → npm start
│   ├── next.config.js
│   ├── jsconfig.json             # optional path aliases (JS projects)
│   ├── tailwind.config.js
│   ├── Dockerfile.dev
│   ├── .env.local
│   └── src/
│       ├── app/
│       │   ├── layout.jsx
│       │   ├── page.jsx
│       │   ├── login/page.jsx
│       │   ├── dashboard/page.jsx
│       │   └── runs/[taskId]/page.jsx
│       ├── contexts/
│       │   ├── AuthContext.jsx
│       │   └── SocketContext.jsx
│       ├── lib/
│       │   └── api.js
│       └── components/
│
├── docker/
├── data/qa_automation/
├── Dockerfile
├── Dockerfile.dev
├── docker-compose.yml
├── docker-compose.dev.yml
├── .dockerignore
├── .env.example
├── .env
├── .env.dev.docker
├── src/assets/
├── logs/
├── CLAUDE.md
├── README.md
└── Other config (gitignore, eslint, etc.)
```

---

## Responsibilities by area

### `app/backend`

| Path | Responsibility |
|------|----------------|
| `server.js` | Boot Express, listen, wire globals |
| `migrations/` | Schema versioning (Knex) |
| `scripts/` | DB init, seed, container entrypoints |
| `src/routes/` | HTTP route modules only |
| `src/controllers/` | Request/response mapping, orchestration |
| `src/db/` | Connection and data access helpers |
| `src/middleware/` | Cross-cutting HTTP concerns |
| `src/lib/` | Figma and other integrations |
| `src/utils/` | Pure helpers, logging |
| `src/validators/` | Request validation |
| `src/assets/` | **Cursor / AI config**, not production API logic |

### `app/frontend`

| Path | Responsibility |
|------|----------------|
| `src/app/` | Routes, layouts, pages (App Router, `.jsx`) |
| `src/contexts/` | Auth session, Socket.io client lifecycle |
| `src/lib/api.js` | Backend client, auth headers, base URL |
| `src/components/` | Reusable UI |

### `docker/` and repo root

| Path | Responsibility |
|------|----------------|
| `docker-compose*.yml` | Service topology (API, web, DB, nginx) |
| `docker/nginx.conf` | Reverse proxy rules |
| `docker/mysql/` | DB server configuration |
| `.env.example` | Document required env vars |

### `src/assets/` (repo root)

Cursor skills, agent definitions, or shared AI tooling for the **whole repo**—not Next `public/` assets.

---

## Agent / coding rules (when changing this repo)

1. **Language**: Prefer **JavaScript** (`.js`, `.jsx`). Do not add TypeScript-only files unless the team explicitly adopts TS.
2. **Backend** under `app/backend/`; **frontend** under `app/frontend/`. No Express code inside Next `src/app` except intentional route handlers.
3. **New API surface**: route → controller → `db/`; validate in `validators/`; log via `utils/logger.js`.
4. **Migrations**: numbered files under `app/backend/migrations/`.
5. **Secrets**: env + backend config only; never commit `.env`.
6. **Figma**: `src/lib/figma*.js` and `prototypeTree*` modules; keep API shapes stable for the client.
7. **Dev commands**: document **`npm run local`** for Node/Electron backend package and **`npm start`** for the React app in README when onboarding.
8. **Stack depth**: `.cursor/skills/nodejs/`, `.cursor/skills/electron/`, `.cursor/skills/react/` as needed.

---

## Key technologies (reference)

| Area | Typical choices in this layout |
|------|--------------------------------|
| Backend | Node, Express, Knex, PM2, Nodemon |
| Frontend | Next.js, React, **JavaScript**, Tailwind |
| Desktop | Electron (optional), started via **`npm run local`** in backend package when configured |
| Real-time | Socket.io (via contexts) |
| DB | MySQL |
| Ops | Docker, Nginx |

---

## Documentation pointers

- Environment template: `.env.example`
- Human onboarding: `README.md`, `CLAUDE.md`
- Org standards: `.cursor/rules/` and `.cursor/skills/nodejs/`, `.cursor/skills/react/`, `.cursor/skills/electron/`

---

## Success criteria (for contributors)

- [ ] Uses **JS/JSX** naming consistently (`api.js`, `layout.jsx`, not `.ts`/`.tsx`)
- [ ] Starts backend/Electron with **`npm run local`** and frontend with **`npm start`** per `package.json`
- [ ] Can add a route and controller without bypassing middleware/validators
- [ ] Can add a Next page that uses `api.js` and existing auth context
- [ ] Knows root `src/assets/` is repo-wide Cursor config
- [ ] Does not commit secrets

---

**Version**: 2.1 (JavaScript + npm run local / npm start)  
**Scope**: `app/backend` (Node + optional Electron) + `app/frontend` (React/Next, JS) + Docker + `src/assets`
