import React, { Component } from "react";
import Select from "react-select";
import qs from "qs";
import firebase from "../containers/firebase";

export class FilterBy extends Component {
  constructor() {
    super();
    this.state = {
      professors: [],
      courses: [],
      semesters: [],
      selectedPrimary: null, // professor & course
      selectedSecondary: null, // semester only
    };
  }

  async componentDidMount() {
    await this.config_semesters();
    await this.config_professors();
    await this.config_courses();
    await this.update_filters();
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.resp !== this.props.resp ||
      prevProps.location !== this.props.location
    ) {
      await this.config_semesters();
      await this.config_professors();
      await this.config_courses();
      await this.update_filters();
    }
  }

  update_filters() {
    const { location } = this.props;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    let semester = this.state.semesters.filter(function (semester) {
      return semester.label === params.semester;
    })[0];
    let professor = this.state.professors.filter(function (professor) {
      return professor.label === params.professor;
    })[0];
    let course = this.state.courses.filter(function (course) {
      if (params.topic)
        return course.label === `${params.course} - ${params.topic}`;
      else {
        return course.label === params.course;
      }
    })[0];
    this.setState({
      selectedSecondary: semester === undefined ? null : semester,
      selectedPrimary:
        location.pathname === "/course"
          ? professor === undefined
            ? null
            : professor
          : course === undefined
          ? null
          : course,
    });
  }

  render() {
    const { location } = this.props;
    return (
      <div id="filterby">
        <h4>Filter by:</h4>
        <div className="select-bar">
          <Select
            options={
              location.pathname === "/course"
                ? this.state.professors
                : this.state.courses
            }
            onChange={this.onPrimarySelect}
            styles={customStyles}
            value={this.state.selectedPrimary}
            isSearchable={false}
            placeholder={
              location.pathname === "/course" ? "All Professors" : "All Courses"
            }
          />
          <p />
          <Select
            options={this.state.semesters}
            onChange={this.onSecondarySelect}
            styles={customStyles}
            value={this.state.selectedSecondary}
            placeholder="All Semesters"
            isSearchable={false}
            isDisabled={
              location.pathname === "/professor"
                ? this.state.selectedPrimary
                  ? false
                  : true
                : false
            }
          />
        </div>
      </div>
    );
  }

  onPrimarySelect = (e) => {
    firebase.analytics().logEvent("primary_filter_selection");
    this.setState({
      selectedSecondary: null,
    });
    const { location } = this.props;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    var value;
    var topic;
    if (location.pathname === "/professor") {
      let hasTopic = e.label.includes(" - ");
      if (e.value === null) value = null;
      else value = hasTopic ? e.label.split(" - ")[0].trim() : e.label;
      topic = hasTopic
        ? e.label.split(" - ")[1].trim().replace("&", "%26")
        : undefined;
    } else {
      topic =
        params.topic !== undefined
          ? params.topic.replace("&", "%26")
          : undefined;
      value = e.label === "All Professors" ? null : e.label;
    }
    this.props.history.push({
      pathname: location.pathname,
      search: `?name=${params.name}&${
        location.pathname === "/course" ? "professor=" : "course="
      }${value}&semester=${null}${topic === undefined ? "" : "&topic="}${
        topic === undefined ? "" : topic
      }`,
    });
    window.location.reload();
  };

  onSecondarySelect = (e) => {
    firebase.analytics().logEvent("secondary_filter_selection");
    const { location } = this.props;
    var semester;
    if (e.value === null) semester = null;
    else semester = e.label;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    let topic =
      params.topic !== undefined ? params.topic.replace("&", "%26") : undefined;
    this.props.history.push({
      pathname: location.pathname,
      search: `?name=${params.name}&${
        location.pathname === "/course" ? "professor=" : "course="
      }${
        location.pathname === "/course"
          ? params.professor === undefined
            ? null
            : params.professor
          : params.course === undefined
          ? null
          : params.course
      }&semester=${semester}${topic === undefined ? "" : "&topic="}${
        topic === undefined ? "" : topic
      }`,
    });
    window.location.reload();
  };

  async config_semesters() {
    var _semesters = [{ value: null, label: "All Semesters" }];
    var i;
    const { location } = this.props;
    if (location.pathname === "/professor") {
      for (i = 0; i < this.props.resp.instructor.semesters.length; i++) {
        let semester = this.props.resp.instructor.semesters[i];
        let item = {
          value: semester,
          label: semester,
        };
        _semesters.push(item);
      }
    } else {
      for (i = 0; i < this.props.resp.semesters.length; i++) {
        let semester = this.props.resp.semesters[i];
        let item = {
          value: semester,
          label: semester,
        };
        _semesters.push(item);
      }
    }
    this.setState({ semesters: [..._semesters] });
  }

  async config_professors() {
    if (this.props.resp.instructors === undefined) return;
    var _professors = [{ value: null, label: "All Professors" }];
    var i;
    for (i = 0; i < this.props.resp.instructors.length; i++) {
      let label = {
        value: this.props.resp.instructors[i].id,
        label: `${this.props.resp.instructors[i].first_name} ${this.props.resp.instructors[i].last_name}`,
      };
      _professors.push(label);
    }
    this.setState({ professors: [..._professors] });
  }

  async config_courses() {
    const { location } = this.props;
    var i;
    var _courses = [{ value: null, label: "All Courses" }];
    if (location.pathname === "/professor") {
      if (this.props.resp.instructor.subjects === undefined) return;
      for (i = 0; i < this.props.resp.instructor.subjects.length; i++) {
        let subject = this.props.resp.instructor.subjects[i];
        let showTopic = subject.catalog_topic === null ? false : true;
        let label = {
          value: subject,
          label:
            `${subject.name}${subject.catalog_number}` +
            `${showTopic ? " - " : ""}` +
            `${showTopic ? subject.catalog_topic : ""}`,
        };
        _courses.push(label);
      }
    } else {
      if (this.props.resp.subjects === undefined) return;
      for (i = 0; i < this.props.resp.subjects.length; i++) {
        let subject = this.props.resp.subjects[i];
        let showTopic = subject.catalog_topic === null ? false : true;
        let label = {
          value: subject,
          label:
            `${subject.name}${subject.catalog_number}` +
            `${showTopic ? " - " : ""}` +
            `${showTopic ? subject.catalog_topic : ""}`,
        };
        _courses.push(label);
      }
    }
    this.setState({ courses: [..._courses] });
  }
}

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    padding: 12,
  }),

  input: (provided, state) => ({
    ...provided,

    color: "#000000",
    fontSize: "16px",
  }),

  menuList: (provided, state) => ({
    ...provided,
  }),

  placeholder: (provided, state) => ({
    ...provided,
    color: "#000000",
  }),

  control: (provided, state) => ({
    ...provided,
    height: "-5px",
  }),

  // control: (_, { selectProps: { width }}) => ({
  //   width: width
  // }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export default FilterBy;
