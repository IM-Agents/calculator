import { Button } from './Button.jsx';

export function Keypad({ onAppend, onEquals, onClear, onBackspace, onToggleSign }) {
  const digit = (d) => () => onAppend(d);
  const op = (o) => () => onAppend(o);

  return (
    <div className="keypad" role="group" aria-label="Keypad">
      <Button label="AC" variant="danger" ariaLabel="All clear" onClick={onClear} />
      <Button label="⌫" variant="ghost" ariaLabel="Backspace" onClick={onBackspace} />
      <Button label="(" variant="ghost" ariaLabel="Open parenthesis" onClick={op('(')} />
      <Button label=")" variant="ghost" ariaLabel="Close parenthesis" onClick={op(')')} />

      <Button label="7" onClick={digit('7')} />
      <Button label="8" onClick={digit('8')} />
      <Button label="9" onClick={digit('9')} />
      <Button label="÷" variant="operator" ariaLabel="Divide" onClick={op('/')} />

      <Button label="4" onClick={digit('4')} />
      <Button label="5" onClick={digit('5')} />
      <Button label="6" onClick={digit('6')} />
      <Button label="×" variant="operator" ariaLabel="Multiply" onClick={op('*')} />

      <Button label="1" onClick={digit('1')} />
      <Button label="2" onClick={digit('2')} />
      <Button label="3" onClick={digit('3')} />
      <Button label="−" variant="operator" ariaLabel="Subtract" onClick={op('-')} />

      <Button label="±" variant="ghost" ariaLabel="Toggle sign" onClick={onToggleSign} />
      <Button label="0" onClick={digit('0')} />
      <Button label="." onClick={digit('.')} />
      <Button label="+" variant="operator" ariaLabel="Add" onClick={op('+')} />

      <Button label="%" variant="operator" ariaLabel="Modulo" onClick={op('%')} />
      <Button label="^" variant="operator" ariaLabel="Power" onClick={op('^')} />
      <Button label="=" variant="equals" wide ariaLabel="Equals" onClick={onEquals} />
    </div>
  );
}
