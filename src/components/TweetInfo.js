import React from 'react';

const TweetInfo = ( {tweet} ) => {
  const fav_count = numberWithCommas(tweet.favorite_count);
  const retweets = numberWithCommas(tweet.retweet_count);

  return (
    <div className="tweet-info-container">
      <div>Likes {fav_count}</div>
      <div>Retweets {retweets}</div>
    </div>
    
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default TweetInfo;