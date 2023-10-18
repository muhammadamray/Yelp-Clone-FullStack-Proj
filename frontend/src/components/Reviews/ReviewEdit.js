import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { fetchReview, getReview } from '../../store/review';
import { Rating } from '@mui/material';

const ReviewEdit = () => {
  const location = useLocation();
  const reviewId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    dispatch(fetchReview(reviewId));
  }, [dispatch]);

  const review = useSelector(getReview(reviewId));

  const postReview = () => {

  }

  return (
    <div className='container' style={{marginTop: "10vw"}}> 
    
      {/* <div className="curr-rest-name">{currRest?.name}</div>   */}
      <div className="curr-review-container">
        <Rating value={review?.rating} onChange={(e) => setRating(e.target.value)} />
        <div>
          <textarea
            className="review-input"
            defaultValue={review?.body}
            placeholder="Please add a review here"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="post-review-btn" onClick={(e) => postReview(e, rating, reviewText)}>
        Update Review
      </div>
      <div className="error-container">
        {/* {errorRating? <div>Please Choose a Rating</div> : null}
        {errorReview? <div>Please Enter a Review</div> : null} */}
      </div>
    </div>
  )
}

export default ReviewEdit