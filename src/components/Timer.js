import React from 'react';

const Timer = ({timer}) => {
  return(
    <div className="stat-timer-container">
      <div>Time Left</div>
      <div className="stat-timer">
        {timer}
      </div>
    </div>
  );
}

export default Timer;