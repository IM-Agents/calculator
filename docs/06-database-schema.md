# Database Schema

## 1. V1 Storage Recommendation
For the current calculator scope, persistent storage is **optional**. V1 can ship without a database by keeping:
- current input in frontend state
- memory value in frontend state
- history in frontend state or localStorage

## 2. Why a Schema Is Still Provided
The broader preferred ecosystem often uses **MySQL**, and future persistence for history or user sessions may be useful. The following schema prepares for that upgrade path.

## 3. Proposed MySQL Schema

### Table: `calculation_history`
```sql
CREATE TABLE calculation_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  expression VARCHAR(255) NOT NULL,
  result VARCHAR(100) NOT NULL,
  angle_mode ENUM('deg', 'rad') NOT NULL DEFAULT 'deg',
  status ENUM('success', 'error') NOT NULL DEFAULT 'success',
  error_code VARCHAR(100) NULL,
  error_message VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_created_at (created_at)
);
```

## 4. Optional Future Table: `calculator_sessions`
```sql
CREATE TABLE calculator_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  session_key VARCHAR(100) NOT NULL,
  memory_value DECIMAL(30,10) NOT NULL DEFAULT 0,
  angle_mode ENUM('deg', 'rad') NOT NULL DEFAULT 'deg',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_session_key (session_key)
);
```

## 5. Query Examples
### Insert successful history item
```sql
INSERT INTO calculation_history (
  expression,
  result,
  angle_mode,
  status
) VALUES (
  'sin(30)',
  '0.5',
  'deg',
  'success'
);
```

### Insert failed history item
```sql
INSERT INTO calculation_history (
  expression,
  result,
  angle_mode,
  status,
  error_code,
  error_message
) VALUES (
  'sqrt(-1)',
  'ERROR',
  'deg',
  'error',
  'INVALID_DOMAIN',
  'Square root of a negative number is not allowed.'
);
```

### Fetch latest 10 entries
```sql
SELECT id, expression, result, angle_mode, status, error_code, error_message, created_at
FROM calculation_history
ORDER BY created_at DESC, id DESC
LIMIT 10;
```

## 6. Recommendation
Use no database in the first implementation unless persistence is explicitly required. If persistence is added, use MySQL with the schema above to stay aligned with the wider stack preference.
