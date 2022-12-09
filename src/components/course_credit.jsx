import React, { Component } from "react";

export class CourseCredit extends Component {
  constructor() {
    super();
    this.state = {
      credits: "",
    };
  }
  componentDidMount() {
    var credits = this.props.credits;
    if (credits.includes("-")) {
      let first = credits.split("-")[0].split(".")[0];
      let second = credits.split("-")[1].split(".")[0];
      this.setState({
        credits: first + "-" + second,
      });
    } else {
      this.setState({
        credits: credits.split(".")[0],
      });
    }
  }
  render() {
    return (
      <div id="courseCredit">
        <b>{this.state.credits}</b>
        <p>credits</p>
      </div>
    );
  }
}

export default CourseCredit;
