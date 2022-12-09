import React, { Component } from "react";
import GradeDistribution from "./grade_distribution";
import CourseEvaluation from "./course_evaluation";
import RelatedTeachings from "./related_teaching";
import EnrollmentStats from "./enrollment_stats";

export class CourseBody extends Component {
  constructor() {
    super();
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { resp } = this.props;
    const { width } = this.state;
    return (
      <div id="xbody">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <GradeDistribution {...this.props} />
              {width > 990 ? (
                <RelatedTeachings
                  title={`Professors Teaching ${resp.subject.name}${resp.subject.catalog_number}`}
                  data={resp.instructors}
                  pathname={"/professor"}
                  history={this.props.history}
                  {...this.props}
                />
              ) : (
                <CourseEvaluation {...this.props} />
              )}
            </div>
            <div className="col-xs-12 col-md-6">
              <EnrollmentStats {...this.props} />
              {width > 990 ? (
                <CourseEvaluation {...this.props} />
              ) : (
                <RelatedTeachings
                  title={`Professors Teaching ${resp.subject.name}${resp.subject.catalog_number}`}
                  data={resp.instructors}
                  pathname={"/professor"}
                  history={this.props.history}
                  {...this.props}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseBody;
