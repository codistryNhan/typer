import React from 'react';

const Quote = (props) => {
  const quote = props.quote.split('').map( (char, index) => {
    
    //if at the current char
      //if the current char is a space, insert a space and bouncing caret
      //else insert the char with bouncing caret
    //else
      //means we've correctly typed in the char, turn down opacity
    if(props.currentIndex === index) {
      if(char == ' ') {
        return (
          <>
          <span className="char">
            <span className="caret-space"><i className="fas fa-caret-up"></i></span>
            <span key={index+100}>{'\xa0'}</span>
          </span>
          <span> </span>
          </>
        );
      } else {
        return (
          <span className="char">
            <span className="caret"><i className="fas fa-caret-up"></i></span>
            <span className="char-enlarge">{char}</span>
          </span>
        );
      }
    } else {
      if(char == ' ') {
        return (
          <span className="char">
            <span key={index+100}>{'\xa0'}</span>
            <span> </span>
          </span>
        ); 
      } else {
        return(
          <span className={props.currentIndex > index ? "char char-correct" : "char" }>{char}</span>
        );
      }
    }
  });

  return (
    <section className="quote-display">
      {quote}
    </section>
  );
};

export default Quote;