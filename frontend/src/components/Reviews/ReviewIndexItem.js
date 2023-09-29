import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/review";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./Review.css";

const ReviewIndexItem = ({ review }) => {
  const currUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteReview(review.id));
  };

  return (
    <div className="review-container">
      <h1>{review.body}</h1>

      {currUser?.id === review.userId ? (
        <div className="edit-delete-btn-gp">
          <Link to={`/reviews/${review.id}/edit`} className="edit-btn">Edit</Link>
          <button onClick={(e) => handleDelete(e)} className="delete-btn">Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewIndexItem;
