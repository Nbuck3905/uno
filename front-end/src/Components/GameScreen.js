import React, { Component } from "react";
import cards from "../cards";
import UnoCard from "./UnoCard";
import { io } from '../Socket'

export default class GameScreen extends Component {
  state = {
    allCards: [],
    game: null,
    players: [],
    creator: {},
    player: {
      user: {},
      cards: []
    }
  };

  componentDidMount() {
    this.setState({
      allCards: cards,
      game: this.props.game,
      players: this.props.players,
      player: {
        user: this.props.user,
        cards: []
      }
    });
    this.getCreator(this.props.game.creator_id)
  }
  
  getCreator = (id) => {
    io.emit('creator.get', id)
    io.on('creator.send', (creator) => {
      this.setState({
        creator: creator
      })
    })
  }

  render() {
    return (
      <div className="ui raised very padded text container segment form">
        {this.state.game ? 
          <div>
            <h1>{this.state.game.name}</h1>
            <h2>{this.state.player.user.username}</h2>
            <h3>Creator: {this.state.creator.username}</h3>
          </div>
          : null }
        {this.state.players.map(player => {
          return <h3>{player.username}</h3>
        })}
        {this.props.user.id == this.state.creator.id ? <div className='ui massive green button'>Deal</div>}
      </div>
    );
  }
}
