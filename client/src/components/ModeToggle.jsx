import { Button } from './Button.jsx';

export function ModeToggle({ angleMode, onChange }) {
  return (
    <div className="mode-toggle" role="group" aria-label="Angle mode">
      <Button
        label="Deg"
        variant={angleMode === 'deg' ? 'accent' : 'ghost'}
        ariaLabel="Degrees mode"
        onClick={() => onChange('deg')}
      />
      <Button
        label="Rad"
        variant={angleMode === 'rad' ? 'accent' : 'ghost'}
        ariaLabel="Radians mode"
        onClick={() => onChange('rad')}
      />
    </div>
  );
}
