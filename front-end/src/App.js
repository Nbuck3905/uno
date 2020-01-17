import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import MainContainer from "./Components/MainContainer";

class App extends Component {
  state = {
    cards: []
  };

  render() {
    return (
      <div>
        <NavBar />
        <MainContainer />
      </div>
    );
  }
}

export default App;
