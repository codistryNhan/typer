import React from 'react';
import moment from 'moment';
import TweetHeader from './TweetHeader';

const TweetInfo = ( {tweet} ) => {
  const fav_count = numberWithCommas(tweet.favorite_count);
  const retweets = numberWithCommas(tweet.retweet_count);
  let date = tweet.date;
  if(tweet.date) {
    date = moment(tweet.date).format('MMMM Do YYYY, h:mm a');
  }

  return (
    <div className="tweet-info-container">
      <div>Tweet #{tweet.id}</div>
      <div>{date }</div>
    </div>
    
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default TweetInfo;