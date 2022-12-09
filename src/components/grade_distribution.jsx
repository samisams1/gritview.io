import React, { Component } from "react";
import qs from "qs";
import GradeBarChart from "./grade_bar_chart";

export class GradeDistribution extends Component {
  constructor() {
    super();
    this.state = {
      professor: "All Professors",
      course: "All Courses",
      semester: "All Semesters",
      description: null,
    };
  }

  componentDidMount() {
    let params = this.getURLParams();
    let description = this.getDescription(params);
    this.setState({
      description: description,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location !== this.props.location ||
      prevProps.resp !== this.props.resp
    ) {
      let params = this.getURLParams();
      let description = this.getDescription(params);
      this.setState({
        description: description,
      });
    }
  }

  getURLParams = () => {
    const { location } = this.props;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    return params;
  };

  getDescription = (params) => {
    const { location } = this.props;
    let professor =
      params.professor && params.professor !== "null"
        ? params.professor
        : params.professor !== "null"
        ? this.state.professor
        : "All Professors";
    let course =
      params.course && params.course !== "null"
        ? params.course
        : params.course !== "null"
        ? this.state.course
        : "All Courses";
    let semester =
      params.semester && params.semester !== "null"
        ? params.semester
        : params.semester !== "null"
        ? this.state.semester
        : "All Semesters";
    return (
      <div>
        <p>Showing Grade Distributions of </p>
        {location.pathname === "/course" ? (
          professor === "All Professors" ? (
            <p>
              <strong>{professor}</strong> teaching{" "}
              <strong>
                {params.name}{" "}
                {params.topic === undefined ? null : " - " + params.topic}{" "}
              </strong>
            </p>
          ) : (
            <p>
              <strong>
                {" "}
                {professor}'s {params.name}
                {params.topic === undefined ? null : " - " + params.topic}{" "}
              </strong>
              {" class "}
            </p>
          )
        ) : course === "All Courses" ? (
          <p>
            <strong>{course} </strong>taught by <strong>{params.name} </strong>
          </p>
        ) : (
          <p>
            <strong>
              {" "}
              {params.name}'s {course}
              {params.topic === undefined ? null : " - " + params.topic}{" "}
            </strong>
            {" class "}
          </p>
        )}
        {semester === "All Semesters" ? (
          <p>
            across <strong>{semester}</strong>
          </p>
        ) : (
          <p>
            for <strong>{semester}</strong>{" "}
          </p>
        )}
      </div>
    );
  };

  render() {
    const { description } = this.state;
    return (
      <div id="trending">
        <h2>Grade Distribution</h2>
        <div id="subdescription">{description === null ? "" : description}</div>
        <br />
        <GradeBarChart {...this.props} />
        <span>
          <b>Grade O (Other),</b> represents withdrawals, incompletes, fails,
          and other given grades that are not part of the standard grade (
          <b>A</b> - <b>F</b>).
        </span>
      </div>
    );
  }
}

export default GradeDistribution;
