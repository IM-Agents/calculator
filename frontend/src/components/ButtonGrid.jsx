import CalculatorButton from './CalculatorButton.jsx';
import styles from './ButtonGrid.module.css';

export default function ButtonGrid({ onButton, disabled }) {
  const b = (label, variant, opts = {}) => (
    <CalculatorButton
      key={label + (opts.ariaLabel ?? '')}
      label={label}
      variant={variant}
      wide={opts.wide}
      ariaLabel={opts.ariaLabel}
      disabled={disabled}
      onPress={() => onButton(label)}
    />
  );

  return (
    <div className={styles.grid}>
      <div className={styles.memRow}>
        {b('MC', 'mem', { ariaLabel: 'Memory clear' })}
        {b('MR', 'mem', { ariaLabel: 'Memory recall' })}
        {b('M-', 'mem', { ariaLabel: 'Memory subtract' })}
        {b('M+', 'mem', { ariaLabel: 'Memory add' })}
      </div>
      <div className={styles.sciRow}>
        {b('sin', 'sci', { ariaLabel: 'Sine' })}
        {b('cos', 'sci', { ariaLabel: 'Cosine' })}
        {b('tan', 'sci', { ariaLabel: 'Tangent' })}
        {b('log', 'sci', { ariaLabel: 'Log base 10' })}
        {b('ln', 'sci', { ariaLabel: 'Natural log' })}
      </div>
      <div className={styles.sciRow}>
        {b('sqrt', 'sci', { ariaLabel: 'Square root' })}
        {b('π', 'sci', { ariaLabel: 'Pi constant' })}
        {b('e', 'sci', { ariaLabel: 'Euler constant' })}
        {b('(', 'sci')}
        {b(')', 'sci')}
      </div>
      <div className={styles.mainRow}>
        {b('AC', 'action')}
        {b('DEL', 'action', { ariaLabel: 'Delete last character' })}
        {b('^', 'op', { ariaLabel: 'Power' })}
        {b('%', 'op', { ariaLabel: 'Modulo' })}
        {b('÷', 'op', { ariaLabel: 'Divide' })}
      </div>
      <div className={styles.mainRow}>
        {b('7', 'num')}
        {b('8', 'num')}
        {b('9', 'num')}
        {b('×', 'op', { ariaLabel: 'Multiply' })}
      </div>
      <div className={styles.mainRow}>
        {b('4', 'num')}
        {b('5', 'num')}
        {b('6', 'num')}
        {b('−', 'op', { ariaLabel: 'Subtract' })}
      </div>
      <div className={styles.mainRow}>
        {b('1', 'num')}
        {b('2', 'num')}
        {b('3', 'num')}
        {b('+', 'op', { ariaLabel: 'Add' })}
      </div>
      <div className={styles.bottomRow}>
        {b('±', 'num', { ariaLabel: 'Toggle sign' })}
        {b('0', 'num')}
        {b('.', 'num')}
        {b('=', 'equals', { wide: true, ariaLabel: 'Equals' })}
      </div>
    </div>
  );
}
