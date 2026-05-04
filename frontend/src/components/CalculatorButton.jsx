import styles from './CalculatorButton.module.css';

export default function CalculatorButton({
  label,
  variant = 'num',
  wide = false,
  ariaLabel,
  disabled,
  onPress,
}) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[variant] ?? ''} ${wide ? styles.wide : ''}`}
      aria-label={ariaLabel ?? label}
      disabled={disabled}
      onClick={onPress}
    >
      {label}
    </button>
  );
}
