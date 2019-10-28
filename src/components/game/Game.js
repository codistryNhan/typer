/*
** Game is the main component of the game
*/

import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import Combo from './Combo';
import Tweet from './Tweet';
import Tweet2 from './Tweet2';
import Loading from '../loading-page/LoadingPage';
import MultiplierPopUp from './MultiplierPopUp';
import MultiplierStars from './MultiplierStars';
import Results from './Results';
import Restart from './Restart';
import Score from './Score';
import Start from './Start';
import Timer from './Timer';
import TweetInfo from './TweetInfo';
import TypedKeys from './TypedKeys';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      combo: 0,
      correctCount: 0,
      currentKey: '',
      currentIndex: 0,
      currentTweetsIndex: 0,
      gameStart: false,
      gameEnd: false,
      keyHistory: [],
      incorrectKey: false,
      isLoading: true,
      maxCombo: 0,
      multiplier: 1,
      points: 0,
      pointsToAdd: 0,
      timer: 600,
      tweet: '',
      tweets: [{date: '', full_text: '', favorite_count:0, retweet_count: 0}],
      wpm: 0
    }

    this.initialState = this.state;

    //This input ref is our invisible main input of the game 
    //that checks detects keys typed 
    this.keyInputRef = {};

    this.getTweets();
    this.mainRef = React.createRef();
  }

  componentDidMount() {
    //On mount, focus the input to type
    this.focusInput();

    // window.addEventListener('onfocus', (e) => {
    //   e.preventDefault();
    //   this.focusInput();
    // });

    //on click of the main game container, focus onto input to type.
    this.mainRef.current.addEventListener('click', (e) => {
        e.preventDefault();
        this.focusInput();
    });
  }

  componentDidUpdate() {
    //Get next tweet if index has reached the last character of current tweet
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
      this.setState({
        wpm: Math.floor((this.state.correctCount / 5.0)) * 6
      });
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

  getTweets = () => {
    const url = `http://codistry.io:3001/api/v1/tweets`;
    fetch(url)
    .then( data => data.json())
    .then( data => {
      this.setState({
        tweet: data[0].full_text.trim(),
        tweets: data
      });
    })
    .then( () => {
      this.setState({isLoading: false});
    })
    .catch( err => console.log(err));
  }

  //Handles the key inputs
  //Checks if the character is the correct key
  handleOnChange = e => {
    //Disable scrolling on space
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
    const nextTweetIndex = this.state.currentTweetsIndex + 1;
    const nextTweet = this.state.tweets[nextTweetIndex].full_text.trim();

    this.setState( () => ({
      tweet: nextTweet,
      currentTweetsIndex: nextTweetIndex,
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

  resetGame = () => {
    this.setState(this.initialState);
    this.getTweets();
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
    return (
      <>
      <div className="main" ref={this.mainRef}>
        {this.state.isLoading && <Loading />}

        <div className="game-container responsive-desktop">

            <div className="stats-container">
              <Timer timer={this.state.timer} />
              <Score score={this.state.points} />
            </div>

            
            <TweetInfo 
              tweet={this.state.tweets[this.state.currentTweetsIndex]} 
            />

            <MultiplierPopUp 
              multiplier={this.state.multiplier}
            />

            <Tweet 
              currentIndex={this.state.currentIndex}
              gameEnd={this.state.gameEnd}
              handleOnChange={this.handleOnChange}
              incorrectKey={this.state.incorrectKey}
              inputRef={el => this.keyInputRef = el}
              pointsToAdd={this.state.pointsToAdd}
              resetIncorrectKey={this.resetIncorrectKey}
              tweet={this.state.tweet} 
            />

            {/*<Tweet2 tweet={this.state.tweet}/>*/}

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

            <Restart reset={this.resetGame}/>

              
          </div>

      </div>

      {(!this.state.gameStart && this.state.gameEnd) &&
      <Results 
        score={this.state.points} 
        maxCombo={this.state.maxCombo} 
        wpm={this.state.wpm} 
        reset={this.resetGame}
      />
      }
      </>
    );
  }
}

export default Game;
