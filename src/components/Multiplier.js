import React from 'react';

const Multiplier = ({multiplier}) => {
  const starClass = `fas fa-star rotate-speed-${multiplier}`;
  const star = <i className={starClass}></i>;
  const arrowUp = <div className="multiplier-arrow-up">
                    <i className="fas fa-arrow-alt-up"></i>
                  </div>;

  return (
    <div className="multiplier-container">
      <div className="multiplier-header">
        {arrowUp}
        SCORE MULTIPLIER NOW
        {arrowUp}
      </div>
      <div>
        <div className="multiplier-body">
          {multiplier} 
        </div>
      </div>
    </div>
  );
};

export default Multiplier;