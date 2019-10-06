import React from 'react';

const MultiplierStars = ({multiplier}) => {
  const flagOff = <div className="multiplier-stars-flag">
                    <i class="fa-lg far fa-flag-usa"></i>
                  </div>;

  const flagOn = <div className="multiplier-stars-flag multiplier-stars-flag-on">
                  <i class="fa-lg far fa-flag-usa"></i>
                  </div>;

  let flags = [];
  for(let i = 1; i <= 3; i++) {
    i < multiplier ? flags.push(flagOn) : flags.push(flagOff);    
  }

  return (
    <div className="multiplier-stars-container">
        <div className="multiplier-stars-header">
          MULTIPLIER
        </div>
        <div className="multiplier-stars-body">
          {flags}
        </div>
        <div>
          {multiplier}X
        </div>
      </div>
  );
}

export default MultiplierStars;