import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReview, fetchReviews } from "../../store/review";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./Review.css";
import { Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";

const ReviewIndexItem = ({ review }) => {
  // console.log(review);
  const currUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews[review.id]);
  // console.log(reviews?.rating);

  const [rating, setRating] = useState(reviews?.rating);

  useEffect(() => {
    setRating(reviews.rating);
  }, [reviews.rating]);

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id));
  };

  return (
    <div className="review-container">
      <div className="user-info-container">
        <span>
          <Avatar>
            {/* {review?.firstName[0]}
            {review?.lastName[0]} */}
          </Avatar>
        </span>
        <span>
          {review?.firstName} {review?.lastName}
        </span>
      </div>
      <div className="rating-time-container">
        <Rating value={rating} readOnly className="review-rating" />
        {
          new Date(review?.updatedAt)
            .toLocaleString("en-US", {
              timeZone: "America/New_York",
            })
            .split(",")[0]
        }
      </div>
      <h1>{review.body}</h1>

      {currUser?.id === review?.userId ? (
        <div className="edit-delete-btn-gp">
          <Link to={`/reviews/${review.id}/edit`} className="edit-btn">
            Edit
          </Link>
          <button onClick={(e) => handleDelete(e)} className="delete-btn">
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewIndexItem;
