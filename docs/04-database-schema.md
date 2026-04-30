# Database Schema and Persistence Notes

## V1 Recommendation
A database is not strictly required for V1 because history persistence is optional and capped to the last 10 calculations. For the first release, history can be maintained in frontend state or localStorage.

## If Backend Persistence Is Required
Use MySQL with a minimal schema.

## Suggested Table: `calculation_history`
```sql
CREATE TABLE calculation_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  expression VARCHAR(255) NOT NULL,
  result VARCHAR(255) NOT NULL,
  angle_mode ENUM('deg', 'rad') NOT NULL DEFAULT 'deg',
  status ENUM('success', 'error') NOT NULL DEFAULT 'success',
  error_code VARCHAR(100) NULL,
  error_message VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_created_at (created_at)
);
```

## Useful Queries
### Insert successful calculation
```sql
INSERT INTO calculation_history (
  expression,
  result,
  angle_mode,
  status
) VALUES (?, ?, ?, 'success');
```

### Insert failed calculation
```sql
INSERT INTO calculation_history (
  expression,
  result,
  angle_mode,
  status,
  error_code,
  error_message
) VALUES (?, '', ?, 'error', ?, ?);
```

### Get latest 10 calculations
```sql
SELECT id, expression, result, angle_mode, status, error_code, error_message, created_at
FROM calculation_history
ORDER BY created_at DESC
LIMIT 10;
```

### Delete older history and keep latest 10 (optional housekeeping)
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
