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
        <Route path="/typer/highscores">
          <Header />
          <HighScores />
        </Route>

        <Route path="/typer/game">
          <Header />
          <Game />
        </Route>

        <Route path="/typer">
          <LandingPage />
        </Route>

      </Switch>
    </>
    </Router>
  );
}

export default App;
