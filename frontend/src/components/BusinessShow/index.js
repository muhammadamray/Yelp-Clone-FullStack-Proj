import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// Link,
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/business";
// import { useLocation } from "react-router-dom";
import "./BusinessShow.css";
import check from "./check.png";

const BusinessShow = () => {
  const { businessId } = useParams();
  // console.log(businessId);

  // TODO: businessId is undefined
  // use params arent working............

  // const location = useLocation();
  // const restId = location.pathname.split("/")[2];
  const business = useSelector(getBusiness(businessId));
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
          src="https://media.istockphoto.com/id/1211547141/photo/modern-restaurant-interior-design.jpg?s=612x612&w=0&k=20&c=CvJmHwNNwfFzVjj1_cX9scwYsl4mnVO8XFPi0LQMTsw="
          alt={business.name}
          className="business-image"
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

      <div className="extra-content"></div>
    </div>
  );
};

export default BusinessShow;
