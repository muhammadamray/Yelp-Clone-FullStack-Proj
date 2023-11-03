import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// Link,
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/business";
import { useLocation } from "react-router-dom";
import "./BusinessShow.css";
import check from "./check.png";
import { fetchReviews, getReviews } from "../../store/review";
// import ReviewIndexItem from "../Reviews/ReviewIndexItem";
import ReviewIndex from "../Reviews/ReviewIndex";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Rating from "@mui/material/Rating";
import RestaurantMap from "../RestaurantMap";

const BusinessShow = () => {
  const { businessId } = useParams();
  // console.log(businessId);

  // TODO: businessId is undefined
  // use params arent working............

  const location = useLocation();
  const restId = location.pathname.split("/")[2];

  const business = useSelector(getBusiness(businessId));
  const reviews = useSelector((state) => getReviews(state, businessId));
  const currUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  // Handle business not found
  if (!business) {
    return <p>Business not found</p>;
  }

  return (
    <div className="page-container">
      <div className="picture-container">
        <img
          src={business.photoUrl}
          alt={business.name}
          className="show-business-image"
        />

        <div className="rest-info">
          <h1 id="bus-name">{business.name}</h1>

          <div className="business-details">
            <div className="business-rating-cont">
              <div className="business-rating">
                <Rating value={business?.rating} precision={0.1} readOnly />
              </div>
              {business?.rating}
            </div>

            <div className="claim-category">
              <div className="claim-review">
                <img src={check} alt="Check Mark" className="check-image" />
                <p>Claimed</p>
              </div>

              <p id="bus-cat">{business.category}</p>
            </div>

            <div className="open-timing">
              <p id="open">Open </p>
              <p id="timing">9:00 am ~ 9:00 pm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="extra-content">
        <div className="res-map">
          <h1 id="locationHours">Location & Hours</h1>
          {window.google ? (
            <div>
              <RestaurantMap
                latitude={business?.latitude}
                longitude={business?.longitude}
              />
            </div>
          ) : (
            <p>Loading the map...</p> // You can customize this message as needed
          )}
          {`${business.city}, ${business.state}, ${business.zipCode}`}
        </div>

        <div>
          {currUser ? (
            <NavLink to={`/restaurants/${businessId}/reviews/create`}>
              <button className="review-button">Create Review</button>
            </NavLink>
          ) : null}
        </div>

        <ReviewIndex reviews={reviews} />
      </div>
    </div>
  );
};

export default BusinessShow;
