import styles from './Display.module.css';

export default function Display({ value, error }) {
  return (
    <div className={styles.wrap} role="region" aria-live="polite" aria-label="Calculator display">
      {error ? (
        <div className={styles.error} role="alert">
          {error}
        </div>
      ) : null}
      <div className={styles.expr} title={value}>
        {value || '0'}
      </div>
    </div>
  );
}
