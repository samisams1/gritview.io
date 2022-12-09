import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const { v4: uuidv4 } = require("uuid");
export const STARICON =
  "M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118l11.547-1.2L16.026,0.6L20.388,10.918z";

const OneStarDiv = styled.div`  
&&& {
    display: -webkit-flex;    display: -moz-flex;    display: -ms-flex;    display: -o-flex;    display: flex; 
  }
}
`;

const StarRatingDiv = styled.div`  
&&& {
    display: -webkit-flex;    display: -moz-flex;    display: -ms-flex;    display: -o-flex;    display: flex;
    align-items: flex-start;    
  }
}
`;

class OneStar extends React.Component {
  static defaultProps = {
    strokeWidth: 2,
    stroke: "#ffa200",
    rate: 0,
    backgroundColor: "#dfdfdf",
    frontColor: "#ffa200", ///=== default color of rating
    icon: { STARICON },
    size: 32,
    uniquekey: 0,

    styles: {
      svg: {
        display: "inline-block",
        verticalAlign: "middle",
      },
    },
  };

  static propTypes() {
    return {
      icon: PropTypes.string.isRequired,
      size: PropTypes.number,
      uniquekey: PropTypes.number,
    };
  }

  render() {
    const {
      uniquekey,
      size,
      rate,
      frontColor,
      backgroundColor,
      styles,
      handlechange,
    } = this.props;

    const id = `star_filter${uniquekey}` + uuidv4();

    return (
      <svg ///===version="1.1" xmlns="http://www.w3.org/2000/svg"
        style={styles.svg}
        viewBox="0 0 32 32"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id={id}>
            <stop
              offset={`${rate * 100}%`}
              stopColor={frontColor}
              stopOpacity="1"
            />
            <stop offset="0%" stopColor={backgroundColor} stopOpacity="1" />
          </linearGradient>
        </defs>

        <path fill={`url(#${id})`} d={STARICON}></path>

        {/*  The SVG <g> element is used to group SVG shapes together , here I slice one star vertically to 4 pieces */}
        {/*  so that I know where you click(what score you want)  */}
        <g>
          <rect
            x="0"
            y="0"
            width="6"
            height="32"
            fill="rgba(0,0,255,0.0009)"
            onClick={() => handlechange(uniquekey, 0.0)}
          >
            {" "}
          </rect>
          <rect
            x="6"
            y="0"
            width="6"
            height="32"
            fill="rgba(0,0,255,0.0009)"
            onClick={() => handlechange(uniquekey, 0.25)}
          >
            {" "}
          </rect>
          <rect
            x="12"
            y="0"
            width="6"
            height="32"
            fill="rgba(0,0,255,0.0009)"
            onClick={() => handlechange(uniquekey, 0.5)}
          >
            {" "}
          </rect>
          <rect
            x="18"
            y="0"
            width="6"
            height="32"
            fill="rgba(0,0,255,0.0009)"
            onClick={() => handlechange(uniquekey, 0.75)}
          >
            {" "}
          </rect>
          <rect
            x="24"
            y="0"
            width="8"
            height="32"
            fill="rgba(0,0,255,0.0009)"
            onClick={() => handlechange(uniquekey, 1.0)}
          >
            {" "}
          </rect>
        </g>
      </svg>
    );
  }
}

export class StarRating extends React.Component {
  static defaultProps = {
    rating: 5,
    size: 16,
  };

  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
    };
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange(inwhichstar, pointinstar) {
    ////=== only when parents pass in this function , we could change rating, otherwise, ignore any click actoin on the star
    if (this.props.onChangeRating) {
      this.setState({
        rating: Math.ceil(inwhichstar + pointinstar),
      });

      this.props.onChangeRating(Math.ceil(inwhichstar + pointinstar));
    }
  }

  render() {
    const { size } = this.props;
    const { rating } = this.state;

    let ratingArray = [0.0, 0.0, 0.0, 0.0, 0.0];

    ///=== there are 5 stars, calculate each star's weight
    let i = 0;
    for (i = 0; i < (rating + 0.0).toString().split(".")[0]; i++) {
      ratingArray[i] = 1.0;
    }

    if (i <= 4) {
      ratingArray[i] = (rating - Math.floor(rating) + 0.00001).toFixed(2) * 1.0;
    }

    return (
      <StarRatingDiv>
        {ratingArray.map((rate, index) => (
          <OneStarDiv key={index}>
            <OneStar
              key={index}
              uniquekey={index}
              rate={rate}
              size={size}
              handlechange={this.handlechange}
            />
          </OneStarDiv>
        ))}
      </StarRatingDiv>
    );
  }
}
