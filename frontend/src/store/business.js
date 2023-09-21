import csrfFetch from "./csrf";

export const RECEIVE_RESTAURANTS = "businesses/RECEIVE_RESTAURANTS";
export const RECEIVE_RESTAURANT = "businesses/RECEIVE_RESTAURANT";

const setBenches = (benches) => ({
  type: SET_BENCHES,
  payload: benches,
});

export const addBench = (bench) => ({
  type: ADD_BENCH,
  payload: bench,
});
