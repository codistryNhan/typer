import React from 'react';

const Multiplier = ({multiplier}) => {
  const fullStar = <i className="fas fa-star"></i>;
  const emptyStar = <i className="far fa-star"></i>;

  const starClass = `fas fa-star rotate-speed-${multiplier}`;
  const star = <i className={starClass}></i>;

  return (
    <div>
      <div>
        MULTIPLIER 
      </div>
      <span className="stat-number">
        {multiplier}
        <span className="star">{star}</span>
      </span>
    </div>
  );
};

export default Multiplier;