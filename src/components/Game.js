import React from 'react';
import Combo from './Combo';
import Score from './Score';
import TweetHeader from './TweetHeader';
import TweetInfo from './TweetInfo';
import DisplayTweet from './DisplayTweet';
import TypedKeys from './TypedKeys';
import Multiplier from './Multiplier';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: 'I am a tweet',
      currentKey: '',
      currentIndex: 0,
      currentTweetIndex: 0,
      multiplier: 1,
      combo: 0,
      points: 0,
      keyHistory: [],
      tweets: [{date: '', full_text: '', favorite_count:0, retweet_count: 0}]
    }

    this.getTweets();
  }

  componentDidMount() {
    window.addEventListener('keydown', e => {
      this.handleOnChange(e);
    });
  }

  componentDidUpdate() {
    if(this.state.currentIndex === this.state.tweet.length - 1) {
      this.nextTweet();
    }
  }

  handleOnChange = e => {
    if(e.key === 32) {
      e.preventDefault();
    }
    const currentVal = e.key;

    const ignoreKeys = ['Shift', 'Alt', 'Control', 'Tab', 'CapsLock', 'Enter', 'Backspace'];

    //Add multipliers for higher combos
    switch(this.state.combo) {
      case 5:
        this.setMultiplier(2);
        break;
      case 10:
        this.setMultiplier(3);
        break;
      case 25:
        this.setMultiplier(4);
        break;
      case 50:
        this.setMultiplier(5);
        break;
      case 100:
        this.setMultiplier(6); 
        break;
      default:
    }

    //if a key is correct, add points and add combo
    //if a key isnt correct, reset combo and set multiplier back to 0
    if( !ignoreKeys.includes(currentVal) ) {
      if (currentVal === this.state.tweet[this.state.currentIndex]) {

        this.setState( prev => {
          let points = prev.multiplier * 10;
          console.log(points);
          return { 
            currentIndex: prev.currentIndex + 1,
            combo: prev.combo + 1,
            points: prev.points + points
          };
        });

      } else {
        this.setState( prev => ({ 
          combo: 0,
          multiplier: 1
        }));
      }
      
      this.storeRecentKey(currentVal);
      this.storeKeyHistory(currentVal);
    }
  }

  setMultiplier = num => {
    this.setState( () => ({
      multiplier: num
    }));
  }

  storeRecentKey = key => {
    this.setState( () => ({
        currentKey: key
    }));
  }

  storeKeyHistory = key => {
    const keyHistory = this.state.keyHistory;
    keyHistory.push(key);

    this.setState( prev => ({
      keyHistory: keyHistory
    }));
  }

  getTweets = () => {
    const url = `http://localhost:3001/api/v1/tweets`;
    fetch(url)
    .then( data => data.json())
    .then( data => {
      this.setState({
        tweet: data[0].full_text,
        tweets: data
      });
    })
    .catch( err => console.log(err));
  }

  nextTweet = () => {
    const nextTweetIndex = this.state.currentTweetIndex + 1;
    const nextTweet = this.state.tweets[nextTweetIndex].full_text;

    this.setState( () => ({
      tweet: nextTweet,
      currentTweetIndex: nextTweetIndex,
      currentIndex: 0,
    }));
  }

  render() {
    return (
      <div>
        <header>
          <h1 className="header">PRESIDENTIAL TYPER</h1>
          <p>IMPROVE YOUR TYPING AND FOREIGN POLICY SKILLS AT THE SAME TIME</p>
        </header>
        
        <section className="main-container">

          <div className="stats-container">
            <Score score={this.state.points} />
            <Combo combo={this.state.combo} />
            <Multiplier multiplier={this.state.multiplier} />
          </div>

          <div className="tweet-container">
            <TweetHeader tweet={this.state.tweets[this.state.currentTweetIndex]} />
            <DisplayTweet 
              tweet={this.state.tweet} 
              currentIndex={this.state.currentIndex}
            />
            <TweetInfo 
            tweet={this.state.tweets[this.state.currentTweetIndex]} 
            />

          </div>

          <TypedKeys 
            keyHistory={this.state.keyHistory} 
            currentKey={this.state.currentKey} 
          />
                
        </section>
      </div>
    );
  }
}

export default Game;
