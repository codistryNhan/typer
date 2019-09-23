import React from 'react';
import moment from 'moment';

const TweetHeader = ({tweet}) => {

  let date = tweet.date;
  if(tweet.date) {
    date = moment(tweet.date).format('MMMM Do YYYY');
  }
  
  return(
    <div className="tweet-header">
      <span className="twitter-icon"><i class="fab fa-twitter"></i></span> President Trump@theRealDonald 
        &#8226; {date}
    </div>
  );
}

export default TweetHeader;