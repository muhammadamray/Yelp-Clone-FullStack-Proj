import React, { useState } from "react";
import "./Review.css";
import Rating from "@mui/material/Rating";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusiness } from "../../store/business";
import { createReview } from "../../store/review";

const ReviewCreate = () => {
  const [rating, setRating] = useState(-1);
  const [reviewText, setReviewText] = useState("");
  const [errorRating, setErrorRating] = useState(false);
  const [errorReview, setErrorReview] = useState(false);
  const { businessId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const currRest = useSelector((state) => state.businesses[businessId]);
  const currUser = useSelector((state) => state.session.user);

  const history = useHistory();

  const postReview = (e, rating, reviewText) => {
    if(rating === -1){
      setErrorRating(true);
    } else {
      setErrorRating(false)
    }

    if(reviewText.length <= 5){
      setErrorReview(true);
    } else {
      setErrorReview(false);
    }

    if (rating > 0 && reviewText.length >= 5) {
      const reviewObject = {
        rating: rating,
        body: reviewText,
        user_id: currUser.id,
        business_id: businessId,
      };
      dispatch(createReview(reviewObject));
      history.push(`/restaurants/${businessId}`);
    }
  };

  return (
    <>
      <div className="curr-rest-name">{currRest?.name}</div>
      <div className="curr-review-container">
        <Rating onChange={(e) => setRating(e.target.value)} />
        <div>
          <textarea
            className="review-input"
            placeholder="Please add a review here"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="post-review-btn" onClick={(e) => postReview(e, rating, reviewText)}>
        Submit Review
      </div>
      <div className="error-container">
        {errorRating? <div>xlin0000000000</div> : null}
        {errorReview? <div>xlinnnnnn</div> : null}
      </div>
    </>
  );
};

export default ReviewCreate;
