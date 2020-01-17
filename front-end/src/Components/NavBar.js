import React, { Component } from "react";

class NavBar extends Component {
  state = {
    home: "Home",
    highscore: "High-Score",
    logOut: "Log-Out"
  };
  render() {
    return (
      <div className="ui blue menu">
        <div className="item">{this.state.home}</div>
        <div className="item">{this.state.highscore}</div>
        <div className="item float right">{this.state.logOut}</div>
      </div>
    );
  }
}

export default NavBar;
