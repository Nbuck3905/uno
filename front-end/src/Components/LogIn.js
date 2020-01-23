import React, { Component } from "react";

class LogIn extends Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    errorMessage: ""
  };

  handleUsernameChange = e => {
    this.setState({
      usernameInput: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      passwordInput: e.target.value
    });
  };

  handleLogIn = e => {
    e.preventDefault();
    fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.usernameInput,
        password: this.state.passwordInput
      })
    })
      .then(res => res.json())
      .then(login => {
        if (login.error) {
          this.setState({ errorMessage: login.message });
        } else {
          localStorage.setItem("token", login.token);
          this.props.setLoggedInUser(login.user);
        }
      });
  };

  render() {
    window.app = this;
    return (
      <div className="ui raised very padded text container segment form">
        <h1>Log In</h1>
        <div className="field">
          <label>Username</label>
          <input
            className=""
            value={this.state.usernameInput}
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.passwordInput}
            onChange={this.handlePasswordChange}
            type="password"
            placeholder="Password"
          />
        </div>
        {this.state.errorMessage ? (
          <div style={{ color: "red" }}>Invalid username or password.</div>
        ) : null}
        <div className="ui massive green button" onClick={this.handleLogIn}>
          Log In
        </div>
        <div style={{ height: "20px" }} />
        <div>
          <h4>Don't have an account?</h4>
          <div className="ui blue button" onClick={this.props.handleSignUp}>
            Sign Up
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
