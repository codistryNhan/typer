import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="stat-timer-container">
        <div>Time Left</div>
        <div className="stat-timer">
          {this.props.timer}
        </div>
      </div>
    );
  }
}

export default Timer;