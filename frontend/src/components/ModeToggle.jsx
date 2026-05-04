import styles from './ModeToggle.module.css';

export default function ModeToggle({ angleMode, onChange }) {
  return (
    <div className={styles.wrap} role="group" aria-label="Angle mode">
      <span className={styles.label}>Angle</span>
      <div className={styles.toggle}>
        <button
          type="button"
          className={`${styles.pill} ${angleMode === 'deg' ? styles.active : ''}`}
          aria-pressed={angleMode === 'deg'}
          onClick={() => onChange('deg')}
        >
          Deg
        </button>
        <button
          type="button"
          className={`${styles.pill} ${angleMode === 'rad' ? styles.active : ''}`}
          aria-pressed={angleMode === 'rad'}
          onClick={() => onChange('rad')}
        >
          Rad
        </button>
      </div>
    </div>
  );
}
