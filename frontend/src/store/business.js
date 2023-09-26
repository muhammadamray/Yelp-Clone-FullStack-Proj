import csrfFetch from "./csrf";
import { createSelector } from "reselect";

const selectBusinesses = (state) => state.businesses;

export const RECEIVE_BUSINESSES = "business/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "business/RECEIVE_BUSINESS";

export const receiveBusinesses = (data) => {
  return {
    type: RECEIVE_BUSINESSES,
    data,
  };
};

export const receiveBusiness = (business) => {
  return {
    type: RECEIVE_BUSINESS,
    business,
  };
};

export const getBusiness = (businessId) => {
  return (state) => {
    if (state.businesses) return state.businesses[businessId];
    return null;
  };
};

export const getBusinesses = createSelector([selectBusinesses], (businesses) =>
  Object.values(businesses)
);
export const fetchBusinesses = () => async (dispatch) => {
  const res = await csrfFetch("/api/businesses");

  if (res.ok) {
    const data = await res.json();
    // debugger
    dispatch(receiveBusinesses(data));
  }
};

export const fetchBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`);

  if (res.ok) {
    const business = await res.json();
    dispatch(receiveBusiness(business));
  }
};

const businessesReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return {...action.data.businesses };
    case RECEIVE_BUSINESS:
      nextState[action.business.id] = action.business;
      return nextState;
    default:
      return state;
  }
};
export default businessesReducer;
