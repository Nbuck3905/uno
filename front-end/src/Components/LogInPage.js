import React, { Component } from "react";

class LogInPage extends Component {
  state = {
    loggedInUser: {
      username: "",
      password: ""
    }
  };

  handleUsernameChange = e => {
    this.setState({
      loggedInUser: {
        ...this.state.loggedInUser,
        username: e.target.value
      }
    });
  };
  handlePasswordChange = e => {
    this.setState({
      loggedInUser: {
        ...this.state.loggedInUser,
        password: e.target.value
      }
    });
  };

  render() {
    return (
      <form class="ui form">
        <div class="field">
          <label>User Name</label>
          <input onChange={this.handleUsernameChange} placeholder="User Name" />
        </div>
        <div class="field">
          <label>Password</label>
          <input onChange={this.handlePasswordChange} placeholder="Password" />
        </div>
        <button type="submit" class="ui button">
          Log-In
        </button>
      </form>
    );
  }
}

export default LogInPage;
