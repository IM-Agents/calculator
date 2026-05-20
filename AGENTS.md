# AGENTS Operating Rules

This file defines baseline rules for all agents working in this repository.

## 1) Rule Priority

Apply instructions in this order:

1. Direct user request
2. Repository rules in `.cursor/rules/`
3. This `AGENTS.md`
4. Do not change in docs folder and figma-tree.md file
5. For the folder structure use for the our architecture skill and agnet.
6. Create .gitignore file root folder
7. All plan create plan/[name].md

If rules conflict, follow the higher-priority source and document the decision.

## 2) Canonical Sources

- Active standards: `.cursor/rules/*.mdc`
- Workspace guide: `.cursor/README.md`
- Reusable workflows: `.cursor/skills/`
- Role prompts: `.cursor/agents/`

## 3) Core Behavior Rules

- MUST identify the active stack before coding (JavaScript, React, Node.js, Electron, MySQL, PostgreSQL, shared SQL).
- MUST apply matching stack rules from `.cursor/rules/`.
- MUST keep changes small, reviewable, and reversible.
- MUST preserve security and performance constraints.
- MUST avoid hidden side effects and silent failure handling.
- MUST avoid unbounded async concurrency and unbounded database operations.
- SHOULD reuse existing patterns before introducing new abstractions.
- SHOULD add concise comments only when logic is not self-evident.

## 4) Change Workflow

1. Understand request and locate affected files.
2. Select applicable stack rule(s).
3. Implement minimal correct change.
4. Validate behavior (tests/lint/checks as applicable).
5. Summarize what changed, why, and any follow-up actions.

## 5) Quality Gates

Before finalizing:

- Confirm no contradiction with `.cursor/rules/*.mdc`.
- Confirm naming consistency and predictable structure.
- Confirm error handling is explicit.
- Confirm no obvious security regression.
- Confirm no obvious performance regression.

## 6) Communication Standard

- Be concise, clear, and action-oriented.
- State assumptions when context is missing.
- Report blockers immediately with concrete options.
- Prefer direct implementation over long speculative planning unless asked.

