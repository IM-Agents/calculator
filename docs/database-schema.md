# Database / Persistence Notes

## V1 Recommendation
A database is **not strictly required** for the first version because the PRD only requires the last 10 calculations and marks persistence as optional.

## V1 Storage Option
- Use in-memory storage on the backend for calculation history
- Keep only the latest 10 successful calculations

## Suggested Future Table
If persistent history is added later, use a simple table like:

```sql
CREATE TABLE calculation_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  expression VARCHAR(255) NOT NULL,
  result VARCHAR(255) NOT NULL,
  angle_mode ENUM('DEG', 'RAD') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Query Examples

### Insert History Row
```sql
INSERT INTO calculation_history (expression, result, angle_mode)
VALUES (?, ?, ?);
```

### Get Latest 10 Rows
```sql
SELECT id, expression, result, angle_mode, created_at
FROM calculation_history
ORDER BY created_at DESC
LIMIT 10;
```

### Clear History
```sql
DELETE FROM calculation_history;
```

## Notes
- Keep persistence optional in V1
- If Nirav later wants durable history, localStorage or DB can be added without major frontend changes
- No user/auth model is needed for the current scope
