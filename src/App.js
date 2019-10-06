import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from './components/game/Game';
import Header from './components/header/Header';
import LandingPage from './components/landing-page/LandingPage';
import Nav from './components/Nav';
import Results from './components/game/Results'


function App() {
  return (
    <Router>
    <>
    <Switch>
      <Route path="/results">
        <Header />
        <Results />
      </Route>

      <Route path="/game">
        <Header />
        <Game />
      </Route>

      <Route path="/">
        <LandingPage />
      </Route>

    </Switch>
    {/*<Header />

    <section className="main">
      <Game />

      <div className="info desktop-resolution">
        <table className="combo-table">
          <tr>
            <td>Combos</td>
            <td>10</td>
            <td>30</td>
            <td>50</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Points Multiplier</td>
            <td>2X</td>
            <td>3X</td>
            <td>4X</td>
            <td>5X</td>
          </tr>
        </table>

        <div className="progress">
          <p>Game is still a work in progress</p>
          <p>So there are a bunch of things that doesn't make sense yet, sorry.</p>
        </div> 
      </div>
    </section> */}
    </>
    </Router>
  );
}

export default App;
