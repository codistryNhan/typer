import React from 'react';

const Timer = ({timer}) => {
  return(
    <div className="timer-container">
      <div className="timer-header">
        TIME LEFT
      </div>
      <div className="timer-body">
        {timer}
      </div>
    </div>
  );
}

export default Timer;