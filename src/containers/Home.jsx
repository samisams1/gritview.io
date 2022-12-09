import React, { Component } from "react";
import Header from "./header";
import Figure from "./figure";
import Navigation from "./navigation";
import Footer from "./footer";
import JsonData from "../data/data.json";

export class Home extends Component {
  state = { landingPageData: {} };

  getlandingPageData() {
    this.setState({ landingPageData: JsonData });
  }

  componentDidMount() {
    this.getlandingPageData();
  }

  render() {
    return (
      <div>
        <Navigation {...this.props} />
        <Header data={this.state.landingPageData.Header} {...this.props} />
        <Figure data={this.state.landingPageData.Header} {...this.props} />
        <Footer data={this.state.landingPageData.Footer} {...this.props} />
      </div>
    );
  }
}

export default Home;
