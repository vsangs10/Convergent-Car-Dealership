import React from 'react';
import CarList from './components/CarList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Convergent Car Dealership</h1>
      </header>
      <CarList />
      <footer className="App-footer">
        <p>&copy; 2025 Convergent Car Dealership. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;