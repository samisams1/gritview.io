import React, { Component } from "react";
import axios from "axios";
import SignInModal from "../components/signin_modal";
import SignUpModal from "../components/signup_modal";
import firebase from "../containers/firebase";
import baseURL from "../utils/constant.js";

export class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      loginOpened: false,
      signupOpened: false,
    };
  }
  openModal = (modalType) => () => {
    if (modalType === "login") {
      this.setState({
        loginOpened: true,
        signupOpened: false,
      });
    } else if (modalType === "signup") {
      this.setState({
        loginOpened: false,
        signupOpened: true,
      });
    }
  };
  closeModal = (modalType) => () => {
    if (modalType === "login") {
      this.setState({
        loginOpened: false,
      });
    } else if (modalType === "signup") {
      this.setState({
        signupOpened: false,
      });
    }
  };
  render() {
    const { loginOpened, signupOpened } = this.state;
    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a
              href="/#"
              className="navbar-brand page-scroll"
              onClick={this.handleLanding}
            >
              Gritview
            </a>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/about">About</a>
              </li>

              {localStorage.getItem("username") ? (
                <li>
                  <button
                    onClick={this.handleLogout}
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    {"Logout " + localStorage.getItem("username")}
                  </button>
                </li>
              ) : (
                <li>
                  <SignInModal
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    isLoginOpened={loginOpened}
                    isSignupOpened={signupOpened}
                    props={this.props}
                    isLink={false}
                  />
                  <SignUpModal
                    isNavigation={true}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    isLoginOpened={loginOpened}
                    isSignupOpened={signupOpened}
                    props={this.props}
                    isLink={false}
                  />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  handleLanding = (e) => {
    const { history } = this.props;
    e.preventDefault();
    history.push({
      pathname: "/",
    });
  };

  handleLogout = (e) => {
    firebase.analytics().logEvent(`logout`);
    axios({
      method: "post",
      url: `${baseURL}/logout/`,
      headers: {},
      data: {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
      },
    });
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    window.location.reload();
  };
}

export default Navigation;
