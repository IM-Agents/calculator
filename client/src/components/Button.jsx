export function Button({
  label,
  onClick,
  variant = 'default',
  wide = false,
  ariaLabel,
  className = '',
}) {
  return (
    <button
      type="button"
      className={`calc-btn calc-btn--${variant}${wide ? ' calc-btn--wide' : ''} ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
}
