import React, { Component } from "react";
import "../UnoCard.css";

export default class UnoCard extends Component {
  render() {
    switch (this.props.type) {
      case "skip":
        return (
          <div
            className={`card symbol-${this.props.type} ${this.props.color}`}
            style={{ fontSize: "27px" }}
          >
            <span className="inner">
              <span className="mark" style={{ transform: "rotate(-45deg)" }}>
                {this.props.type}
              </span>
            </span>
          </div>
        );
      case "wild":
        return (
          <div
            className={`card symbol-${this.props.type} ${this.props.color}`}
            style={{ fontSize: "27px" }}
          >
            <span className="inner">
              <span className="mark" style={{ transform: "rotate(-45deg)" }}>
                {this.props.type}
              </span>
            </span>
          </div>
        );
      case "reverse":
        return (
          <div
            className={`card symbol-${this.props.type} ${this.props.color}`}
            style={{ fontSize: "16px" }}
          >
            <span className="inner">
              <span className="mark" style={{ transform: "rotate(-45deg)" }}>
                {this.props.type}
              </span>
            </span>
          </div>
        );
      case "+2":
        return (
          <div
            className={`card symbol-${this.props.type} ${this.props.color}`}
            style={{ fontSize: "50px" }}
          >
            <span className="inner">
              <span className="mark" style={{ transform: "rotate(-45deg)" }}>
                {this.props.type}
              </span>
            </span>
          </div>
        );
      case "+4":
        return (
          <div
            className={`card symbol-${this.props.type} ${this.props.color}`}
            style={{ fontSize: "50px" }}
          >
            <span className="inner">
              <span className="mark" style={{ transform: "rotate(-45deg)" }}>
                {this.props.type}
              </span>
            </span>
          </div>
        );
      default:
        return (
          <div className={`card symbol-${this.props.type} ${this.props.color}`}>
            <span className="inner">
              <span className="mark">{this.props.type}</span>
            </span>
          </div>
        );
    }
  }
}
