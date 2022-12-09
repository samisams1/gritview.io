import React, { Component } from "react";
import Select from "react-select";
import qs from "qs";

export class SelectBar extends Component {
  componentDidMount() {
    this.setState({ options: [] });
    this.build_options();
  }

  build_options() {
    var topics = [];
    var i;
    for (i = 0; i < this.props.topics.length; i++) {
      let label = {
        value: this.props.topics[i],
        label: this.props.topics[i],
      };
      topics.push(label);
    }
    this.setState({
      options: [this.state == null ? [] : this.state.options, ...topics],
    });
  }

  render() {
    const { location } = this.props;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    return (
      <div id="selectBar">
        <Select
          options={this.state == null ? [] : this.state.options}
          styles={customStyles}
          onChange={(e) => this.onSelect(e)}
          placeholder={params.topic == null ? "Select" : params.topic}
          isSearchable={false}
        />
      </div>
    );
  }

  onSelect(e) {
    const { location } = this.props;
    let params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    let topic = e.value.replace("&", "%26");
    this.props.history.push({
      pathname: "/course",
      search: `?name=${params.name}&topic=${topic}`,
      value: e.value,
    });
  }
}

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    padding: 12,
  }),

  input: (provided, state) => ({
    ...provided,
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
    width: "250px",
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

export default SelectBar;
