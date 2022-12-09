import React, { Component } from "react";
import qs from "qs";
import EvaluationRadarChart from "./evaluation_radar_chart";

export class CourseEvaluation extends Component {
  constructor() {
    super();
    this.state = {
      professor: "All Professors",
      course: "All Courses",
      semester: "All Semesters",
      description: null,
      showEvaluation: true,
    };
  }

  componentDidMount() {
    let params = this.getURLParams();
    let description = this.getDescription(params)[0];
    let showEvaluation = this.getDescription(params)[1];
    this.setState({
      description: description,
      showEvaluation: showEvaluation,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location !== this.props.location ||
      prevProps.resp !== this.props.resp
    ) {
      let params = this.getURLParams();
      let description = this.getDescription(params)[0];
      let showEvaluation = this.getDescription(params)[1];
      this.setState({
        description: description,
        showEvaluation: showEvaluation,
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

    if (professor === "All Professors" && location.pathname === "/course") {
      return [
        <p>
          Select a <strong>Professor</strong> to view course evaluations for{" "}
          <strong>
            {params.name}{" "}
            {params.topic === undefined ? null : " - " + params.topic}{" "}
          </strong>
        </p>,
        false,
      ];
    }
    return [
      <div>
        <p>Showing Course Evaluations </p>
        {location.pathname === "/course" ? (
          <p>
            given to{" "}
            <strong>
              {professor}'s {params.name}
              {params.topic === undefined ? null : " - " + params.topic}{" "}
            </strong>
            {" class "}
          </p>
        ) : course === "All Courses" ? (
          <p>
            of<strong> All Courses </strong> taught by{" "}
            <strong>{params.name} </strong>
          </p>
        ) : (
          <p>
            given to
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
      </div>,
      true,
    ];
  };

  render() {
    const { description, showEvaluation } = this.state;
    return (
      <div id="trending">
        <h2>Course Evaluations</h2>
        <div id="subdescription">{description === null ? "" : description}</div>
        {showEvaluation ? <EvaluationRadarChart {...this.props} /> : <p></p>}
        <br />
      </div>
    );
  }
}

export default CourseEvaluation;
