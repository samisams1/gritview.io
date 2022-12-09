import React, { Component } from "react";

export class Info extends Component {
  render() {
    return (
      <div className="">
        <div id="info">
          <h2>Info</h2>

          <p>Gritview holds data starting from Fall 2017 to Winter 2022</p>
          <p>Update: Spring 2022 Grades & Course Evaluations now available!</p>
          <h2>Links</h2>
          <p>
            <a target="_blank" rel="noreferrer" href="https://www.myumbc.edu">
              Student Schedule & Registration
            </a>
          </p>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://my.umbc.edu/go/schedule"
            >
              {" "}
              Schedule of Classes{" "}
            </a>
          </p>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://my.umbc.edu/go/student-schedule"
            >
              {" "}
              myUMBC{" "}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Info;
