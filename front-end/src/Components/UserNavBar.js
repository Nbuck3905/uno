import React, { Component } from "react";

class UserNavBar extends Component {
  render() {
    return (
      <div
        className="ui red borderless inverted menu"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="item">
          <div
            className="ui yellow massive button"
            onClick={this.props.handleHome}
          >
            Home
          </div>
        </div>
        <div className="item">
          <div className="ui green massive button">
            {this.props.user.username}
          </div>
        </div>
        <div className="item" style={{ position: "absolute" }}>
          <h1
            style={{
              color: "white"
            }}
          >
            Welcome {this.props.user.username}
          </h1>
        </div>
        <div className="right item">
          <div
            className="ui right blue massive button"
            onClick={this.props.handleLogOut}
          >
            Log Out
          </div>
        </div>
      </div>
    );
  }
}

export default UserNavBar;
