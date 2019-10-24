import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Game from './components/game/Game';
import Header from './components/header/Header';
import LandingPage from './components/landing-page/LandingPage';
import HighScores from './components/high-scores/HighScores';


function App() {
  return (
    <Router>
    <>
      <Switch>
        <Route path="/highscores">
          <Header />
          <HighScores />
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
