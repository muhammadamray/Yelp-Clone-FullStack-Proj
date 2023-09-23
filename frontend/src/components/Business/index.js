import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, fetchBusinesses } from "../../store/business";
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
            <li>
              {" "}
              <IndexItem key={business.id} business={business} />{" "}
            </li>
          ))}
        </ul>
        <div className="business-pg-map-container">Google Map</div>
      </div>
    </>
  );
};

export default Business;
