import React from 'react';
import './App.css';
import Header from './components/Header';
import Players from './components/Players';

function App() {
  return (
    <div>
      <Header />
      <hr/>
      <div>
        <Players />
      </div>
    </div>
  );
}

export default App;
