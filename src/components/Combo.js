import React from 'react';

const Combo = props => {
  return (
    <div>
      <div>
        COMBO
      </div>
      <span className="stat-number">
        {props.combo}
      </span>
    </div>
  );
}

export default Combo;