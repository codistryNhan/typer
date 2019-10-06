import React from 'react';
import Combo from './Combo';
import Tweet from './Tweet';
import Loading from '../loading-page/LoadingPage';
import MultiplierPopUp from './MultiplierPopUp';
import MultiplierStars from './MultiplierStars';
import Results from './Results'
import Score from './Score';
import Start from './Start';
import Timer from './Timer';
import TweetInfo from './TweetInfo';
import TypedKeys from './TypedKeys';
import { BrowserRouter as Redirect, Router, Switch, Route, Link } from "react-router-dom";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      combo: 0,
      correctCount: 0,
      currentKey: '',
      currentIndex: 0,
      currentTweetIndex: 0,
      gameStart: false,
      gameEnd: false,
      keyHistory: [],
      incorrectKey: false,
      isLoading: true,
      maxCombo: 0,
      multiplier: 1,
      points: 0,
      pointsToAdd: 0,
      redirectResults: false,
      timer: 100,
      timesUp: false,
      tweet: 'I am a tweet',
      tweets: [{date: '', full_text: '', favorite_count:0, retweet_count: 0}]
    }
    this.getTweets();
    this.mainRef = React.createRef();
  }

  componentDidMount() {
    this.focusInput();

    window.addEventListener('onfocus', (e) => {
      e.preventDefault();
      this.focusInput();
    });

    this.mainRef.current.addEventListener('click', (e) => {
      e.preventDefault();
      this.focusInput();
    });
  }

  componentDidUpdate() {
    //Get next tweet if index has reached the last character of curren tweet
    if(this.state.currentIndex === this.state.tweet.length - 1) {
      this.nextTweet();
    }

    //Get Max combo of current game
    let max = this.state.maxCombo;
    if(this.state.combo > max) {
      max = this.state.combo;
      this.maxCombo(max);
    }

    //Game Stops after timer ends
    if(this.state.gameStart && this.state.timer === 0) {
      this.gameEnd();
      this.getResults(this.state);
      this.setState({redirectResults: true});
      
    }
  }

  focusInput = (e) => {
    this.keyInputRef.focus();
  }

  gameStart = () => {
    if(!(this.state.timer < 0)) {
      this.setState({
        gameStart: true
      })
  
      this.timerStart();
    }
  }

  gameEnd = () => {
    this.setState({gameEnd: true, gameStart: false});
  }

  getResults = ({ correctCount, points, maxCombo }) => {
    let wpm = (correctCount / 5.0) * 6;
    console.log(points, maxCombo, correctCount, wpm);
  }

  getTweets = () => {
    const url = `http://codistry.io:3001/api/v1/tweets`;
    fetch(url)
    .then( data => data.json())
    .then( data => {
      this.setState({
        tweet: data[0].full_text,
        tweets: data
      });
    })
    .then( () => {
      this.setState({isLoading: false});
    })
    .catch( err => console.log(err));
  }

  //Handles Key Type Inputs
  handleOnChange = e => {
    if(e.key === 32) {
      e.preventDefault();
    }
    const currentVal = e.key;

    const ignoreKeys = ['Shift', 'Alt', 'Control', 'Tab', 'CapsLock', 'Enter', 'Backspace'];

    //Add multipliers for higher combos
    switch(this.state.combo) {
      case 15:
        this.setMultiplier(2);
        break;
      case 50:
        this.setMultiplier(3);
        break;
      case 100:
        this.setMultiplier(4);
        break;
      default:
    }

    //if a key is correct, add points and add combo
    //if a key isnt correct, reset combo and set multiplier back to 0
    if( !ignoreKeys.includes(currentVal) ) {
      //Start game when user starts to type
      if(!this.state.gameStart && !this.state.gameEnd) {
        this.gameStart();
      }

      if (currentVal === this.state.tweet[this.state.currentIndex]) {

        this.setState( prev => {
          let points = prev.multiplier * 10;
          return { 
            currentIndex: prev.currentIndex + 1,
            combo: prev.combo + 1,
            correctCount: prev.correctCount + 1,
            points: prev.points + points,
            pointsToAdd: points,
            incorrectKey: false
          };
        });

      } else {
        this.setState( prev => ({ 
          combo: 0,
          multiplier: 1,
          multiplierIncreased: false,
          incorrectKey: true
        }));
      }
      
      this.storeRecentKey(currentVal);
      this.storeKeyHistory(currentVal);
    }
  }

  maxCombo = (max) => {
    this.setState({maxCombo: max});
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

  resetIncorrectKey = () => {
    if(this.state.incorrectKey) {
      setTimeout(() => {
        this.setState( () => ({
          incorrectKey: false
        }))
      }, 300); 
    }
  }

  setMultiplier = num => {
    this.setState( () => ({
      multiplier: num,
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

  timerStart = () => {
    let timer = this.state.timer;
    let countDown = setInterval(() => {
      timer--;
      this.setState({timer: timer});

      if(timer === 0) {
        clearInterval(countDown);
      }
    },100);
  }

  render() {
    if(this.state.redirectResults) {
      console.log('redirect');
      return (
        <Redirect to="/results" />
      )
    }

    return (
      <div ref={this.mainRef}>
        {this.state.isLoading && <Loading />}

        <div className="game-container">
          <div className="desktop-resolution">
            <div className="stats-container">
              <Timer timer={this.state.timer} />
              <MultiplierStars multiplier={this.state.multiplier} />
              <Score score={this.state.points} />
            </div>  

            <TweetInfo 
              tweet={this.state.tweets[this.state.currentTweetIndex]} 
            />

            <MultiplierPopUp 
              multiplier={this.state.multiplier}
            />

            <Tweet 
              currentIndex={this.state.currentIndex}
              gameEnd={this.state.gameEnd}
              handleStart={this.handleStart}
              handleOnChange={this.handleOnChange}
              incorrectKey={this.state.incorrectKey}
              inputRef={el => this.keyInputRef = el}
              inputRefStart = {el => this.startInputRef = el}
              pointsToAdd={this.state.pointsToAdd}
              resetIncorrectKey={this.resetIncorrectKey}
              tweet={this.state.tweet} 
            />

            {this.state.gameStart 
              && 
              <TypedKeys 
                keyHistory={this.state.keyHistory} 
                currentKey={this.state.currentKey} 
              />
            }
            
            {(!this.state.gameStart && !this.state.gameEnd) 
              &&
              <Start gameStart={this.gameStart}/>
            }
            
          </div>
        </div>
        
      </div>
    );
  }
}

export default Game;
