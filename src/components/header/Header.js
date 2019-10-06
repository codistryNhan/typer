import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './header.css';


const Header = () => {
  return (
    <header className="main-header">
      <Link to="/">
        <div className="main-header-brand"> 
          <div className="header-logo-container">
            <img className="header-logo" alt="logo" src="/logoTyper.svg" /> 
          </div>
          <div className="header-title">FREEDOM TYPER</div>
        </div>   
      </Link> 
    </header>
  );
}

export default Header;