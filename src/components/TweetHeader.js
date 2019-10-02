import React from 'react';
import moment from 'moment';

const TweetHeader = ({tweet}) => {

  let date = tweet.date;
  if(tweet.date) {
    date = moment(tweet.date).format('MMMM Do YYYY, h:mm a');
  }
  
  return(
    <div className="tweet-header">
      <div>
        {/*}
        <span className="twitter-icon">
          <i className="fab fa-twitter"></i>
        </span> 
        President Trump@theRealDonald
        */}
        <div>The President of the United States</div>
        <div className="tweet-header-date">
          <div>{date}</div>
          <div>Tweet ID {tweet.id}</div>
        </div>
      </div>
      
    </div>
  );
}

export default TweetHeader;