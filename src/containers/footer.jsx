import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div>
        <div id="contact">
          <div className="container">
            <div className="col-md-6">
              <div className="">
                <div className="section-title ">
                  <h2>Gritview.io</h2>
                  <p>
                    {this.props.data ? this.props.data.preliminary : "Loading"}
                    <strong>
                      {" "}
                      {this.props.data ? this.props.data.ground : "Loading"}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="footer" className="text-center">
            <p>
              &copy; {this.props.data ? this.props.data.company : "Loading"}
            </p>
            <a href="/termsofuse"> Terms of Use </a>
            <span> | </span>
            <a href="/privacy"> Privacy Policy </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
