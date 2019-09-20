import React from 'react';

const Multiplier = props => {
  return (
    <div>
      <div>
        MULTIPLIER
      </div>
      <span className="stat-number">
        {props.multiplier}x
      </span>
    </div>
  );
};

export default Multiplier;