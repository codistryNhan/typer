import React from 'react';

const Timer = ({timer}) => {
  timer = String(timer).padStart(3,'0');
  const len = timer.length;
  const timerLeft = timer.slice(0, len - 1)
  const timerRight = timer.slice(len - 1);
  
  return(
    <div className="timer-container">
      <div className="timer-header">
        TIME LEFT
      </div>
      <div className="timer-body">
        <div className="timer-item">
          {timerLeft}:
          <div className="timer-right">
            {timerRight}
          </div> 
        </div> 
      </div>
    </div>
  );
}

export default Timer;