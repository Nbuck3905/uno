import React, { Component } from "react";

class WaitNavBar extends Component {
  render() {
    return (
      <div className="ui red borderless inverted menu">
        <div className="item">
          <div
            className="ui yellow massive button"
            onClick={() => this.props.handleLeave(this.props.game)}
          >
            Home
          </div>
        </div>
        <div className="item">
          <div className="ui green massive button">
            {this.props.user.username}
          </div>
        </div>
        <div className="right item">
          <h1>Waiting on creator to start</h1>
        </div>
      </div>
    );
  }
}

export default WaitNavBar;
