import React from 'react';

const Tweet = ({ 
  tweet, 
  currentIndex, 
  incorrectKey, 
  resetIncorrectKey, 
  inputRef, 
  handleOnChange,
  pointsToAdd, 
  gameEnd }) => {

  const quote = tweet.split('').map( (char, index) => {
    char = String(char);
    //if at the current char
      //if the current char is a space, insert a space and bouncing caret
      //else insert the char with bouncing caret
    //else
      //means we've correctly typed in the char, turn down opacity
      //if char is right before current, display points added
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
            {char}
          </span>
        );
      }
    } else {
      const addPoints = 
        <span className="points-to-add">
          +{pointsToAdd}
        </span>
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
          <span className={currentIndex > index ? "char-correct char" : "char" }>
            {char}
            { isLast ? addPoints : null}
          </span>
        );
      }
    }
  });

  return (
    <>
    <section className="display-tweet">
      <div className="key-input-container">
        <input 
          className="key-input" 
          type="text" 
          ref={inputRef}
          //If game ends, remove handleOnChange so keys are no longer detected 
          onKeyDown={!gameEnd ? handleOnChange : undefined} 
        />
      </div>
      {quote}
    </section>
      {incorrectKey ? resetIncorrectKey() : null}
    </>
  );
};

export default Tweet;
