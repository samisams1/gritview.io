import React, { Component } from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import JsonData from "../data/data.json";

export class Giveaway extends Component {
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
            <h2>Gritview Givewaway</h2>
            <p>
                We need your help! We want to get more high-quality reviews on our site to help students make more informed choices during course registration.
            </p>

            <h2>How to Enter</h2>
            <p>
                1. Create an account so that you can submit reviews.
            </p>
            
            <p>
                2. Submit 3 reviews, and if they get accepted and published, you will automatically be entered into our drawing to receive a $30 Amazon giftcard.
            </p>

            <br/>

            <p>
                There will be five winners in total. E-gift cards will be sent to the email registered to your Gritview account.
            </p>

            <h3 style={{"font-size": "2em", "font-weight": "bold"}}>Deadline: 4/16/2021 @ 11:59pm</h3>

            <br/>
            <p>
                Please email any questions to <a href="mailto:admin@gritview.io">admin@gritview.io</a>
            </p>
          </div>
        </div>

        <Footer data={this.state.landingPageData.Footer} {...this.props} />
      </div>
    );
  }
}

export default Giveaway;
