import React from 'react';

class MultiplierPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.component = ``;

    this.state = {
      multi: 1,
    };
  }

  componentDidUpdate() {
    if(this.state.multi !== this.props.multiplier) {
      if (this.state.multi < this.props.multiplier) {
        this.component = 
          <div className={"multiplier-container"}>
            <div className="multiplier-header">MULTIPLIER INCREASED</div>
            <div className="multiplier-number">{this.props.multiplier}</div>
          </div>

        setTimeout( ()=> {
          this.component = '';
        }, 1500)
      }
      this.setState({multi: this.props.multiplier});
    }
  }

  render(){
    return (
      this.component
    )
  }
}

export default MultiplierPopUp;