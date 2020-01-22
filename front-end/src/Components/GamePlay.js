import React from "react";
import { io } from "../Socket";
import UnoCard from "./UnoCard";
import "../UnoCard.css";
import UnoBack from "./UnoBack";

export default class GamePlay extends React.Component {
  render() {
    console.log(this.props.drawCards);
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "40vh"
          }}
        >
          <UnoBack />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "40vh"
          }}
        >
          {this.props.cards.map(card => (
            <UnoCard {...card} />
          ))}
        </div>
      </div>
    );
  }
}
