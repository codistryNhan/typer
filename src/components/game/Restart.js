import React from 'react';
import './Restart.css'

function Restart(props) {

  return(
    <div className="restart-container">
      <button onClick={props.reset}>Restart</button>
    </div>
  )
}

export default Restart;