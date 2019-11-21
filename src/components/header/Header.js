import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import './header.css';


const Header = () => {
  return (
    <header className="main-header">
      <Link to="/">
        <div className="main-header-brand"> 
          <div className="header-logo-container">
            <img className="header-logo" alt="logo" src="/typerLogo3.svg" />
          </div>
        </div>
        
        <div className="back-button"><i class="fas fa-arrow-left"></i></div>
      </Link> 
    </header>
  );
}

export default Header;