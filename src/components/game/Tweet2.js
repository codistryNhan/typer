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

    //Each row should contain upto only 30 characters
    for(let i = 0; i < wordCount; i++) {
      count += words[i].length;

      //If count is less than 31, push current word into an array
      //Else join the words and create a div
      if(count < 31) {
        tweetRow.push(words[i]);
      } else if(count > 31) {
        count -= words[i].length;
        charLength -= count;
        i--;

        tweetRow = tweetRow.join("");
        text.push(<div>{tweetRow}</div>);
        count = 0;
        tweetRow = [];
        console.log(charLength);
      }

      //Pushes the last arrays of words
      if(i === wordCount - 1) {
        tweetRow = tweetRow.join("");
        text.push(<div>{tweetRow}</div>);
        count = 0;
        tweetRow = [];
      }
    
    }

  }

  return (
    <div>
      {text}
    </div> 
  );
}

export default Tweet2;