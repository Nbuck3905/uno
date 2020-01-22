import React, { Component } from "react";

class NavBar extends Component {

  render() {
    return (
      <div className="ui red inverted menu">
        <div className='item'>
          <div className="ui yellow button" onClick={this.props.handleUno}>UNO</div>
        </div>
      </div>
    );
  }
}

export default NavBar;
