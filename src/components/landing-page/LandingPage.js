import React from 'react';
import './landing-page.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const LandingPage = (props) => {
  return(
    <>
    <div className="landing-page-container">
      <section className="landing-hero">
        <div>
          <header>
            <div className="landing-hero-logo-container">
              <img className="landing-hero-logo" src="/logoTyper.svg" />
            </div>
            
            <span className="landing-hero-title">FREEDOM TYPER</span>
          </header>

          <div className="landing-hero-phrase">
            <p>Improve your typing and foreign policy skills at the same time by typing out the tweets from the President of the United States as fast as you can!</p>
          </div>

          <div className="landing-hero-btn-container">
            <Link to="/game">
              <button className="landing-hero-btn">
                Play Game
              </button>
            </Link>
            
            <button className="landing-hero-btn">
              Top Scores
            </button>
            <button className="landing-hero-btn">
              About
            </button>
          </div>
        </div>
      </section>
    </div>
    
    </>
  );
};

export default LandingPage;