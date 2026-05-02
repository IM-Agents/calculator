import { Button } from './Button.jsx';

export function MemoryControls({ onMc, onMr, onMPlus, onMMinus }) {
  return (
    <div className="memory-controls" role="group" aria-label="Memory">
      <Button label="MC" variant="memory" ariaLabel="Memory clear" onClick={onMc} />
      <Button label="MR" variant="memory" ariaLabel="Memory recall" onClick={onMr} />
      <Button label="M+" variant="memory" ariaLabel="Memory add" onClick={onMPlus} />
      <Button label="M−" variant="memory" ariaLabel="Memory subtract" onClick={onMMinus} />
    </div>
  );
}
