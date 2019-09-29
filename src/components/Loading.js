import React from 'react';

const Loading = props => {

  return (
    <div className="loading">
      <div>
        <img className="loadingLogo" alt="logo" src="/logoTyper.svg" />
        <h2>Loading</h2>
      </div>
    </div>
  );
}

export default Loading;