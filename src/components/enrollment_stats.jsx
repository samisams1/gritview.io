import React, { Component } from "react";
import StatsNumericalLabel from "./stats_num_label";
import qs from "qs";

export class EnrollmentStats extends Component {
  constructor() {
    super();
    this.state = {
      course: null,
      professor: null,
    };
  }
  componentDidMount() {
    this.setCourse();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setCourse();
    }
  }
  render() {
    const { enrollment } = this.props.resp;
    const { location } = this.props;
    const { course, professor } = this.state;
    let params = this.getURLParams();
    return (
      <div id="trending">
        <h2>Enrollment Stats</h2>
        {location.pathname === "/professor" &&
        (params.course === "null" || params.course === undefined) ? (
          <p id="subdescription">
            Select a <strong>Course</strong> to view enrollment statistics
          </p>
        ) : (
          <div>
            {professor === "null" || professor === undefined ? (
              <p id="subdescription">
                Showing the number of Students enrolled in{" "}
                <strong>
                  {course}{" "}
                  {params.topic === undefined ? null : " - " + params.topic}{" "}
                </strong>
              </p>
            ) : (
              <p id="subdescription">
                Showing the number of Students enrolled in{" "}
                <strong>
                  {professor}'s {course}{" "}
                  {params.topic === undefined ? null : " - " + params.topic}{" "}
                </strong>{" "}
                class
              </p>
            )}
          </div>
        )}
        <br />
        <div className="list-style">
          <ul>
            {enrollment.slice(0, 4).map((item, i) => (
              <li key={i}>
                <StatsNumericalLabel label={item[0]} value={item[1]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  getURLParams = () => {
    const { location } = this.props;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    return params;
  };

  setCourse = () => {
    let params = this.getURLParams();
    const { location } = this.props;
    if (location.pathname === "/professor") {
      this.setState({
        course: params.course,
        professor: params.name,
      });
    } else {
      this.setState({
        course: params.name,
        professor: params.professor,
      });
    }
  };
}

export default EnrollmentStats;
