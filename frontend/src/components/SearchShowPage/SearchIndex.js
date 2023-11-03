import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, fetchBusinesses } from "../../store/business";
import { Link } from "react-router-dom";
import "../Business/Business.css";
import IndexItem from "../Business/indexItem.js";
import BusinessMapWrapper from "../NotYelpMap";
import Search from "./SearchShowPage";

const Business = (props) => {
  console.log(props, "string");
  //   const businesses = useSelector(getBusinesses);
//   const businesses = useSelector((state) => Object.values(state.search));
  const [businesses, setBusinesses] = useState(props.searchResults);
  const dispatch = useDispatch();
  const [highlightedBusiness, setHighlightedBusiness] = useState(null); // Add state for highlighted business ID
    // console.log(businesses2, "bus2")
  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  console.log(businesses, "test");
  return (
    <>
      <div className="business-pg-container">
        <ul className="businesses-container">
          {businesses &&
            businesses.map((business) => (
              <li
                key={business.id}
                onMouseEnter={() => setHighlightedBusiness(business.id)} // Set the highlighted business on mouse enter
                onMouseLeave={() => setHighlightedBusiness(null)} // Reset the highlighted business on mouse leave
              >
                <Link to={`/restaurants/${business.id}`}>
                  <IndexItem business={business} photo={business.photoURL} />
                </Link>
              </li>
            ))}
        </ul>
        <div className="business-pg-map-container">
          <BusinessMapWrapper
            businesses={businesses}
            highlightedBusiness={highlightedBusiness} // Pass the highlighted business to the map
          />
        </div>
      </div>
    </>
  );
};

export default Business;
