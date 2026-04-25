# Database / Persistence Schema

## Persistence Strategy
V1 can run without a database by using in-memory storage or localStorage for history. If backend persistence is enabled, use a lightweight relational structure.

## Recommended Table: `calculation_history`

```sql
CREATE TABLE calculation_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  expression VARCHAR(255) NOT NULL,
  result VARCHAR(255) NOT NULL,
  angle_mode ENUM('DEG', 'RAD') NOT NULL DEFAULT 'DEG',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Recommended Query: Insert Calculation
```sql
INSERT INTO calculation_history (expression, result, angle_mode)
VALUES (?, ?, ?);
```

## Recommended Query: Get Last 10 Calculations
```sql
SELECT id, expression, result, angle_mode, created_at
FROM calculation_history
ORDER BY created_at DESC
LIMIT 10;
```

## Recommended Query: Clear History
```sql
DELETE FROM calculation_history;
```

## Notes
- `result` is stored as string to preserve formatted display output
- No user table is required for V1
- If MySQL is later adopted across the broader automation stack, this schema is compatible
