/*
*  Displays the results after the game finishes.
*/

import React from 'react';
import './Results.css';

class Results extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      value: '',
      inputEmpty: false,
    }

    this.resultsRef = React.createRef();
  }

  componentDidMount() {
    this.resultsInputRef.focus();
  }

  focusInput = () => {
    this.resultsInputRef.focus();
  }

  handleChange = (e) => {
    if(e.target.value.match(/^[a-z0-9]*$/i)) {
      this.setState({value: e.target.value});
    }
  }

  sendResults = () => {
    if(this.state.value.length > 0) {
      const {score, maxCombo, wpm, reset} = this.props;
      const url = "http://codistry.io:3001/api/v1/scores";
      const data = {
        name: this.state.value,
        score,
        maxCombo,
        wpm
      }

      let obj = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch(url, obj)
        .then( response => {
          reset();
        });
    } else {
      this.setState({inputEmpty: true});
    }
  }

  render() {
    const {score, maxCombo, wpm, reset} = this.props;
    const {value} = this.state;

    return (
      <>
      <div className="modal-background">
        <div className="results-container" onClick={this.focusInput}>
          <h1 className="results-header">Results</h1>
          
          <div className="results-row">
            <div>Score</div>
            <div>{score}</div>
          </div>
  
          <div className="results-row">
            <div>Max Combo</div>
            <div>{maxCombo}</div>
          </div>
  
          <div className="results-row">
            <div>Words Per Minute</div>
            <div>{wpm}</div>
          </div>
          
          <input 
            className="results-enter-initials"
            type="text" 
            ref={el => this.resultsInputRef = el}
            value={this.state.value}
            maxlength="3" 
            onChange={this.handleChange}
          />

          <div className="results-initials-container">
            <div className="results-initials">
              <div>
                <div className="result-initials-each">{value[0]}</div>
                <div 
                  className={!value[0] ? "results-underscore show" : "results-underscore"}>
                  _
                </div>
              </div>
              <div>
                <div className="result-initials-each">{value[1]}</div>
                <div 
                  className={!value[1] ? "results-underscore show" : "results-underscore"}>
                  _
                </div>
              </div>
              <div>
                <div className="result-initials-each">{value[2]}</div>
                <div 
                  className={!value[2] ? "results-underscore show" : "results-underscore"}>
                  _
                </div>
              </div> 
            </div>

            <div className="results-caption">
              Enter your initials
            </div>

            <div 
              className={this.state.inputEmpty ? "results-initials-empty show" : "results-initials-empty"}>
              Initials cannot be empty
            </div>
            
          </div>

          <button className="btn" onClick={this.sendResults}>
            Submit
          </button>
          <button className="btn" onClick={reset}>
            Retry
          </button>
        </div>
      </div>  
      </>
    );

  }
}

export default Results;