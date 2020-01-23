import React from "react";
import { URLBase } from '../URLBase'

export default class SignUp extends React.Component {
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

  handleSignUp = e => {
    e.preventDefault();
    fetch(`${URLBase}/users`, {
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
        console.log(login.user);
        if (login.error) {
          return this.setState({ errorMessage: login.message });
        } else {
          localStorage.setItem("token", login.token);
          this.props.setLoggedInUser(login.user);
        }
      });
  };

  render() {
    return (
      <div className="ui raised very padded text container segment form">
        <h1>Sign Up</h1>
        <div className="field">
          <label>Username</label>
          <input
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
          <div style={{ color: "red" }}>
            Username or password has been taken.
          </div>
        ) : null}
        <div className="ui massive green button" onClick={this.handleSignUp}>
          Sign Up
        </div>
      </div>
    );
  }
}
