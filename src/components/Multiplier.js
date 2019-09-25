import React from 'react';

const Multiplier = ({multiplier}) => {
  const starClass = `fas fa-star rotate-speed-${multiplier}`;
  const star = <i className={starClass}></i>;

  return (
    <div className="stat">
      <div>
        MULTIPLIER 
      </div>
      <div className="stat-number">
        <span className="stat-multiplier">
          {multiplier}
          <span className="star">{star}</span>
        </span>
        
      </div>
    </div>
  );
};

export default Multiplier;