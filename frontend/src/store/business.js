// Import necessary libraries and utilities
import csrfFetch from "./csrf";
import { createSelector } from "reselect";

// Define action types
export const RECEIVE_BUSINESSES = "business/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "business/RECEIVE_BUSINESS";

// Action creator for receiving a list of businesses
export const receiveBusinesses = (data) => {
  return {
    type: RECEIVE_BUSINESSES,
    data,
  };
};

// Action creator for receiving a single business
export const receiveBusiness = (data) => {
  return {
    type: RECEIVE_BUSINESS,
    data,
  };
};

// Selector to get a specific business by its ID
export const getBusiness = (businessId) => {
  return (state) => {
    if (state.businesses) return state.businesses[businessId];
    return null;
  };
};

// Selector to get all businesses using reselect library
export const getBusinesses = createSelector([selectBusinesses], (businesses) =>
  Object.values(businesses)
);

// Thunk action to fetch all businesses from the API
export const fetchBusinesses = () => async (dispatch) => {
  const res = await csrfFetch("/api/businesses");

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveBusinesses(data));
  }
};

// Thunk action to fetch a single business by ID from the API
export const fetchBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveBusiness(data));
  }
};

// Reducer function for handling business-related actions
const businessesReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return { ...action.data.businesses };
    case RECEIVE_BUSINESS:
      nextState[action.data.business.id] = action.data.business;
      return nextState;
    default:
      return state;
  }
};

// Export the businesses reducer as the default export
export default businessesReducer;
