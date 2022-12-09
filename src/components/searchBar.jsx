import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import baseURL from "../utils/constant.js";

export class SearhBar extends Component {
  componentDidMount() {
    this.setState({ options: [] });
    this.setState({ props: this.props });
    this.fetchProfessors();
    this.fetchSubjects();
  }

  render() {
    return (
      <div id="searchbar">
        <Select
          options={this.state == null ? [] : this.state.options}
          styles={customStyles}
          onChange={(e) => this.onSelect(e)}
          placeholder="Search for a Course or a Professor..."
        />
        <span>
          <strong>Update: </strong> Spring 2022 Grades & Course Evaluations now available!
        </span>
      </div>
    );
  }

  onSelect(e) {
    if (e.value.full_name) {
      this.props.history.push({
        pathname: "/professor",
        search: `name=${e.value.full_name}&profId=${e.value.id}`,
        value: e.value,
      });
    } else {
      let topic = e.value.topic ? e.value.topic.replace("&", "%26") : null;
      this.props.history.push({
        pathname: "/course",
        search:
          e.value.topic === undefined
            ? `?name=${e.value.name}`
            : `?name=${e.value.name}&topic=${topic}`,
        value: e.value,
      });
    }
  }

  async fetchProfessors() {
    axios.get(`${baseURL}/professor?all=true`).then((res) => {
      const professors_resp = res.data.professors;
      var professors = [];
      var i;
      for (i = 0; i < professors_resp.length; i++) {
        let label = {
          value: professors_resp[i],
          label: professors_resp[i].full_name,
        };
        professors.push(label);
      }
      this.setState({ options: [...this.state.options, ...professors] });
    });
  }

  async fetchSubjects() {
    axios.get(`${baseURL}/course?all=true`).then((res) => {
      const subjects_resp = res.data.subjects;
      var subjects = [];
      var i;
      for (i = 0; i < subjects_resp.length; i++) {
        let label = {
          value: subjects_resp[i],
          label:
            subjects_resp[i].topic === undefined
              ? subjects_resp[i].name
              : `${subjects_resp[i].name} - ${subjects_resp[i].topic}`,
        };
        subjects.push(label);
      }
      this.setState({ options: [...this.state.options, ...subjects] });
    });
  }
}

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",

    padding: 12,
  }),

  input: (provided, state) => ({
    ...provided,
    fontSize: "16px",
  }),

  menuList: (provided, state) => ({
    ...provided,
  }),

  control: (provided, state) => ({
    ...provided,
    height: "50px",
    radius: 42,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

export default SearhBar;
