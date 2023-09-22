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
      <ul>
        {businesses.map((business) => (
          <li> <IndexItem key={business.id} business={business} /> </li>
        ))}
      </ul>
    </>
  );
};

export default Business;
