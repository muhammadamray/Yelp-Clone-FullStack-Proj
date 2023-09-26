import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, fetchBusinesses } from "../../store/business";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Business.css";
import IndexItem from "./indexItem.js";

const Business = () => {
  const businesses = useSelector(getBusinesses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  return (
    <>
      <div className="business-pg-container">
        <ul className="businesses-container">
          {businesses.map((business) => (
            <li key={business.id}>
              {/* Wrap IndexItem with Link */}
              <Link to={`/restaurants/${business.id}`}>
                <IndexItem business={business} photo={business.photoURL} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="business-pg-map-container">Google Map</div>
      </div>
    </>
  );
};

export default Business;