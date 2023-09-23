import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Business.css";

const IndexItem = ({ business }) => {
  console.log(business);

  return (
    <Link to={`/businesses/${business.id}`} className="business-link">
      <div className="business-container">
        <div className="business-image-container">
          <img
            src="https://media.istockphoto.com/id/1211547141/photo/modern-restaurant-interior-design.jpg?s=612x612&w=0&k=20&c=CvJmHwNNwfFzVjj1_cX9scwYsl4mnVO8XFPi0LQMTsw="
            alt={business.name}
            className="business-image"
          />
        </div>

        <div className="business-details">
          <h2>{business.name}</h2>

          <div className="business-rating">
            ⭐⭐⭐⭐⭐ <span className="rating-count">(number of ratings)</span>
          </div>

          <div className="business-info">
            <div>{business.category}</div>
            <ul>{business.price_range}</ul>
          </div>

          <div className="business-location">
            <ul>
              <li id="address" key={business.id}>
                {business.city}, {business.state}, {business.zip_code}
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
