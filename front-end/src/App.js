import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import UserNavBar from "./Components/UserNavBar";
import WaitNavBar from "./Components/WaitNavBar";
import PlayNavBar from "./Components/PlayNavBar";
import UserHome from "./Components/UserHome";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import CreateGame from "./Components/CreateGame";
import JoinGame from "./Components/JoinGame";
import Waiting from "./Components/Waiting";
import GameScreen from "./Components/GameScreen";
import { io } from "./Socket";
const URLBase = 'http://10.185.2.163:3001'

export default class App extends Component {
  state = {
    loggedInUser: null,
    showPage: "logIn",
    showUserPage: "home",
    currentGame: {},
    creator: {},
    players: []
  };

  componentDidMount() {
    io.on("game.started", players => {
      this.setState({
        players: players,
        showUserPage: "play"
      });
    });
    fetch(`${URLBase}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(auth => {
        if (!auth.error) {
          if (auth.user) {
            return this.setState({
              loggedInUser: auth.user,
              showPage: "user"
            });
          } else {
            this.setState({
              loggedInUser: auth,
              showPage: "user"
            });
          }
        }
      });
  }

  setLoggedInUser = user => {
    this.setState({ loggedInUser: user, showPage: "user" });
  };

  handleLogOut = e => {
    localStorage.clear();
    this.setState({
      loggedInUser: null,
      showPage: "logIn",
      userShowPage: "home"
    });
  };

  handleHome = () => {
    this.setState({ showUserPage: "home" });
  };

  handleSignUp = () => {
    this.setState({ showPage: "signUp" });
  };

  handleUno = () => {
    this.setState({ showPage: "logIn" });
  };

  handleCreateGame = () => {
    this.setState({ showUserPage: "create" });
  };

  handleJoinGame = () => {
    this.setState({ showUserPage: "join" });
  };

  handleDeleteGame = () => {
    this.setState({ showUserPage: "delete" });
  };

  handleCreateSubmit = game => {
    io.emit("game.create", {
      ...game,
      creator_id: this.state.loggedInUser.id,
      users: JSON.stringify([])
    });
    this.setState({
      showUserPage: "waiting",
      currentGame: {
        ...game,
        creator_id: this.state.loggedInUser.id,
        users: JSON.stringify([])
      }
    });
  };

  handleJoinSubmit = game => {
    this.setState({
      showUserPage: "waiting",
      currentGame: {
        ...game,
        users: JSON.stringify([
          ...JSON.parse(game.users),
          this.state.loggedInUser.id
        ])
      }
    });
    io.emit("game.join", {
      ...game,
      users: JSON.stringify([
        ...JSON.parse(game.users),
        this.state.loggedInUser.id
      ])
    });
  };

  handleLeave = game => {
    if (game.creator_id == this.state.loggedInUser.id) {
      console.log("creator left game");
      this.setState({ showUserPage: "home" });
      io.emit("game.delete", game);
    } else {
      console.log("player left game");
      this.setState({ showUserPage: "home" });
      io.emit("game.leave", {
        game: game,
        user_id: this.state.loggedInUser.id
      });
    }
  };

  handleStart = (game, players) => {
    this.setState({ currentGame: game });
    io.emit("game.start", players);
  };

  getCreator = id => {
    io.emit("creator.get", id);
    io.on("creator.send", creator => {
      this.setState({
        creator: creator
      });
    });
  };

  render() {
    window.app = this;
    if (this.state.showPage === "logIn") {
      return (
        <div style={{ background: "black", height: "100vh" }}>
          <NavBar />
          <LogIn
            setLoggedInUser={this.setLoggedInUser}
            handleSignUp={this.handleSignUp}
          />
        </div>
      );
    }
    if (this.state.showPage === "signUp") {
      return (
        <div style={{ background: "black", height: "100vh" }}>
          <NavBar handleUno={this.handleUno} handleLeave={this.handleLeave} />
          <SignUp setLoggedInUser={this.setLoggedInUser} />
        </div>
      );
    }
    if (this.state.showPage === "user") {
      if (this.state.showUserPage === "home") {
        return (
          <div style={{ background: "black", height: "100vh" }}>
            <UserNavBar
              user={this.state.loggedInUser}
              handleLogOut={this.handleLogOut}
              handleHome={this.handleHome}
            />
            <UserHome
              user={this.state.loggedInUser}
              handleCreateGame={this.handleCreateGame}
              handleJoinGame={this.handleJoinGame}
            />
          </div>
        );
      }
      if (this.state.showUserPage === "create") {
        return (
          <div style={{ background: "black", height: "100vh" }}>
            <UserNavBar
              user={this.state.loggedInUser}
              handleLogOut={this.handleLogOut}
              handleHome={this.handleHome}
            />
            <CreateGame
              user={this.state.loggedInUser}
              handleCreateSubmit={this.handleCreateSubmit}
            />
          </div>
        );
      }
      if (this.state.showUserPage === "join") {
        return (
          <div style={{ background: "black", height: "100vh" }}>
            <UserNavBar
              user={this.state.loggedInUser}
              handleLogOut={this.handleLogOut}
              handleHome={this.handleHome}
            />
            <JoinGame
              user={this.state.loggedInUser}
              handleJoinSubmit={this.handleJoinSubmit}
              handleCreateGame={this.handleCreateGame}
            />
          </div>
        );
      }
      if (this.state.showUserPage === "waiting") {
        return (
          <div style={{ background: "black", height: "100vh" }}>
            <WaitNavBar
              user={this.state.loggedInUser}
              handleLogOut={this.handleLogOut}
              handleHome={this.handleHome}
              handleLeave={this.handleLeave}
              game={this.state.currentGame}
            />
            <Waiting
              user={this.state.loggedInUser}
              handleLeave={this.handleLeave}
              handleHome={this.handleHome}
              game={this.state.currentGame}
              handleStart={this.handleStart}
            />
          </div>
        );
      }
      if (this.state.showUserPage === "play") {
        return (
          <div style={{ background: "black", height: "1000vh" }}>
            <PlayNavBar 
              game={this.state.currentGame}
              user={this.state.loggedInUser}
            />
            <GameScreen
              creator={this.state.creator}
              players={this.state.players}
              user={this.state.loggedInUser}
              game={this.state.currentGame}
              getCreator={this.getCreator}
            />
          </div>
        );
      }
    }
  }
}
