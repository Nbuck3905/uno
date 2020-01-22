import React from "react";
import { io } from "../Socket";
import UnoCard from "./UnoCard";
import "../UnoCard.css";

export default class GamePlay extends React.Component {
  render() {
    return (
      <div>
        {this.props.cards.map(card => (
          <UnoCard {...card} />
        ))}
      </div>
    );
  }
}
