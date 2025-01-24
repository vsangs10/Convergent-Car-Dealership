// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


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
    </div>
  );
}

export default App;
