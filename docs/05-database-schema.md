# 05 - Database / Data Schema

## V1 Recommendation
A database is **not required** for the initial version because the PRD only requires the last 10 calculations and allows optional persistence. The simplest V1 path is:
- Frontend state for immediate rendering
- Backend in-memory store for API-driven history consistency

## Optional Persistent Schema
If persistent history is added later, use a lightweight table like the following.

## Table: `calculation_history`

| Column | Type | Description |
|---|---|---|
| id | BIGINT / INT AUTO_INCREMENT | Primary key |
| expression | VARCHAR(255) | User-entered expression |
| result | VARCHAR(255) | Stored as string to avoid formatting loss for very large/precise values |
| angle_mode | ENUM('DEG','RAD') | Mode used for trig calculations |
| created_at | DATETIME / TIMESTAMP | Creation timestamp |

## Suggested SQL (MySQL)
```sql
CREATE TABLE calculation_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  expression VARCHAR(255) NOT NULL,
  result VARCHAR(255) NOT NULL,
  angle_mode ENUM('DEG', 'RAD') NOT NULL DEFAULT 'DEG',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Suggested Query Patterns

### Insert history item
```sql
INSERT INTO calculation_history (expression, result, angle_mode)
VALUES (?, ?, ?);
```

### Fetch latest 10 calculations
```sql
SELECT id, expression, result, angle_mode, created_at
FROM calculation_history
ORDER BY created_at DESC
LIMIT 10;
```

### Delete excess history beyond retention policy
If hard-capping persistence to 10 rows globally:
```sql
DELETE FROM calculation_history
WHERE id NOT IN (
  SELECT id FROM (
    SELECT id
    FROM calculation_history
    ORDER BY created_at DESC
    LIMIT 10
  ) AS latest
);
```

## Notes
- For single-user local usage, localStorage may be more practical than a database.
- If a backend database is introduced later, MySQL fits the broader preferred stack.
- Store `result` as string if precision-preserving formatting matters.
