import React, { Component } from "react";
import { StarRating } from "./ratingstar";
import firebase from "../containers/firebase";

export class ReviewLite extends Component {
  render() {
    const { review } = this.props;
    return (
      <div id="recentReview">
        <a
          href="/#"
          onClick={(e) =>
            this.handleProfessorSelection(
              e,
              review.instructor_name,
              review.subject_name
            )
          }
        >
          {review.instructor_name} @ {review.subject_name}
        </a>

        <p>
          ~ Anonymous | Grade: <strong>{review.grade}</strong> | {review.posted}
        </p>
        <StarRating rating={review.rating} />
        <p>{review.body}</p>
      </div>
    );
  }

  handleProfessorSelection = (e, instructor_name, subject_name) => {
    e.preventDefault();
    firebase.analytics().logEvent(`review_selection`);
    this.props.history.push({
      pathname: "/professor",
      search: `?name=${instructor_name}&course=${subject_name}`,
    });
  };
}

export default ReviewLite;
