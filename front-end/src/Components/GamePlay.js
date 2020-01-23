import React from "react";
import { io } from "../Socket";
import UnoCard from "./UnoCard";
import "../UnoCard.css";
import UnoBack from "./UnoBack";
import ColorSelect from './ColorSelect'

export default class GamePlay extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{color: 'white'}}>Turn: {this.props.turn}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "40vh"
          }}
        >
          <div onClick={this.props.handleDraw}>
            <UnoBack />
          </div>
            <UnoCard {...this.props.discard}/> 
        </div>
        <div className='ui cards' style={{justifyContent: 'center'}}
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "flex-end",
          //   height: "40vh"
          // }}
        >
          {this.props.cards.map(card => {
            return(
              <div key={card.id} onClick={() => this.props.handlePlay(card)}>
                <UnoCard {...card}/>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
