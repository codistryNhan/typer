import React from 'react';
import './Restart.css'

function Restart(props) {

  return(
    <button className="restart-container btn" onClick={props.reset}>Restart</button>
  )
}

export default Restart;