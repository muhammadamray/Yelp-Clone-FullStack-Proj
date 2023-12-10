import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchReview, getReview, updateReview } from "../../store/review";
import { Rating } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

const ReviewEdit = () => {
  // const [reviewId, seReviewId] = useState(review?.reviewId)
  const location = useLocation();
  const reviewId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const review = useSelector(getReview(reviewId));
  const [rating, setRating] = useState(review?.rating);
  const [newRating, setNewRating] = useState(review?.rating);
  const [reviewText, setReviewText] = useState(review?.body);
  const [businessId, setBusinessId] = useState(review?.businessId);
  const [userId, setUserId] = useState(review?.userId);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchReview(reviewId));
    // setBusinessId(review.businessId);
  }, [reviewId, dispatch]);

  useEffect(() => {
    setBusinessId(review?.businessId);
  }, [review]);

  const postReview = (e, rating, reviewText) => {
    if (
      (rating > 0 && reviewText?.length >= 5) ||
      (review?.rating > 0 && review?.body.length >= 5)
    ) {
      const reviewObject = {
        id: reviewId,
        rating: rating ? rating : review?.rating,
        body: reviewText ? reviewText : review?.body,
        user_id: userId,
        business_id: businessId,
      };
      dispatch(updateReview(reviewObject));
      history.push(`/restaurants/${businessId}`);
    }
  };

  return (
    <div className="container" style={{ marginTop: "10vw" }}>
      {/* <div className="curr-rest-name">{currRest?.name}</div>   */}
      <div className="curr-review-container">
        {review?.rating ? (
          <Rating
            value={rating ? parseInt(rating) : review?.rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
            onChangeActive={(e, m) => {
              setNewRating(m);
            }}
          />
        ) : null}
        <div>
          <textarea
            className="review-input"
            defaultValue={review?.body}
            placeholder="Please add a review here"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div
        className="post-review-btn"
        onClick={(e) => postReview(e, rating, reviewText)}
      >
        Update Review
      </div>
      <div className="error-container">
        {/* {errorRating? <div>Please Choose a Rating</div> : null}
        {errorReview? <div>Please Enter a Review</div> : null} */}
      </div>
    </div>
  );
};

export default ReviewEdit;
