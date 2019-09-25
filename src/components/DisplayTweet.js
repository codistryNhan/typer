import React from 'react';

const DisplayTweet = ({ tweet, currentIndex, incorrectKey, resetIncorrectKey }) => {
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
      if(char === ' ') {
        return (
          <span className="char">
            <span key={index+100}>{'\xa0'}</span>
            <span> </span>
          </span>
        ); 
      } else {
        return(
          <span className={currentIndex > index ? "char char-correct" : "char" }>{char}</span>
        );
      }
    }
  });

  return (
    <>
    <section className="display-tweet">
      {quote}
    </section>
      {incorrectKey ? resetIncorrectKey() : null}
    </>
  );
};

export default DisplayTweet;
