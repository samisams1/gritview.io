import React, { Component } from "react";
import Info from "../components/info";
import RecentReviews from "../components/recentReviews";
import Trending from "../components/trending";

export class Figure extends Component {
  constructor(props) {
    super(props);
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
      <div id="subheader">
        <div className="container">
          <div className="col-xs-12 col-md-6">
            <Trending {...this.props} />
            {width > 990 ? <Info /> : <RecentReviews {...this.props} />}
          </div>
          <div className="col-xs-12 col-md-6">
            {width > 990 ? <RecentReviews {...this.props} /> : <Info />}
          </div>
        </div>
      </div>
    );
  }
}

export default Figure;
