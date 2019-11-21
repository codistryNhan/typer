import React from 'react';
import './Timer.css';

const Timer = ({timer}) => {
  timer = String(timer).padStart(3,'0');
  const len = timer.length;
  const timerLeft = timer.slice(0, len - 1)
  const timerRight = timer.slice(len - 1);
  
  return(
    <div className="timer-container">
      <div className="timer-header noselect">
        TIME LEFT
      </div>
      <div className="timer-body">
        {timerLeft}:{timerRight}
      </div>
    </div>
  );
}

export default Timer;