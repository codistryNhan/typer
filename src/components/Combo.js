import React from 'react';

const Combo = props => {
  return (
    <div className="stat">
      <div>
        COMBO
      </div>
      <div className="stat-number">
        {props.combo}
      </div>
    </div>
  );
}

export default Combo;