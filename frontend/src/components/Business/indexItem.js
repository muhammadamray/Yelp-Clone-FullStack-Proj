import React from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import "./Business.css";
import Rating from "@mui/material/Rating";

const IndexItem = ({ business }) => {


  return (
    <Link to={`/restaurants/${business.id}`} className="business-link">
      <div className="business-container">
        <div className="business-image-container">
          <img
            src={business.photoUrl}
            alt={business.name}
            className="bus-image"
          />
        </div>

        <div className="business-details">
          <h2>{business.name}</h2>

          <div className="business-rating-container">
            <div className="business-rating">
              <Rating value={business?.rating} precision={0.1} readOnly />
            </div>
            {business?.rating}
          </div>

          <div className="business-info">
            <div>{business.category}</div>
            <ul>{business.priceRange}</ul>
          </div>

          <div className="business-location">
            <ul>
              <li id="address" key={business.id}>
                {business.city}, {business.state}, {business.zipCode}
              </li>
            </ul>
          </div>

          <div id="phone_number">{business.phone_number}</div>
        </div>
      </div>
    </Link>
  );
};

export default IndexItem;
