import React, { Component } from "react";
import TopSearhBar from "./top_searchbar";
import FilterBy from "./filter_by";
import ReviewModal from "./review_modal";
import StarRatings from "react-star-ratings";

export class ProfessorHeader extends Component {
  constructor() {
    super();
    this.state = {
      averageRating: null,
    };
  }
  componentDidMount() {
    const { resp } = this.props;
    if (resp.reviews.length !== 0) {
      var sum = 0;
      for (var i = 0; i < resp.reviews.length; i++) {
        sum += resp.reviews[i].rating;
      }
      this.setState({
        averageRating: Math.round((sum / resp.reviews.length) * 100) / 100,
      });
    } else {
      this.setState({
        averageRating: null,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resp !== this.props.resp) {
      const { resp } = this.props;
      if (resp.reviews.length !== 0) {
        var sum = 0;
        for (var i = 0; i < resp.reviews.length; i++) {
          sum += resp.reviews[i].rating;
        }
        this.setState({
          averageRating: Math.round((sum / resp.reviews.length) * 100) / 100,
        });
      } else {
        this.setState({
          averageRating: null,
        });
      }
    }
  }

  render() {
    const { resp } = this.props;
    const { averageRating } = this.state;
    return (
      <div id="xheader" className="text-center">
        <div className="container">
          <div id="topsearchbar">
            <TopSearhBar {...this.props} />
            <ReviewModal
              className="btn btn-custom btn-lg page-scroll"
              props={this.props}
            />
            {/* <a className="btn btn-custom btn-lg page-scroll">Write a Review</a> */}
          </div>
          <div className="col-md-8 col-md-offset-2">
            <h2>{`${resp.instructor.first_name} ${resp.instructor.last_name}`}</h2>
            <StarRatings
              id="rating"
              rating={averageRating ? averageRating : 0}
              starRatedColor="orange"
              starDimension="24px"
              starSpacing="1px"
            />
            <p>
              <b>{`${averageRating ? averageRating : "-"}`} </b>| 5
            </p>
            <span>Based on: {resp.reviews.length} ratings </span>
            <FilterBy {...this.props} />
          </div>
        </div>
      </div>
    );
  }

  handleReview() {
    // ret
    // <ReviewModal />;
  }
}

export default ProfessorHeader;
