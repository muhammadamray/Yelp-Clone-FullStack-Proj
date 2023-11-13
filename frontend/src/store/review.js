import { RECEIVE_BUSINESS } from "./business";
import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = "reviews/receiveReviews";
export const RECEIVE_REVIEW = "reviews/receiveReview";
export const REMOVE_REVIEW = "reviews/removeReview";

export const receiveReviews = (data) => ({
  type: RECEIVE_REVIEWS,
  data,
});

export const receiveReview = (data) => ({
  type: RECEIVE_REVIEW,
  data,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

export const getReview = (reviewId) => (state) => {
  if (state.reviews[reviewId]) return state.reviews[reviewId];
  return null;
};

export const getReviews = (state, businessId) => {
  if (state.reviews) {
    let allReviews = Object.values(state.reviews);
    let filtered = allReviews.filter(
      (review) => review.businessId.toString() === businessId
    );
    return filtered;
  }
  return [];
};

export const fetchReviews = () => async (dispatch) => {
  const res = await csrfFetch("/api/reviews");
  if (res.ok) {
    const data = await res.json();

    dispatch(receiveReviews(data));
  }
};

export const fetchReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`);
  const data = await response.json();

  dispatch(receiveReview(data));
};

export const createReview = (review) => async (dispatch) => {
  const res = await csrfFetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(receiveReview(review));
    return res;
  }
};

export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PATCH",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(receiveReview(updatedReview));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
  }
};

const reviewsReducer = (state = {}, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...nextState, ...action.data.reviews };
    case RECEIVE_REVIEW:
      return { ...state, [action.data.id]: action.data };
    case REMOVE_REVIEW:
      delete nextState[action.reviewId];
      return nextState;
    case RECEIVE_BUSINESS:
      return { ...state, ...action.data.reviews };
    default:
      return state;
  }
};

export default reviewsReducer;
