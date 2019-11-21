import React from 'react';
import Grid from './Grid';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xSize: 7,
      ySize: 12,
      cellsOn: [],
      cellsSelected: [],
      gameStart: true,
      currentRow: 0
    };
  }

  componentDidMount() {
    this.startRow(0);

    window.addEventListener('click', () => {
      const [selected] = this.state.cellsSelected;
      const cellsOn = this.state.cellsOn;
      cellsOn.push(selected);
      this.setState( (prev) => ({
        cellsOn,
        currentRow: prev.currentRow + 1
      }));
    });

    
  }

  componentDidUpdate() {
    
  }

  startGame = () => {

  }

  startRow = (row) => {
    let y = 0;
    let end = this.state.xSize - 1;
    let reverse = false;

    let obj = {
      x, y, end, reverse
    }

    setInterval(this.blockStart(obj), 500);
  }

  moveBlock = ({x, y, end, reverse}) => {
    if(y === end) {
      reverse = true;
    } else if (y === 0){
      reverse = false;
    }

    let id = `${x}${y}`;
    let cellsSelected = [id];
    this.setState({cellsSelected})
    
    if(!reverse) {
      start++
    } else {
      start--;
    }
  }

  render() {
    return(
      <>
        <h1> Stacker </h1>
        <Grid 
          x={this.state.xSize} 
          y={this.state.ySize} 
          on={this.state.cellsOn} 
          selected={this.state.cellsSelected}
        />  
      </>
    );
  }
}

export default Game;