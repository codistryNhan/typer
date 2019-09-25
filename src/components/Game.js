import React from 'react';
import Combo from './Combo';
import DisplayTweet from './DisplayTweet';
import Multiplier from './Multiplier';
import Score from './Score';
import Timer from './Timer';
import TweetHeader from './TweetHeader';
import TweetInfo from './TweetInfo';
import TypedKeys from './TypedKeys';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      combo: 0,
      currentKey: '',
      currentIndex: 0,
      currentTweetIndex: 0,
      keyHistory: [],
      incorrectKey: false,
      multiplier: 1,
      points: 0,
      timesUp: false,
      tweet: 'I am a tweet',
      tweets: [{date: '', full_text: '', favorite_count:0, retweet_count: 0}]
    }
    this.getTweets();
    this.timerStart(30);
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
          let points = prev.multiplier * 1;
          console.log(points);
          return { 
            currentIndex: prev.currentIndex + 1,
            combo: prev.combo + 1,
            points: prev.points + points,
            incorrectKey: false
          };
        });

      } else {
        this.setState( prev => ({ 
          combo: 0,
          multiplier: 1,
          incorrectKey: true
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

  timerStart = (seconds) => {
    this.setState({timer: seconds});

    let countDown = setInterval(() => {
      seconds--;
      this.setState({timer: seconds});

      if(seconds === 0) {
        clearInterval(countDown);
      }
    },1000);
  }

  resetIncorrectKey = () => {
    if(this.state.incorrectKey) {
      setTimeout(() => {
        this.setState( () => ({
          incorrectKey: false
        }))
      }, 300); 
    }
  }

  render() {
    return (
      <div>
        <header>
          <div>
            <h1 className="header">FREEDOM TYPER</h1> 
          </div>
          
          <div className="twitterTrump-container">
            <img className="twitterTrump" src="twitterTrump.svg" width="50"/>
          </div>
          <div>
            <p>IMPROVE YOUR TYPING AND FOREIGN POLICY SKILLS AT THE SAME TIME</p>
          </div>
          
        </header>
        <div className="stripes"></div>
        
        <section className="main-container">

          <div className="stats-container">
            <div>
              <Score score={this.state.points} />
              <Combo combo={this.state.combo} />
              <Multiplier multiplier={this.state.multiplier} />
              
            </div>
            <Timer timer={this.state.timer} />
          </div>

          <div className="tweet-container">
            <TweetHeader tweet={this.state.tweets[this.state.currentTweetIndex]} />
            <DisplayTweet 
              tweet={this.state.tweet} 
              currentIndex={this.state.currentIndex}
              incorrectKey={this.state.incorrectKey}
              resetIncorrectKey={this.resetIncorrectKey}
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
