import React, { Component } from "react";
import cards from "../cards";
import GamePlay from "./GamePlay";
import ColorSelect from './ColorSelect'
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
    turn: null,
    discard: null,
    drawAmount: 0,
    colorSelect: false,
    playedCard: null
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
    io.on("drawCards.new", cards => this.setState({ drawCards: cards }));
    io.on("dealt", () => {
      this.setState({ deal: true });
      this.deal();
    });
    io.on("next.dealt", ({ id }) => {
      let player = this.state.players.find(player => player.id === id);
      if (this.state.players.indexOf(player) + 2 <= this.state.players.length) {
        return this.setState(
          {
            turn: this.state.players[this.state.players.indexOf(player) + 1]
          },
          () => this.deal()
        );
      }
      return this.setState({turn: this.state.players[0]})
    })
    io.on('drew', (cards) => {
      let player = this.state.players.find(player => player.id === this.state.turn.id)
      this.setState({
        drawCards: cards,
        drawAmount: 0,
        turn: (this.state.players.indexOf(player) + 1 >= this.state.players.length ? this.state.players[0] : this.state.players[this.state.players.indexOf(player) + 1])
      })
    })
    io.on('normal.played', (playedCard) => {
      let player = this.state.players.find(player => player.id === this.state.turn.id)
      this.setState({
        player: {...this.state.player, cards: this.state.player.cards.filter(card => card.id != playedCard.id)},
        discard: playedCard,
        turn: (this.state.players.indexOf(player) + 1 >= this.state.players.length ? this.state.players[0] : this.state.players[this.state.players.indexOf(player) + 1])
      }, () => this.state.player.cards.length == 1 ? this.uno(this.state.player.user) : (this.state.player.cards.length == 0 ? this.winner(this.state.player.user) : null))
    })
    io.on('skip.played', (playedCard) => {
      let player = this.state.players.find(player => player.id === this.state.turn.id)
      this.setState({
        player: {...this.state.player, cards: this.state.player.cards.filter(card => card.id != playedCard.id)},
        discard: playedCard,
        turn: (this.state.players.indexOf(player) + 1 == this.state.players.length ? this.state.players[1] : (this.state.players.indexOf(player) + 2 == this.state.players.length ? this.state.players[0] : this.state.players[this.state.players.indexOf(player) + 2]))
      }, () => this.state.player.cards.length == 1 ? this.uno(this.state.player.user) : (this.state.player.cards.length == 0 ? this.winner(this.state.player.user) : null))
    })
    io.on('reverse.played', (playedCard) => {
      let player = this.state.players.find(player => player.id === this.state.turn.id)
      this.setState({
        player: {...this.state.player, cards: this.state.player.cards.filter(card => card.id != playedCard.id)},
        discard: playedCard,
        turn: (this.state.players.indexOf(player) == 0 ? this.state.players[this.state.players.length -1] : this.state.players[this.state.players.indexOf(player) - 1]),
        players: this.state.players.reverse()
      }, () => this.state.player.cards.length == 1 ? this.uno(this.state.player.user) : (this.state.player.cards.length == 0 ? this.winner(this.state.player.user) : null))
    })
    io.on('draw2.played', (playedCard) => {
      let player = this.state.players.find(player => player.id === this.state.turn.id)
      this.setState({
        player: {...this.state.player, cards: this.state.player.cards.filter(card => card.id != playedCard.id)},
        discard: playedCard,
        turn: (this.state.players.indexOf(player) + 1 >= this.state.players.length ? this.state.players[0] : this.state.players[this.state.players.indexOf(player) + 1]),
        drawAmount: this.state.drawAmount + 2
      }, () => this.state.player.cards.length == 1 ? this.uno(this.state.player.user) : (this.state.player.cards.length == 0 ? this.winner(this.state.player.user) : null))
    })
    io.on('draw4.played', (playedCard) => {
      let player = this.state.players.find(player => player.id === this.state.turn.id)
      this.setState({
        player: {...this.state.player, cards: this.state.player.cards.filter(card => card.id != playedCard.id)},
        discard: playedCard,
        turn: (this.state.players.indexOf(player) + 1 >= this.state.players.length ? this.state.players[0] : this.state.players[this.state.players.indexOf(player) + 1]),
        drawAmount: this.state.drawAmount + 4,
        colorSelect: false
      }, () => this.state.player.cards.length == 1 ? this.uno(this.state.player.user) : (this.state.player.cards.length == 0 ? this.winner(this.state.player.user) : null))
    })
    io.on('wild.played', (playedCard) => {
      let player = this.state.players.find(player => player.id === this.state.turn.id)
      this.setState({
        player: {...this.state.player, cards: this.state.player.cards.filter(card => card.id != playedCard.id)},
        discard: playedCard,
        turn: (this.state.players.indexOf(player) + 1 >= this.state.players.length ? this.state.players[0] : this.state.players[this.state.players.indexOf(player) + 1]),
        colorSelect: false
      }, () => this.state.player.cards.length == 1 ? this.uno(this.state.player.user) : (this.state.player.cards.length == 0 ? this.winner(this.state.player.user) : null))
    })
    io.on('unoer', player => alert(`${player.username} has uno!`))
    io.on("winner", player => {
      alert(`${player.username} wins`) 
      this.props.handleHome()
    });
  }

  deal = () => {
    if (this.state.player.user.id == this.state.turn.id) {
      let x = 0;
      let drawCards = this.state.drawCards;
      while (x < 7) {
        let randomNumber = Math.floor(Math.random() * drawCards.length);
        let drawnCard = drawCards[randomNumber];

        this.state.player.cards.push(drawnCard);
        drawCards = drawCards.filter(card => card != drawnCard);
        x = x + 1;
      }
      this.setState({ drawCards });
      io.emit("cards.dealt", drawCards);
      io.emit("next.deal", this.state.turn);
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

  handleDraw = () => {
    if(this.state.player.user.id === this.state.turn.id){
      if(this.state.drawAmount == 0){
        let drawCards = this.state.drawCards
        
        let randomNumber = Math.floor(Math.random() * drawCards.length);
        let drawnCard = drawCards[randomNumber];
        drawCards = drawCards.filter(card => card.id != drawnCard.id)
        
        this.setState({player: {...this.state.player, cards: [...this.state.player.cards, drawnCard]}})
        return io.emit('draw', drawCards)
      }
      
      let drawAmount = this.state.drawAmount
      let drawCards = this.state.drawCards
      let drawnCards = []

      while(drawAmount > 0){
        let randomNumber = Math.floor(Math.random() * drawCards.length);
        let drawnCard = drawCards[randomNumber];
        drawCards = drawCards.filter(card => card.id != drawnCard.id)
        drawnCards.push(drawnCard)

        drawAmount = drawAmount - 1
      }
      this.setState({player: {...this.state.player, cards: [...this.state.player.cards, ...drawnCards]}})
      io.emit('draw', drawCards)
    }
  };

  handlePlay = (playedCard) => {
    console.log(playedCard)
    let drawAmount = this.state.drawAmount
    if(this.state.player.user.id === this.state.turn.id){
      if(!this.state.discard){
        if(playedCard.type == 'wild'){
          return this.setState({
            colorSelect: true,
            playedCard
          })
        }
        if(playedCard.type == '+4'){
          return this.setState({
            colorSelect: true,
            playedCard
          })
        }
        if(playedCard.type == '+2'){
          return io.emit('draw2.play', playedCard)
        }
        if(playedCard.type == 'skip'){
          return io.emit('skip.play', playedCard)

        }
        if (playedCard.type == "reverse") {
          return io.emit("reverse.play", playedCard);
        }
        return io.emit('normal.play', playedCard)
      }
      if(drawAmount == 0){
        if(playedCard.type == 'wild'){
          return this.setState({
            colorSelect: true,
            playedCard
          })
        }
        if(playedCard.type == '+4'){
          return this.setState({
            colorSelect: true,
            playedCard
          })
        }
        if((playedCard.type == this.state.discard.type) || (playedCard.color == this.state.discard.color)){
          if(playedCard.type == '+2'){
            return io.emit('draw2.play', playedCard)
          }
          if(playedCard.type == 'skip'){
            return io.emit('skip.play', playedCard)
          }
          if(playedCard.type == 'reverse'){
            return io.emit('reverse.play', playedCard)
          }
          return io.emit('normal.play', playedCard)
        }
      }
      if(playedCard.type == this.state.discard.type){
        if(playedCard.type == '+4'){
          return this.setState({
            colorSelect: true,
            playedCard
          })
        }
        if(playedCard.type == '+2'){
          return io.emit('draw2.play', playedCard)
        }
      }
    }
  };

  handleColorSelect =  color => {
    if(this.state.playedCard.type === 'wild'){
      let playedCard = { ...this.state.playedCard, color: color }
      this.setState({ playedCard: null })
      return io.emit('wild.play', playedCard)
    }
    if(this.state.playedCard.type === '+4'){
      let playedCard = { ...this.state.playedCard, color: color }
      this.setState({ playedCard: null })
      return io.emit('draw4.play', playedCard)
    }
  }

  uno = player => {
    io.emit('i.uno', player)
  }

  winner = player => {
   io.emit('i.win', player)
  };

  render() {
    if (this.state.deal) {
      return (
        <div>
          {this.state.colorSelect ? <ColorSelect handleColorSelect={this.handleColorSelect}/> : 
            <GamePlay
              drawCards={this.state.drawCards}
              cards={this.state.player.cards}
              turn={this.state.turn.username}
              handlePlay={this.handlePlay}
              discard={this.state.discard}
              handleDraw={this.handleDraw}
              colorSelect={this.state.colorSelect}
            />}
        </div>
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
