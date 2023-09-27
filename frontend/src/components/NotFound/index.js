import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="cantFind">
      <div>
        <h1>We’re sorry.</h1>
        <h1>We can’t find the page you’re looking for.</h1>
        <Link to="/">Return to homepage</Link>
      </div>
      <img
        src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/1c54cc25ce01/assets/img/svg_illustrations/cant_find_650x520_v2.svg"
        alt="Not Found"
      />
    </div>
  );
};

export default NotFound;
