import React from 'react';
import Loading from '../loading-page/LoadingPage';
import './HighScores.css';

class HighScores extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isLoading: true,
      highScores : []
    }

    this.getScores();
  }
  
  getScores = () => {
    const url = "http://codistry.io:3001/api/v1/scores/100"
    fetch(url)
     .then( data => data.json() )
     .then( data => {
      this.setState({highScores: data})
     })
     .then( () => {
       this.setState({isLoading: false});
     })
     .catch( err => console.log(err) );
  }

  render() {
    const scores = this.state.highScores.map((n,i) => {
      return (
        <tr>
          <td>{i + 1}</td>
          <td>{n.name}</td>
          <td>{n.score}</td>
          <td>{n.max_combo}</td>
        </tr>
      )
    });

    return(
      <div className="high-scores-container">
        {this.state.isLoading && <Loading />}
        <div className="high-scores-header noselect">
          <h1>High Scores</h1>
        </div>
        <div className="high-scores-table">
          <table>
            <tr className="noselect">
              <td>Rank</td>
              <td>Name</td>
              <td>Scores</td>
              <td>Max Combo</td>
            </tr>
            {scores}
          </table>
        </div>
      </div>
    );
    
  }
}

export default HighScores;