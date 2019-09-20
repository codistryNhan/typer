import React from 'react';

const LastTypedKey = props => {
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
    <section className="input-container">

      <div className="input-header">Last Keys Typed</div>

      <div className="input">
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

export default LastTypedKey;