import React from 'react';

function Cell({count, id, x, on, selected}) {
  let cellClass = "cell";
  if(selected) {
    cellClass += " selected";
  }

  if(on) {
    cellClass += " on";
  }

  return(
    <td 
      class={cellClass} 
      key={count} 
      data-id={id} 
      data-x={x}>
    </td>
  );
}

export default Cell;