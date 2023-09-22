import csrfFetch from "./csrf";

export const RECEIVE_BUSINESSES = "business/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "business/RECEIVE_BUSINESS";

export const receiveBusinesses = (businesses) => {
  return {
    type: RECEIVE_BUSINESSES,
    businesses,
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

export const getBusinesses = (state) => {
  if (state.businesses) return Object.values(state.businesses);
  return [];
};

export const fetchBusinesses = () => async (dispatch) => {
  const res = await csrfFetch("/api/businesses");

  if (res.ok) {
    const businesses = await res.json();
    dispatch(receiveBusinesses(businesses));
  }
};

export const fetchBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`);

  if (res.ok) {
    const business = await res.json();
    dispatch(receiveBusiness(business));
  }
};

const businesssesReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return { ...action.businesses };
    case RECEIVE_BUSINESS:
      nextState[action.business.id] = action.business;
      return nextState;
    default:
      return state;
  }
};
export default businesssesReducer;
