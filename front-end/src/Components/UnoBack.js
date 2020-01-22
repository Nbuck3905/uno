import React, { Component } from "react";
import "../UnoCard.css";

export default class UnoBack extends Component {
  render() {
    return (
      <div
        className={`card symbol-${this.props.type} darkgray`}
        style={{ fontSize: "27px" }}
      >
        <span className="inner">
          <span
            className="mark"
            style={{
              backgroundColor: "red",
              color: "yellow",
              transform: "rotate(-20deg)"
            }}
          >
            UNO
          </span>
        </span>
      </div>
    );
  }
}
