import { Button } from './Button.jsx';

const FUNCS = [
  { label: 'sin', insert: 'sin(', aria: 'Sine' },
  { label: 'cos', insert: 'cos(', aria: 'Cosine' },
  { label: 'tan', insert: 'tan(', aria: 'Tangent' },
  { label: 'log', insert: 'log(', aria: 'Log base 10' },
  { label: 'ln', insert: 'ln(', aria: 'Natural log' },
  { label: '√', insert: 'sqrt(', aria: 'Square root' },
  { label: 'π', insert: 'pi', aria: 'Pi constant' },
  { label: 'e', insert: 'e', aria: "Euler's number" },
];

export function ScientificPad({ onAppend }) {
  return (
    <div className="scientific-pad">
      {FUNCS.map((f) => (
        <Button
          key={f.insert}
          label={f.label}
          variant="function"
          ariaLabel={f.aria}
          onClick={() => onAppend(f.insert)}
        />
      ))}
    </div>
  );
}
