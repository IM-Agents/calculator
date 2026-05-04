import Display from './Display.jsx';
import ModeToggle from './ModeToggle.jsx';
import ButtonGrid from './ButtonGrid.jsx';
import HistoryPanel from './HistoryPanel.jsx';
import styles from './CalculatorLayout.module.css';

export default function CalculatorLayout({
  displayValue,
  error,
  angleMode,
  onAngleModeChange,
  history,
  onHistoryClear,
  onButton,
  disabled,
}) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Calculator</h1>
        <p className={styles.sub}>Scientific mode · keyboard supported</p>
      </header>
      <div className={styles.shell}>
        <section className={styles.calc} aria-label="Calculator">
          <ModeToggle angleMode={angleMode} onChange={onAngleModeChange} />
          <Display value={displayValue} error={error} />
          <ButtonGrid onButton={onButton} disabled={disabled} />
        </section>
        <HistoryPanel entries={history} onClear={onHistoryClear} />
      </div>
    </div>
  );
}
