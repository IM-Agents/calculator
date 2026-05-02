import Calculator from './components/Calculator.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">Calculator</h1>
      </header>
      <main className="app-main">
        <Calculator />
      </main>
    </div>
  );
}
