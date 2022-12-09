/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import firebase from "../containers/firebase";

export class NumericalLabel extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }
  componentDidMount() {
    var value = this.props.value;

    if (typeof value === "string" && value.includes("-")) {
      let first = value.split("-")[0].split(".")[0];
      let second = value.split("-")[1].split(".")[0];
      this.setState({
        value: first + "-" + second,
      });
    } else {
      this.setState({
        value: typeof value === "string" ? value.split(".")[0] : value,
      });
    }
  }
  render() {
    const { name, label } = this.props;
    return (
      <div id="numericalLabel">
        <a href="#" onClick={this.handleClick}>
          {name} <b> |</b> <p> {this.state.value}</p>
          <sub> {label}</sub>
        </a>
      </div>
    );
  }

  handleClick = (e) => {
    e.preventDefault();

    const { name, pathname, history } = this.props;
    firebase.analytics().logEvent(`${pathname}_link_selection`);

    let topic, course_name;

    if (name.includes("@")) {
      let professor_name = name.split("@")[0].trim();
      course_name = name.split("@")[1].trim();

      if (course_name.includes(" - ")) {
        topic = course_name.split(" - ")[1].trim().replace("&", "%26");
        course_name = course_name.split(" - ")[0].trim();

        history.push({
          pathname: pathname,
          search: `?name=${professor_name}&profId=${this.props.id}&course=${course_name}&topic=${topic}`,
        });
      }
      else {
        history.push({
          pathname: pathname,
          search: `?name=${professor_name}&profId=${this.props.id}&course=${course_name}`,
        });
      }
    }
    else if (name.includes(" - ")) {
      course_name = name.split(" - ")[0].trim();
      topic = name.split(" - ")[1].trim().replace("&", "%26");

      history.push({
        pathname: pathname,
        search: `?name=${course_name}&topic=${topic}`,
      });
    }
    else {
      if (pathname === "/course") {
        history.push({
          pathname: pathname,
          search: `?name=${name}`,
        });
      }
      else {
        history.push({
          pathname: pathname,
          search: `?name=${name}&profId=${this.props.id !== undefined ? this.props.id : ''}`,
        });
      }
    }
  };
}

export default NumericalLabel;
