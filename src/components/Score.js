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
      },100 * i);
    }

    this.setState(prev => ({currScore: newScore }));
  }

  render() {
    const score = String(this.state.displayScore).padStart(4, '0');

    return (
      <div className="stat-element-container">
        <div className="stat-element-header">
          SCORE
        </div>
        <div className="stat-element-body">
          {score}
        </div>
      </div>
    );
  }
}

export default Score;