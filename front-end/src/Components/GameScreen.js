import React, { Component } from "react";
import cards from "../cards";
import UnoCard from "./UnoCard";

export default class GameScreen extends Component {
  state = {
    cards: []
  };

  componentDidMount() {
    this.setState({ cards: cards });
  }

  render() {
    return (
      <div className="ui raised very padded text container segment form">
      </div>
    );
  }
}
