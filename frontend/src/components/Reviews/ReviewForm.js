import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReview, fetchReview, createReview, updateReview } from "../../store/review";

const ReviewForm = () => {
  const { reviewId } = useParams();

  const review = useSelector(getReview(reviewId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviewId) {
      dispatch(fetchReview(reviewId));
    }
  }, [reviewId, dispatch]);

  const [body, setBody] = useState(reviewId ? review.body : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviewId) {
      dispatch(updateReview({ id: reviewId, body }));
    } else {
      dispatch(createReview({ body }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{reviewId ? "Update Review" : "Create Review"}</h1>
      
      <label>
        Body
        <textarea onChange={(e) => setBody(e.target.value)} value={body} />
      </label>

      <button>{reviewId ? "Update Review" : "Create Review"}</button>
    </form>
  );
};

export default ReviewForm;
