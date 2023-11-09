import csrfFetch from "./csrf";

export const GET_SEARCH_RESULTS = "search/searchResults";
export const CLEAR_SEARCH_RESULTS = "search/clearSearchResults";
export const GET_SEARCH_SUGGESTIONS = "searchSuggestions";

export const receiveSearchResults = (searchResults) => ({
  type: GET_SEARCH_RESULTS,
  searchResults,
});
export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const receiveSearchSuggestions = (searchSuggestions) => ({
  type: GET_SEARCH_SUGGESTIONS,
  searchSuggestions,
});

export const fetchSearchResults = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/search?query=${query}`);
  const data = await res.json();
  dispatch(receiveSearchResults(data));
};

export const fetchSearchSuggestions = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/search?query=${query}`);
  const data = await res.json();
  dispatch(receiveSearchSuggestions(data));
};

const searchReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      // return { ...action.searchResults.businesses };
      newState.results = { ...action.searchResults.businesses };
      return newState;
    case CLEAR_SEARCH_RESULTS:
      // return {};
      newState.results = {};
      return newState;
    case GET_SEARCH_SUGGESTIONS:
      // return { ...action.searchSuggestions.businesses };
      newState.suggestions = { ...action.searchSuggestions.businesses };
      return newState;
    default:
      return newState;
  }
};

export default searchReducer;
