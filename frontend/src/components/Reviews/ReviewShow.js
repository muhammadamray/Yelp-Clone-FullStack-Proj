// import { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getReview, fetchReview } from "../store/reviews";


// const ReviewShow = () => {
//   const { reviewId } = useParams();

//   const review = useSelector(getReview(reviewId));

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchReview(reviewId));
//   }, [reviewId, dispatch]);

//   return (
//     <>
//       <p>{review.body}</p>
//       <Link to="/">Review Index</Link>
//     </>
//   );
// };

// export default ReviewShow;
