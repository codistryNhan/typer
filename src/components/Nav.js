import React from 'react';

const Nav = (props) => {
  return(
    <nav className="nav desktop-resolution">
      <div>
        <button>
          About
        </button>
      </div>
      <div>
        <button>
          How to play
        </button>
      </div>
      <div>
        <button>
          Top Scores
        </button>
      </div>
    </nav>
  );
}

export default Nav;