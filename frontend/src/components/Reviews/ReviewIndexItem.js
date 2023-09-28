import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/review"


const ReviewIndexItem = ({ review }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteReview(review.id));
  };

  return (
    <>
      <h1>{review.body}</h1>
      <Link to={`/reviews/${review.id}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default ReviewIndexItem;
