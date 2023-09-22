import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const IndexItem = ({ business }) => {
  console.log(business);

  return (
    <>
      <Link to={`/businesses/${business.id}`}>
        <div id="container">
          <img src="https://media.istockphoto.com/id/1211547141/photo/modern-restaurant-interior-design.jpg?s=612x612&w=0&k=20&c=CvJmHwNNwfFzVjj1_cX9scwYsl4mnVO8XFPi0LQMTsw=" />
         
          <div>

            <h2>{business.name}</h2>

            <div> 
                <div>⭐⭐⭐⭐⭐</div>
                <div> (number of ratings)</div>
            </div>

            <div> 
                <div>{business.category}</div>
                <ul>{business.price_range}</ul>
            </div>

            <div>
              <ul>
                <li key={business.id}>
                  {business.city}, { business.state}, { business.zip_code}
                </li>
              </ul>
            </div>

            <div>{business.phone_number}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default IndexItem;
