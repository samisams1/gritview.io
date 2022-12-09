import React, { Component } from "react";
import Navigation from "./navigation";
import axios from "axios";
import qs from "qs";
import ProfessorHeader from "../components/professor_header";
import ProfessorBody from "../components/professor_body";
import Footer from "./footer";
import JsonData from "../data/data.json";
import Reviews from "../components/reviews";
import baseURL from "../utils/constant.js";

export class Professor extends Component {
  constructor() {
    super();
    this.state = {
      professor: [],
      landingPageData: {},
    };
  }

  componentDidMount() {
    const { location } = this.props;

    this.setState({ landingPageData: JsonData });

    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    let topic = params.topic ? params.topic.replace("&", "%26") : null;
    let id = params.profId || null;

    this._fetchProfessor(
      params.name,
      id,
      params.course,
      topic,
      params.semester
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { location } = this.props;

      let params = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      let topic = params.topic ? params.topic.replace("&", "%26") : null;
      let id = params.profId || null;

      this._fetchProfessor(
        params.name,
        id,
        params.course,
        topic,
        params.semester
      );
    }
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

  async _fetchProfessor(
    professor,
    id,
    course = null,
    topic = null,
    semester = null
  ) {
    axios
      .get(
        `${baseURL}/professor?professor=${professor}&profId=${id}&course=${course}&semester=${semester}&topic=${topic}`
      )
      .then((res) => {
        const professor_resp = res.data;
        this.track_selection(
          professor_resp.instructor === undefined
            ? null
            : professor_resp.instructor.id,
          professor_resp.subject === undefined
            ? null
            : professor_resp.subject.id
        );
        this.setState({ professor: professor_resp });
      });
  }

  render() {
    if (this.state === null || this.state.professor.length === 0) {
      return <Navigation {...this.props} />;
    }
    return (
      <div>
        <Navigation {...this.props} />
        <ProfessorHeader {...this.props} resp={this.state.professor} />
        <ProfessorBody {...this.props} resp={this.state.professor} />
        <Reviews {...this.props} resp={this.state.professor} />
        <Footer data={this.state.landingPageData.Footer} {...this.props} />
      </div>
    );
  }
}

export default Professor;
