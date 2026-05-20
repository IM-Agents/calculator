---

## name: standards-suite

description: Applies organizational coding standards for JavaScript (ES6+), React, Node.js, Electron, MySQL, PostgreSQL, and shared relational database practices. Use when onboarding developers, defining engineering conventions, generating code that must match org standards, or when the user mentions coding standards, best practices, performance, or architecture for these stacks.
disable-model-invocation: true

# Coding Standards Suite (Technical Lead)

## Purpose

This suite defines **market-aligned** conventions for **performance, scalability, and maintainability**. Humans use it for onboarding; agents use it as **normative** guidance when generating or refactoring code.

## Skill map (load the right leaf skill)


| Area                       | Skill folder           | Primary doc                              |
| -------------------------- | ---------------------- | ---------------------------------------- |
| Modern JavaScript (ES6+)   | `javascript-advanced/` | [SKILL.md](javascript-advanced/SKILL.md) |
| React                      | `react/`               | [SKILL.md](react/SKILL.md)               |
| Node.js (APIs, services)   | `nodejs/`              | [SKILL.md](nodejs/SKILL.md)              |
| Electron                   | `electron/`            | [SKILL.md](electron/SKILL.md)            |
| MySQL                      | `mysql/`               | [SKILL.md](mysql/SKILL.md)               |
| PostgreSQL                 | `postgresql/`          | [SKILL.md](postgresql/SKILL.md)          |
| Shared relational DB rules | `database-common/`     | [SKILL.md](database-common/SKILL.md)     |
| Architecture               | `architecture/`        | [skill.md](architecture/skill.md)        |
| design                     | `desgin/`              | [skill.md](design/skill.md)              |


## Reference layout

Each skill folder has its **own** `reference/README.md` (≤400 lines): layout notes, examples, and stack-relevant guardrails.


| Stack               | Reference                                                                          |
| ------------------- | ---------------------------------------------------------------------------------- |
| JavaScript          | [javascript-advanced/reference/README.md](javascript-advanced/reference/README.md) |
| React               | [react/reference/README.md](react/reference/README.md)                             |
| Node.js             | [nodejs/reference/README.md](nodejs/reference/README.md)                           |
| Electron            | [electron/reference/README.md](electron/reference/README.md)                       |
| MySQL               | [mysql/reference/README.md](mysql/reference/README.md)                             |
| PostgreSQL          | [postgresql/reference/README.md](postgresql/reference/README.md)                   |
| Relational (common) | [database-common/reference/README.md](database-common/reference/README.md)         |
| Figma to frontend   | [figma-design/SKILL.md](database-common/reference/README.md)                       |


## Agent workflow

1. Identify stack (JS/React/Node/Electron/DB). For **IM_coder_agent** (`app/backend`, `app/frontend`), read `architecture/skill.md` first.
2. Read the matching **leaf** `SKILL.md` first.
3. Pull that stack’s `**reference/README.md`** when examples or repo layout detail is needed.
4. Prefer **explicit error handling**, **bounded async**, **measurable performance** assumptions, and **consistent naming** across layers.

## Canonical filenames (legacy aliases)

These names map to the same standards as the skill folders:

- `javascript-standards.md` → `javascript-advanced/SKILL.md`
- `react-standards.md` → `react/SKILL.md`
- `nodejs-standards.md` → `nodejs/SKILL.md`
- `electron-standards.md` → `electron/SKILL.md`
- `mysql-standards.md` → `mysql/SKILL.md`
- `postgresql-standards.md` → `postgresql/SKILL.md`
- `database-common-standards.md` → `database-common/SKILL.md`

