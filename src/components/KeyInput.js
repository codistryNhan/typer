import React from 'react';

const KeyInput = ({handleOnChange}) => {
  return (
    <input className="key-input" type="text" onChange={handleOnChange}/>
  )
}

export default KeyInput;