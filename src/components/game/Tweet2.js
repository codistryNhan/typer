import React from 'react';

const Tweet2 = ({tweet}) => {
  let text = [];

  if(tweet.length > 0) {

    let tweetRow = [], words = [], wordCount = 0;
    let count = 0, charLength = tweet.length;
    words = tweet.split(" ");
    
    wordCount = words.length;

    words = words.map( (word, index) => {
      if(index !== wordCount - 1) {
        return word + " ";
      } else {
        return word;
      }
    });

    for(let i = 0; i < wordCount; i++) {
      count += words[i].length;

      if(count < 31) {
        tweetRow.push(words[i]);
      } else if(count > 31 || (charLength < 31 && charLength > 0)) {
        count -= words[i].length;
        charLength -= count;
        i--;

        tweetRow = tweetRow.join("");
        text.push(<div>{tweetRow}</div>);
        count = 0;
        tweetRow = [];
        console.log(charLength);
      }
      
      
    }
 
    console.log(text);
  }

  return (
    <div>
      {text}
    </div> 
  );
}

export default Tweet2;