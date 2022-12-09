import React, { Component } from "react";
import axios from "axios";
import SearhBar from "./searchBar";
import firebase from "../containers/firebase";
import baseURL from "../utils/constant.js";

export class TopSearhBar extends Component {
  componentDidMount() {
    this.setState({ options: [] });
    this.setState({ props: this.props });
    this.fetchProfessors();
    this.fetchSubjects();
  }

  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <div className="searchbar">
          <SearhBar {...this.props} />
        </div>
      </div>
    );
  }

  onSelect(e) {
    if (e.value.full_name) {
      this.props.history.push({
        pathname: "/professor",
        search: `name=${e.value.name}`,
        value: e.value,
      });
    } else {
      this.props.history.push({
        pathname: "/course",
        search:
          e.value.topic === undefined
            ? `?name=${e.value.name}`
            : `?name=${e.value.name}&topic=${e.value.topic}`,
        value: e.value,
      });
    }
    firebase.analytics().logEvent("top_search_bar_selection");
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

export default TopSearhBar;
