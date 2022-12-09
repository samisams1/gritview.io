import React, { Component } from "react";
import NumericalLabel from "./numericalLabel";

export class RelatedTeachings extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const { data, pathname } = this.props;
    var sorted_data = [];
    if (pathname === "/professor") {
      sorted_data = data.sort(function (obj1, obj2) {
        var s1 = obj1.first_name,
          s2 = obj2.first_name;
        return (s1 || obj1).localeCompare(s2 || obj2);
      });
    } else {
      sorted_data = data.sort(function (obj1, obj2) {
        var s1 = `${obj1.name}${obj1.catalog_number}`,
          s2 = `${obj2.name}${obj2.catalog_number}`;
        return (s1 || obj1).localeCompare(s2 || obj2);
      });
    }

    this.setState({
      data: sorted_data,
    });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.location !== this.props.location ||
      prevProps.resp !== this.props.resp
    ) {
      const { data, pathname } = this.props;
      var sorted_data = [];
      if (pathname === "/professor") {
        sorted_data = data.sort(function (obj1, obj2) {
          var s1 = obj1.first_name,
            s2 = obj2.first_name;
          return (s1 || obj1).localeCompare(s2 || obj2);
        });
      } else {
        sorted_data = data.sort(function (obj1, obj2) {
          var s1 = `${obj1.name}${obj1.catalog_number}`,
            s2 = `${obj2.name}${obj2.catalog_number}`;
          return (s1 || obj1).localeCompare(s2 || obj2);
        });
      }

      this.setState({
        data: sorted_data,
      });
    }
  }
  render() {
    const { pathname, history } = this.props;
    const { data } = this.state;

    return (
      <div id="trending">
        <h2>{this.props.title}</h2>
        <div className="list-style">
          {data.map((item, index) => (
            <NumericalLabel
              key={index}
              name={
                pathname === "/professor"
                  ? `${item.first_name} ${item.last_name}`
                  : item.catalog_topic === null
                    ? `${item.name}${item.catalog_number}`
                    : `${item.name}${item.catalog_number} - ${item.catalog_topic}`
              }
              value={
                pathname === "/professor" ? item.review_count : item.credits
              }
              label={pathname === "/professor" ? "Ratings" : "Credits"}
              pathname={pathname}
              history={history}
              id={item.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RelatedTeachings;
