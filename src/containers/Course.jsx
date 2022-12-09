import React, { Component } from "react";
import Navigation from "./navigation";
import axios from "axios";
import qs from "qs";
import CourseHeader from "../components/courseHeader";
import CourseBody from "../components/course_body";
import Footer from "./footer";
import JsonData from "../data/data.json";
import Reviews from "../components/reviews";
import baseURL from "../utils/constant.js";

export class Course extends Component {
  constructor() {
    super();
    this.state = {
      course: [],
      landingPageData: {},
    };
  }

  componentDidMount() {
    this.setState({ landingPageData: JsonData });
    let params = this.getURLParams();
    let topic = params.topic ? params.topic.replace("&", "%26") : null;
    if (params.professor !== undefined && params.professor !== "null")
      this._fetchProfessor(
        params.professor,
        params.name,
        topic,
        params.semester
      );
    else this._fetchCourse(params.name, topic, params.semester);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      let params = this.getURLParams();
      let topic = params.topic ? params.topic.replace("&", "%26") : null;
      let id = params.profId || null;
      if (params.professor !== undefined && params.professor !== "null")
        this._fetchProfessor(
          params.professor,
          id,
          params.name,
          topic,
          params.semester
        );
      else this._fetchCourse(params.name, topic, params.semester);
    }
  }

  getURLParams() {
    const { location } = this.props;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    return params;
  }

  async _fetchCourse(name, topic = null, semester = null) {
    await axios
      .get(
        `${baseURL}/course?course=${name}&topic=${topic}&semester=${semester}`
      )
      .then((res) => {
        const course_resp = res.data;
        this.track_selection(
          course_resp.instructor === undefined
            ? null
            : course_resp.instructor.id,
          course_resp.subject === undefined ? null : course_resp.subject.id
        );
        this.setState({ course: course_resp });
      });
  }

  track_selection(instructor_id, subject_id) {
    axios({
      method: "post",
      url: `${baseURL}/track/`,
      data: {
        instructor_id: instructor_id,
        subject_id: subject_id,
      },
    });
  }

  async _fetchProfessor(name, course, topic = null, semester = null) {
    await axios
      .get(
        `${baseURL}/professor?professor=${name}&course=${course}&topic=${topic}&semester=${semester}`
      )
      .then((res) => {
        const course_resp = res.data;
        this.track_selection(
          course_resp.instructor === undefined
            ? null
            : course_resp.instructor.id,
          course_resp.subject === undefined ? null : course_resp.subject.id
        );
        this.setState({ course: course_resp });
      });
  }

  render() {
    if (this.state.course.length === 0) {
      return <Navigation {...this.props} />;
    }
    return (
      <div>
        <Navigation {...this.props} />
        <CourseHeader {...this.props} resp={this.state.course} />
        <CourseBody {...this.props} resp={this.state.course} />
        <Reviews {...this.props} resp={this.state.course} />
        <Footer data={this.state.landingPageData.Footer} {...this.props} />
      </div>
    );
  }
}

export default Course;
