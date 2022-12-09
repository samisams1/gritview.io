import React, { Component } from "react";
import TermsOfUse from "../legal/TermsOfUse";
import PrivacyPolicy from "../legal/PrivacyPolicy";
import Footer from "./footer";
import Navigation from "./navigation";
import JsonData from "../data/data.json";

export class Legal extends Component {
  constructor() {
    super();
    this.state = {
      landingPageData: {},
      pathname: null,
    };
  }

  componentDidMount() {
    this.setState({
      landingPageData: JsonData,
      pathname: this.props.location.pathname,
    });
  }

  render() {
    return (
      <div>
        <Navigation {...this.props} />
        <div className="terms-wrapper">
          <div className="container">
            <div className="terms-content">
              <h2 className="text-center">
                {this.state.pathname === "/privacy"
                  ? "Privacy Policy"
                  : "Terms of Use"}
              </h2>
              {this.renderDocument()}
            </div>
          </div>
        </div>
        <Footer data={this.state.landingPageData.Footer} {...this.props} />
      </div>
    );
  }

  renderDocument() {
    switch (this.state.pathname) {
      case "/termsofuse":
        return <TermsOfUse />;
      case "/privacy":
        return <PrivacyPolicy />;
      default:
        return null;
    }
  }
}

export default Legal;
