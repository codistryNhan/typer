import React from 'react';
import './Results.css';

class Results extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    const {score, maxCombo, wpm, display, reset} = this.props;

    return (
      <>
      <div className={display ? "modal-background show" : "modal-background"}>
        <div className="results-container">
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
            value={this.state.value} 
            onChange={this.handleChange}
          />

          <button className="btn disabled">
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