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
    drawCards: [],
    turn: null
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
      drawCards: cards,
    });
    this.getCreator(this.props.game.creator_id);
    io.on('new.drawCards', (cards) => this.setState({drawCards: cards}))
    io.on("dealt", () => {
      this.setState({ deal: true });
      this.deal();
    });
    io.on('next.dealt', ({ id }) => {
      let player = this.state.players.find(player => player.id === id)
      if( this.state.players.indexOf(player) + 2 <= this.state.players.length){
        this.setState({
          turn: this.state.players[this.state.players.indexOf(player) + 1]
        }, () => this.deal())
        
      }
    })
  }

  deal = () => {
    
    if(this.state.player.user.id == this.state.turn.id){
      let x = 0;
      let drawCards = this.state.drawCards
      while (x < 7) {
        console.log(drawCards.length)
        let randomNumber = Math.floor(
          Math.random() * drawCards.length
        );
        console.log(randomNumber);
        let drawnCard = drawCards[randomNumber];
        this.state.player.cards.push(drawnCard);
        
        drawCards = drawCards.filter(card => card != drawnCard)
        
        x = x + 1;
      }
      this.setState({ drawCards })
      io.emit('card.drawn', drawCards)
      io.emit('next.deal', this.state.turn);
    }
  };

  getCreator = id => {
    io.emit("creator.get", id);
    io.on("creator.send", creator => {
      this.setState({
        players: [...this.props.players, creator],
        creator: creator,
        turn: this.state.players[0]
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
