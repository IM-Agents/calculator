# Calculator Web Application - Data Structures / DB Schema

## 1. Persistence Strategy
For V1, persistence is optional. The simplest approach is:
- Keep active expression, angle mode, memory state, and history in React state
- Optionally persist history to localStorage
- Add backend persistence only if required

If backend persistence is needed, the following schema is recommended.

## 2. History Entity

### Table: `calculation_history`
| Field | Type | Notes |
|---|---|---|
| id | BIGINT / INT | Primary key |
| expression | VARCHAR(255) | User-entered or normalized expression |
| result | VARCHAR(255) | Store as string for formatting safety |
| angle_mode | ENUM('deg','rad') | Angle mode used for evaluation |
| created_at | DATETIME / TIMESTAMP | Entry creation timestamp |

## 3. Optional Memory Entity

### Table: `calculator_memory`
| Field | Type | Notes |
|---|---|---|
| id | BIGINT / INT | Primary key |
| memory_value | DECIMAL(20,10) or VARCHAR(255) | Depends on precision needs |
| updated_at | DATETIME / TIMESTAMP | Last updated time |

## 4. Suggested In-Memory Backend Models
```js
{
  expression: '2+2',
  result: '4',
  angleMode: 'deg',
  createdAt: '2025-01-01T10:00:00.000Z'
}
```

```js
{
  memoryValue: '0',
  updatedAt: '2025-01-01T10:00:00.000Z'
}
```

## 5. Data Rules
- Keep history capped at 10 most recent entries in V1 UI
- Preserve result formatting consistently
- If backend persistence exists, sort history by newest first
- Support clearing memory and clearing history independently

## 6. MySQL Notes
If MySQL is used later:
- Prefer `VARCHAR` for formatted result storage to avoid losing scientific display formatting
- Use timestamps in UTC
- Add indexes only when persistence scope expands beyond a lightweight calculator

## 7. Recommendation
For this calculator project, a full relational database is **not required for V1** unless persistence is mandatory. Since the broader preferred stack includes MySQL, it can be introduced later for history persistence if the product scope grows.
