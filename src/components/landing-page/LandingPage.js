import React from 'react';
import './landing-page.css';
import { BrowserRouter as Router, Link } from "react-router-dom";

const LandingPage = (props) => {
  return(
    <>
    <div className="landing-page-container">
      <section className="landing-hero">
        <div>
          <header>
            <div className="landing-hero-logo-container">
              <img alt="typerLogo" className="landing-hero-logo" src="/blueBody.svg" />
            </div>
          </header>

          <div className="landing-hero-phrase">
            <h2>Tweeter in Chief</h2>
            <p>Improve your typing and foreign policy skills at the same time by typing out the tweets from the President of the United States as fast as you can!</p>
          </div>

          <div className="landing-hero-btn-container">
            <Link to="/game">
              <button className="btn btn-primary">
                Play Game
              </button>
            </Link>
            
            <Link to="/highscores">
              <button className="btn">
                High Scores
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default LandingPage;