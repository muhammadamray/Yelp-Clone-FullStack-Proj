import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/business";

const BusinessShow = () => {
  const { businessId } = useParams();
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
    <div>
      <h1>{business.name}</h1>
      <img
        src="https://media.istockphoto.com/id/1211547141/photo/modern-restaurant-interior-design.jpg?s=612x612&w=0&k=20&c=CvJmHwNNwfFzVjj1_cX9scwYsl4mnVO8XFPi0LQMTsw="
        alt={business.name}
        className="business-image"
      />
      <p>Rating: {business.rating}</p>
      <p>Category: {business.category}</p>
      {/* Additional business details can be displayed here */}
      <Link to="/">Business Index</Link>
    </div>
  );
};

export default BusinessShow;
