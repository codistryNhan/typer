import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import './header.css';


const Header = () => {
  const [prevScrollpos, setPrevScrollpos] = useState(
    window.pageYOffset
  );

  const [visible, setVisible] = useState(
    true
  );

  useEffect(
    () => {
      window.addEventListener('scroll', handleScroll);
    }
  )

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
  
    setPrevScrollpos(currentScrollPos);
    setVisible(visible);
  }
  
  return (
    <header className={"main-header " + (!visible ? "navbar--hidden" : "")}>
      <Link to="/">
        <button className="back-button"><i class="fas fa-arrow-left"></i></button>
      </Link> 
    </header>
  );
}

export default Header;