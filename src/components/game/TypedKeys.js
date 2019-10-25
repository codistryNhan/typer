import React from 'react';
import './TypedKeys.css';

const TypedKeys = props => {
  const len = props.keyHistory.length;
  let keyHistory = props.keyHistory.map( (char, index) => {
    if(char === ' ') {
      return <span className="key-history-char">{'\xa0'}</span>;
    } else {
      return <span className="key-history-char">{char}</span>;
    }
  });

  if(len > 8){
    keyHistory = keyHistory.slice(len - 9);
  } 

  return (
    <section className="typed-keys-container">

      <div className="typed-keys-header"></div>

      <div className="typed-keys">
        <div className="key-history-container">
          <div className="key-history">
            {keyHistory}
          </div>
          <div className="blinking-cursor">_</div>
        </div>
      </div>

    </section>
  );
}

export default TypedKeys;