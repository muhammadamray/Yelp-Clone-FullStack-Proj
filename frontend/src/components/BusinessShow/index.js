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
// import RestaurantMap from "../RestaurantMap";
// import BusinessMap from "../../components/NotYelpMap"
import YelpMap from "../YelpMap";
import ReservationCreate from "../Reservation/ReservationCreate";
import { fetchReservations } from "../../store/reservation";

const BusinessShow = () => {
  const { businessId } = useParams();

  const location = useLocation();
  const restId = location.pathname.split("/")[2];

  const business = useSelector(getBusiness(restId));
  const reviews = useSelector((state) => getReviews(state, restId));
  // const reviews = useSelector((state) => state.reviews)
  const currUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusiness(restId));
  }, [restId, dispatch]);

  useEffect(() => {
    if (currUser) {
      dispatch(fetchReservations());
    }
  }, [currUser, dispatch]);

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
        <div id="map-hours-rev">
          <div id="map-hours">
            <div className="res-map">
              {/* <h1 id="locationHours">Location & Hours</h1> */}
              <YelpMap
                id="bsmap"
                businesses={[business]}
                mapOptions={{
                  center: { lat: business.latitude, lng: business.longitude },
                }}
              />
              {`${business.city}, ${business.state}, ${business.zipCode}`}
            </div>
            <div className="week-schedule">
              <div className="day-sch">
                <div>Mon </div>
                <div>09:00 AM - 09:00 PM</div>
              </div>
              <div className="day-sch">
                <div>Tue </div>
                <div>09:00 AM - 09:00 PM</div>
              </div>
              <div className="day-sch">
                <div>Wed </div>
                <div>09:00 AM - 09:00 PM</div>
              </div>
              <div className="day-sch">
                <div>Thu </div>
                <div>09:00 AM - 09:00 PM</div>
              </div>
              <div className="day-sch">
                <div>Fri </div>
                <div>09:00 AM - 09:00 PM</div>
              </div>
              <div className="day-sch">
                <div>Sat </div>
                <div>09:00 AM - 09:00 PM</div>
              </div>
              <div className="day-sch">
                <div>Sun </div>
                <div>09:00 AM - 09:00 PM</div>
              </div>
            </div>
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
        <div id="res-form">
          <ReservationCreate />
        </div>
      </div>
    </div>
  );
};

export default BusinessShow;
