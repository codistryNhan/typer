import React from 'react';

const Timer = ({timer}) => {
  return(
    <div className="stat-element-container">
      <div className="stat-element-header">
        TIME LEFT
      </div>
      <div className="stat-element-body">
        {timer}
      </div>
    </div>
  );
}

export default Timer;