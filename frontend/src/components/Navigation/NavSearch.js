import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  clearSearchResults,
  fetchSearchResults,
  fetchSearchSuggestions,
} from "../../store/search";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import sear from "./sear.png";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchResults = useSelector((state) => {
    if (state.search.results) {
      return Object.values(state.search.results);
    }
    return [];
  });

  const searchSuggestions = useSelector((state) => {
    if (state.search.suggestions) {
      return Object.values(state.search.suggestions);
    }
    return [];
  });

  // const searchResults = useSelector((state) => Object.values(state.search));

  const [searchText, setSearchText] = useState("");
  // const [timer, setTimer] = useState(0);

  function handleSearch(e) {
    const query = e.target.value;
    setSearchText(query);
    // clearTimeout(timer);
    if (query.trim() !== "") {
      dispatch(fetchSearchSuggestions(searchText));
      // setTimer(setTimeout(() => dispatch(fetchSearchResults(query)), 300));
    } else {
      dispatch(clearSearchResults());
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchText.trim() !== "") {
      dispatch(fetchSearchResults(searchText));
      setSearchText("");
      history.push(`/search?query=${searchText}`);
    }
  }

  function handleLinkClick(id) {
    return (e) => {
      e.preventDefault();
      history.push(`/restaurants/${id}`);
      dispatch(clearSearchResults());
      setSearchText("");
    };
  }

  return (
    <div className="searchbar-container">
      <input
        type="text"
        id="search-input"
        placeholder="Pizza"
        value={searchText}
        onChange={handleSearch}
      ></input>
      <img id="sear-btn" src={sear} alt="Search" onClick={handleSubmit} />

      {/* <button onClick={handleSubmit}>Search</button> */}

      {searchText && (
        <ul id="search-dropdown">
          {searchSuggestions.map((result) => {
            return (
              <li
                onClick={handleLinkClick(result.id)}
                className="search-dropdown-item"
                key={result.id}
              >
                {/* {result.category} */}
                {result.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
