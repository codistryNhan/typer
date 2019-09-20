import React from 'react';
import Combo from './Combo';
import Score from './Score';
import Quote from './Quote';
import LastTypedKey from './LastTypedKey';
import Multiplier from './Multiplier';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      string: "I am a bob in a lonely world.",
      currentKey: '',
      currentIndex: 0,
      multiplier: 1,
      combo: 0,
      points: 0,
      keyHistory: []
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.getNextQuote = this.getNextQuote.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', e => {
      this.handleOnChange(e);
    });
  }

  componentDidUpdate() {
    if(this.state.currentIndex === this.state.string.length) {
      this.getNextQuote();
    }
  }

  handleOnChange(e) {
    const currentVal = e.key;

    const ignoreKeys = ['Shift', 'Alt', 'Control', 'Tab', 'CapsLock', 'Enter', 'Backspace'];

    //set point multiplier if gets perfect letters in a roww
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
      default:
    }

    //if a key is correct, add points and add combo
    //if a key isnt correct, reset combo and set multiplier back to 0
    if( !ignoreKeys.includes(currentVal) ) {
      if (currentVal === this.state.string[this.state.currentIndex]) {

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

  getNextQuote() {
    this.setState( () => ({
      string: "I am now a cat in a big big world.",
      currentIndex: 0,
    }));
  }

  render() {
    return (
      <div>
        <header>
          <h1>Typing With The President</h1>
        </header>
        
        <section className="main-container">
          
          <div className="stats">
            <Score score={this.state.points} />
            <Multiplier multiplier={this.state.multiplier} />
            <Combo combo={this.state.combo} />
          </div>

          <div className="quote-container">
            <Quote 
              quote={this.state.string} 
              currentIndex={this.state.currentIndex} 
            />
            <LastTypedKey keyHistory={this.state.keyHistory} currentKey={this.state.currentKey} />
          </div>
                
        </section>
      </div>
    );
  }
}

export default Game;