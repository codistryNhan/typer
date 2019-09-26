import React from 'react';

const DisplayTweet = ({ tweet, currentIndex, incorrectKey, resetIncorrectKey, inputRef, handleOnChange, pointsToAdd }) => {
  const quote = tweet.split('').map( (char, index) => {
    
    //if at the current char
      //if the current char is a space, insert a space and bouncing caret
      //else insert the char with bouncing caret
    //else
      //means we've correctly typed in the char, turn down opacity
    if(currentIndex === index) {
      if(char === ' ') {
        return (
          <>
          <span className="char">
            <span className={incorrectKey ? "caret-space caret-space-error" : "caret-space"}><i className="fas fa-lg fa-caret-up"></i></span>
            <span key={index+100}>{'\xa0'}</span>
          </span>
          <span> </span>
          </>
        );
      } else {
        return (
          <span className="char">
            <span className={incorrectKey ? "caret caret-error" : "caret"}>
              <i className="fas fa-lg fa-caret-up"></i>
            </span>
            <span className="char-enlarge">{char}</span>
          </span>
        );
      }
    } else {
      const addPoints = <span className="points-to-add">+{pointsToAdd}pts</span>
      const isLast = (index === currentIndex - 1);

      if(char === ' ') {
        return (
          <span className="char">
            <span key={index+100}>{'\xa0'}</span>
            { isLast ? addPoints : null}
            <span> </span>
          </span>
        ); 
      } else {
        return(
          <>
          <span className="char">
            <span className={currentIndex > index ? "char-correct" : null }>{char}</span>
            { isLast ? addPoints : null}
          </span>
          </>
        );
      }
    }
  });

  return (
    <>
    <section className="display-tweet">
      {quote}
      <div className="key-input-container">
        <input className="key-input" type="text" ref={inputRef} onKeyDown={handleOnChange} />
      </div>
    </section>
      {incorrectKey ? resetIncorrectKey() : null}
    </>
  );
};

export default DisplayTweet;
