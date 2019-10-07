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
    </>
    </Router>
  );
}

export default App;
