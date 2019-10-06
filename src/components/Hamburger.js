import React from 'react';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpened = false
    }
  }

  render() {
    return (
      <button className="nav-hamburger">
        <i class="fa-lg fas fa-bars"></i>
      </button>
    );
  }
}