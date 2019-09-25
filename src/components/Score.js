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
    if(this.props.score > this.state.currScore) {
      this.updateScore(this.state.currScore, this.props.score);
    }
  }

  //Update scores with a counting effect
  updateScore = (oldScore, newScore) => {
    const diff = newScore - oldScore;
    for(let i = 0; i < diff; i++) {
      setTimeout( (prev) => {
        this.setState( prev => ({displayScore: prev.displayScore + 1}));
      },1000 * i);
    }

    this.setState(prev => ({currScore: newScore }));
  }

  render() {
    return (
      <div className="stat">
        <div>
          SCORE
        </div>
        <div className="stat-number">
          {this.state.displayScore}
        </div>
      </div>
    );
  }
}

export default Score;