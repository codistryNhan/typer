import React from 'react';
import './Grid.css';
import Cell from './Cell'

function Grid(props) {
  let grid = createGrid(props);

  return(
    grid
  );
}

function createGrid({x, y, on, selected}) {
  let rows = [];
  let count = 0;

  for(let i = 0; i < y; i++) {
    let cells = [];
    for(let j = 0; j < x; j++) {
        let id = `${i}${j}`;
        cells.push(
          <Cell 
            count={count++} 
            x={j} 
            id={id}
            on={on.includes(id) ? true : false} 
            selected={selected.includes(id) ? true : false}
          />
        )
    }
    rows.push(<tr key={i} data-row={i}>{cells}</tr>)
  }

  return(
    <table class="table-grid">
      {rows}
    </table>
  );
}

export default Grid;