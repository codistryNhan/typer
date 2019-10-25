import React from 'react';

class Score extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      displayScore: 0,
      currScore: 0
    };
  }

  componentDidUpdate() {
    if(this.props.score !== this.state.currScore) {
      this.updateScore(this.state.currScore, this.props.score);
    }
  }

  //Update scores with a counting effect
  updateScore = (oldScore, newScore) => {
    if(oldScore < newScore) {
      const diff = newScore - oldScore;
      for(let i = 0; i < diff; i++) {
        setTimeout( (prev) => {
          this.setState( prev => ({displayScore: prev.displayScore + 1}));
        },100 * i);
      }
    } else if(oldScore > newScore) {
      this.setState({displayScore: 0});
    }
    

    this.setState(prev => ({currScore: newScore }));
  }

  render() {
    const score = String(this.state.displayScore).padStart(1, '0');

    return (
      <div className="score-container">
        <div className="score-header">
          SCORE
        </div>
        <div className="score-body">
          {score}
        </div>
      </div>
    );
  }
}

export default Score;