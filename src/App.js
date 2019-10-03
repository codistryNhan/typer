import React from 'react';
import Game from './components/game/Game';
import Header from './components/Header';


function App() {
  return (
    <>
    <header>
      <div>
        <p className="header">FREEDOM TYPER</p>
        <img className="logo" alt="logo" src="/logoTyper.svg" /> 
      </div>
    </header>
    <Game />
    </>
  );
}

export default App;
