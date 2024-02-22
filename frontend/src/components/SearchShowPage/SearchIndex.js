import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, fetchBusinesses } from "../../store/business";
import { Link } from "react-router-dom";
import "../Business/Business.css";
import IndexItem from "../Business/indexItem.js";
import BusinessMapWrapper from "../NotYelpMap";
import Search from "./SearchShowPage";

const Business = (props) => {

  //   const businesses = useSelector(getBusinesses);
  //  const businesses = useSelector((state) => Object.values(state.search));
  // const [businesses, setBusinesses] = useState(props.searchResults);
  const businesses = props.searchResults
  const dispatch = useDispatch();
  const [highlightedBusiness, setHighlightedBusiness] = useState(null); // Add state for highlighted business ID
  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  console.log(businesses, "hello")
  return (
    <>
      <div className="business-pg-container">
        <ul className="businesses-container">

        {businesses && Object.values(businesses)?.length === 0 ? (
            <div id="results-for">No Results</div>
          ) : (
            businesses &&
            businesses.map((business) => (
              <li
                key={business.id}
                onMouseEnter={() => setHighlightedBusiness(business.id)}
                onMouseLeave={() => setHighlightedBusiness(null)}
              >
                <Link to={`/restaurants/${business.id}`}>
                  <IndexItem business={business} photo={business.photoURL} />
                </Link>
              </li>
            ))
          )}
          
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
