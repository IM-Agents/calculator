import Calculator from "./components/Calculator.jsx";

export default function App() {
  return (
    <div className="app-root">
      <main className="container" role="main">
        <header className="app-header">
          <h1 className="app-title">Calculator</h1>
          <p className="app-subtitle">
            Responsive calculator with scientific functions and shared history.
          </p>
        </header>
        <Calculator />
      </main>
    </div>
  );
}
