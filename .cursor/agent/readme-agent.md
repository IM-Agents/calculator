# Custom Agents README

This folder contains project-level custom subagents for specialized workflows.

## Agents

| Agent | File | Use when |
|---|---|---|
| `architecture-agent` | `architecture-agent.md` | Designing system boundaries, trade-offs, and rollout plans |
| `bug-fixer` | `bug-fixer.md` | Debugging runtime errors, regressions, and failing tests |
| `new-requirement-implementer` | `new-requirement-implementer.md` | Implementing new features and business requirements |
| `performance-optimizer` | `performance-optimizer.md` | Improving latency, throughput, memory, and bundle/query performance |
| `plan-execute-agent` | `plan-execute-agent.md` | Complex tasks requiring phased planning and execution |
| `requirements-architect` | `requirements-architect.md` | Clarifying ambiguous requirements and defining acceptance criteria |
| `security-review-agent` | `security-review-agent.md` | Security-focused review before merge/release or after auth/API changes |

## How to use

Ask Cursor to use a specific agent for a task, for example:

- "Use the `bug-fixer` agent to diagnose this failing test."
- "Use the `architecture-agent` to design the service boundaries."
- "Use the `new-requirement-implementer` for this feature."

## Authoring conventions

- Each agent file must include YAML frontmatter with:
  - `name`
  - `description`
- Keep prompts actionable and workflow-oriented.
- Prefer one primary concern per agent.

## Maintenance

- Update this README whenever a new agent is added or renamed.
- Keep agent descriptions specific so routing is accurate.
