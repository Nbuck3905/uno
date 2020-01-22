import React, { Component } from "react";
import cards from "../cards";
import UnoCard from "./UnoCard";
import GamePlay from "./GamePlay";
import { io } from "../Socket";

export default class GameScreen extends Component {
  state = {
    allCards: [],
    game: null,
    players: [],
    creator: {},
    player: {
      user: {},
      cards: []
    },
    deal: false,
    drawCards: []
  };

  componentDidMount() {
    this.setState({
      allCards: cards,
      game: this.props.game,
      players: this.props.players,
      player: {
        user: this.props.user,
        cards: []
      },
      drawCards: cards
    });
    this.getCreator(this.props.game.creator_id);
    io.on("dealt", () => {
      this.setState({ deal: true });
      this.deal();
    });
  }

  deal = () => {
    let x = 0;
    while (x < 7) {
      let randomNumber = Math.floor(
        Math.random() * this.state.drawCards.length
      );
      console.log(randomNumber);
      let drawnCard = this.state.drawCards[randomNumber];
      this.state.player.cards.push(drawnCard);
      this.setState({
        drawCards: this.state.drawCards.filter(card => card != drawnCard)
      });
      x = x + 1;
    }
    console.log(this.state.drawCards);
  };

  getCreator = id => {
    io.emit("creator.get", id);
    io.on("creator.send", creator => {
      this.setState({
        players: [...this.props.players, creator],
        creator: creator
      });
    });
  };

  handleDeal = () => {
    io.emit("deal");
  };

  render() {
    if (this.state.deal) {
      return (
        <GamePlay
          drawCards={this.state.drawCards}
          cards={this.state.player.cards}
        />
      );
    }
    return (
      <div className="ui raised very padded text container segment form">
        {this.state.game ? (
          <div>
            <h1>{this.state.game.name}</h1>
            <h2>{this.state.player.user.username}</h2>
            <h3>Creator: {this.state.creator.username}</h3>
          </div>
        ) : null}
        {this.state.players.map(player => {
          return <h3>{player.username}</h3>;
        })}
        {this.props.user.id == this.state.creator.id ? (
          <div className="ui massive green button" onClick={this.handleDeal}>
            Deal
          </div>
        ) : null}
      </div>
    );
  }
}
