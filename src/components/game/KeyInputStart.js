import React from 'react';

const KeyInputStart = ({handleStart}) => {
  return (
    <input className="key-input" type="text" onChange={handleStart}/>
  )
}

export default KeyInputStart;