import React from 'react';
import './App.css';
import Main from './components/Main';

function App({socket}) {
  return (
    <>
      <Main socket={socket} />
    </>
  );
}

export default App;
