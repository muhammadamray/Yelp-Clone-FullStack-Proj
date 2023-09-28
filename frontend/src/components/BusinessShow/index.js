import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// Link,
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/business";
// import { useLocation } from "react-router-dom";
import "./BusinessShow.css";
import check from "./check.png";
import { getReviews } from "../../store/review";
// import ReviewIndexItem from "../Reviews/ReviewIndexItem";
import ReviewIndex from "../Reviews/ReviewIndex";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const BusinessShow = () => {
  const { businessId } = useParams();
  // console.log(businessId);

  // TODO: businessId is undefined
  // use params arent working............

  // const location = useLocation();
  // const restId = location.pathname.split("/")[2];

  const business = useSelector(getBusiness(businessId));
  const reviews = useSelector((state) => getReviews(state, businessId));
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
            <div className="business-rating">
              ⭐⭐⭐⭐⭐{" "}
              <span className="rating-count">(number of reviews)</span>
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
        <div>
          <NavLink to="/reviews/create">
            <button className="review-button">Create Review</button>
          </NavLink>
        </div>
        {/* <div>{console.log(reviews)}</div> */}
        {/* <div>{reviews.map(review => <ReviewIndexItem review = {review} />)}</div> */}
        <ReviewIndex reviews={reviews} />
      </div>
    </div>
  );
};

export default BusinessShow;
