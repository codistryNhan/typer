import React from 'react';
import moment from 'moment';

const TweetInfo = ( {tweet} ) => {
  const fav_count = numberWithCommas(tweet.favorite_count);
  const retweets = numberWithCommas(tweet.retweet_count);
  let date = tweet.date;
  if(tweet.date) {
    date = moment(tweet.date).format('MMMM Do YYYY, h:mm a');
  }

  return (
    <div className="tweet-info-container">
      <div className="tweet-info-row-1">
        <div>Tweet #{tweet.id}</div>
        <div>
          <span>Likes {tweet.favorite_count} Retweets {tweet.retweet_count}</span>
        </div>
      </div>
      <div>{date }</div>
    </div>
    
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default TweetInfo;