import React, { Component } from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import JsonData from "../data/data.json";
export class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingPageData: {},
    };
  }

  componentDidMount() {
    this.setState({ landingPageData: JsonData });
  }

  render() {
    return (
      <div>
        <Navigation {...this.props} />
        <div id="about">
          <div className="container">
            <h2>About</h2>
            <p>
              <b>Gritivew.io</b> is a platform built to assist students and
              faculty at the University of Maryland, Baltimore County make
              informed decisions. This platform provides course grades and
              evaluations for all course and professors. This platform also
              provides a professor review system. We hope that you find these
              features useful.
            </p>
            <p>
              If there are any <b>bugs</b> or improvements you'd like to report
              please email us at{" "}
              <a href="mailto:admin@gritview.io">admin@gritview.io</a>
            </p>
            <br />
            <strong>Behind the Scenes: Developing Gritview.io</strong>
            <p></p>
            <p>
              A short{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/pulse/behind-scenes-developing-gritviewio-nathenael-dereb/?published=t"
              >
                article
              </a>{" "}
              discussing the development of Gritview.io.
            </p>
            <h2>Credits</h2>
            <p>
              We would like to thank the{" "}
              <a href="https://oir.umbc.edu/" target="_blank" rel="noreferrer">
                Institutional Research, Analysis & Decision Support, UMBC
              </a>{" "}
              and{" "}
              <a href="https://doit.umbc.edu/" target="_blank" rel="noreferrer">
                Division of Information Technology (DoIT)
              </a>{" "}
              for providing us with Grade and Course Evaluation data.
            </p>
            <p>
              We would like to thank{" "}
              <a
                href="https://planetterp.com/"
                target="_blank"
                rel="noreferrer"
              >
                PlanetTerp
              </a>{" "}
              for their support throughout the development of this platform.
            </p>
            <h2>Review Criteria</h2>
            <p>
              <b>Gritivew.io</b> believes in freedom of speech, but maintains
              standards to ensure the reviews on the website are quality. To
              prevent low-quality reviews, all reviews are subject to a
              verification process. The only reviews that are not accepted are
              personal attacks on professors that provide no meaningful
              information, or any reviews that are illegal.
            </p>
            <h2>Contact Us</h2>
            <p>
              We can be contacted via email at{" "}
              <a href="mailto:admin@gritview.io">admin@gritview.io</a>
            </p>
          </div>
        </div>

        <Footer data={this.state.landingPageData.Footer} {...this.props} />
      </div>
    );
  }
}

export default About;
