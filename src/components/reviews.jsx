import React, { Component } from "react";
import ReviewLite from "./review_lite";
import ReviewModal from "./review_modal";

export class Reviews extends Component {
  render() {
    const { reviews } = this.props.resp;

    return (
      <div id="reviews">
        <div className="container">
          <div className="row">
            {/* <a className="btn btn-custom btn-lg page-scroll">Write a Review</a> */}
            <ReviewModal
              className="btn btn-custom btn-lg page-scroll"
              props={this.props}
            />
            <div className="col-xs-12 col-md-6">
              <h2>Reviews</h2>
              {reviews.length === 0 ? (
                <p className="">No reviews, be the first to write a review!</p>
              ) : null}
              {reviews.map((review, index, array) =>
                index % 2 === 1 ? null : (
                  <ReviewLite key={index} review={review} {...this.props} />
                )
              )}
            </div>
            <div className="col-xs-12 col-sm-6">
              {reviews.map((review, index, array) =>
                index % 2 === 0 ? null : (
                  <ReviewLite key={index} review={review} {...this.props} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
