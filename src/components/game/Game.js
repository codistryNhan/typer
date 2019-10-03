import React from 'react';
import Combo from './Combo';
import DisplayTweet from './DisplayTweet';
import Loading from './Loading';
import MultiplierPopUp from './MultiplierPopUp';
import MultiplierStars from './MultiplierStars';
import Score from './Score';
import Timer from './Timer';
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
      isLoading: true,
      multiplier: 1,
      points: 0,
      pointsToAdd: 0,
      timer: 60,
      timesUp: false,
      tweet: 'I am a tweet',
      tweets: [{date: '', full_text: '', favorite_count:0, retweet_count: 0}]
    }
    this.getTweets();
    this.timerStart(60);
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
    if(this.state.currentIndex === this.state.tweet.length - 1) {
      this.nextTweet();
    }
  }

  focusInput = () => {
    this.keyInputRef.focus();
  }

  handleOnChange = e => {
    if(e.key === 32) {
      e.preventDefault();
    }
    const currentVal = e.key;

    const ignoreKeys = ['Shift', 'Alt', 'Control', 'Tab', 'CapsLock', 'Enter', 'Backspace'];

    //Add multipliers for higher combos
    switch(this.state.combo) {
      case 10:
        this.setMultiplier(2);
        break;
      case 30:
        this.setMultiplier(3);
        break;
      case 40:
        this.setMultiplier(4);
        break;
      case 100:
        this.setMultiplier(5);
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
      <div ref={this.mainRef}>
        {this.state.isLoading && <Loading />}
        
        <div className="stats-container desktop-resolution">
          <Timer timer={this.state.timer} />
          <MultiplierStars multiplier={this.state.multiplier} />
          <Score score={this.state.points} />
        </div>

        <div className="tweet-container">
          <div className="desktop-resolution">
            <TweetInfo 
              tweet={this.state.tweets[this.state.currentTweetIndex]} 
            />

            <DisplayTweet 
              tweet={this.state.tweet} 
              currentIndex={this.state.currentIndex}
              incorrectKey={this.state.incorrectKey}
              resetIncorrectKey={this.resetIncorrectKey}
              inputRef={el => this.keyInputRef = el}
              handleOnChange={this.handleOnChange}
              pointsToAdd={this.state.pointsToAdd}
            />

            <MultiplierPopUp multiplier={this.state.multiplier}/>
          </div>
        </div>

        <TypedKeys 
          keyHistory={this.state.keyHistory} 
          currentKey={this.state.currentKey} 
        />

        <div className="info desktop-resolution">
          <p className="center">Earn combos by typing correctly without making mistakes!</p>
          <table className="combo-table">
            <tr>
              <td>Combos</td>
              <td>10</td>
              <td>30</td>
              <td>50</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Points Multiplier</td>
              <td>2X</td>
              <td>3X</td>
              <td>4X</td>
              <td>5X</td>
            </tr>
          </table>

          <div className="progress">
            <p className="center">Game is still a work in progress</p>
            <p>I apologize if things don't makes sense or feels weird.</p>
          </div> 
        </div>
        
      </div>
    );
  }
}

export default Game;
