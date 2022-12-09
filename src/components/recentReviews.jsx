import React, { Component } from "react";
import axios from "axios";
import ReviewLite from "./review_lite";
import Skeleton from "react-loading-skeleton";
import baseURL from "../utils/constant.js";

export class RecentReviews extends Component {
  constructor() {
    super();
    this.state = {
      reviews: null,
    };
  }

  componentDidMount() {
    this.fetchRecentReviews();
  }

  async fetchRecentReviews() {
    await axios.get(`${baseURL}/review?recent`).then((res) => {
      const resp = res.data.reviews;
      this.setState({ reviews: resp });
    });
  }

  render() {
    const { reviews } = this.state;
    return (
      <div className="">
        <div className="">
          <h2>Recent Reviews</h2>
          {reviews ? (
            reviews.map((review, index) => (
              <ReviewLite key={index} review={review} {...this.props} />
            ))
          ) : (
            <Skeleton count={30} />
          )}
        </div>
      </div>
    );
  }
}

export default RecentReviews;
