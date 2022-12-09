import React, { Component } from "react";

export class StatsNumericalLabel extends Component {
  render() {
    return (
      <div id="numstat">
        <p>{this.props.label}</p>
        <b> {this.props.value}</b>
      </div>
    );
  }
}

export default StatsNumericalLabel;
