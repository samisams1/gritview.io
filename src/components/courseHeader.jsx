import React, { Component } from "react";
import CourseCredit from "./course_credit";
import SelectBar from "./selectBar";
import FilterBy from "./filter_by";
import TopSearhBar from "./top_searchbar";
import ReviewModal from "./review_modal";

export class CourseHeader extends Component {
  render() {
    const { resp } = this.props;
    return (
      <div id="xheader" className="text-center">
        <div className="container">
          <div id="topsearchbar">
            <TopSearhBar {...this.props} />
            <ReviewModal
              className="btn btn-custom btn-lg page-scroll"
              props={this.props}
            />
          </div>
          <div className="col-md-8 col-md-offset-2">
            <h2>{`${resp.subject.descriptive_name} ${resp.subject.catalog_number}`}</h2>
            <h3>{`${resp.subject.description}`}</h3>
            {resp.topics.length === 0 ? null : (
              <SelectBar {...this.props} topics={resp.topics} />
            )}{" "}
            <CourseCredit credits={resp.subject.credits} />
            <FilterBy {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default CourseHeader;
