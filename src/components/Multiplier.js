import React from 'react';

const Multiplier = ({multiplier}) => {
  const fullStar = <i className="fas fa-star"></i>;
  const emptyStar = <i className="far fa-star"></i>;

  const starClass = `fas fa-star rotate-speed-${multiplier}`;
  const star = <i className={starClass}></i>;

  return (
    <div className="stat">
      <div>
        MULTIPLIER 
      </div>
      <div className="stat-number">
        {multiplier}
        <span className="star">{star}</span>
      </div>
    </div>
  );
};

export default Multiplier;