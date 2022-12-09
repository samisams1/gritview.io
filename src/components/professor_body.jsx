import React, { Component } from "react";
import GradeDistribution from "./grade_distribution";
import CourseEvaluation from "./course_evaluation";
import RelatedTeachings from "./related_teaching";
import EnrollmentStats from "./enrollment_stats";

export class ProfessorBody extends Component {
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
    const { width } = this.state;
    return (
      <div id="xbody">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div>
                <GradeDistribution {...this.props} />

                {width > 990 ? (
                  <RelatedTeachings
                    title={`Courses Taught by ${this.props.resp.instructor.first_name} ${this.props.resp.instructor.last_name}`}
                    data={this.props.resp.instructor.subjects}
                    pathname={"/course"}
                    history={this.props.history}
                    {...this.props}
                  />
                ) : (
                  <CourseEvaluation {...this.props} />
                )}
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              {width > 990 ? null : <EnrollmentStats {...this.props} />}
              {width > 990 ? (
                <CourseEvaluation {...this.props} />
              ) : (
                <RelatedTeachings
                  title={`Courses Taught by ${this.props.resp.instructor.first_name} ${this.props.resp.instructor.last_name}`}
                  data={this.props.resp.instructor.subjects}
                  pathname={"/course"}
                  history={this.props.history}
                  {...this.props}
                />
              )}
              {width > 990 ? (
                <div>
                  <br />
                  <EnrollmentStats {...this.props} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfessorBody;
