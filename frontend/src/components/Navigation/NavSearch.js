import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
const searchResults = useSelector((state) => {
  if (state.search) {
    return Object.values(state.search);
  }
  return [];
});

  const [searchText, setSearchText] = useState("");
  // const [timer, setTimer] = useState(0);

  function handleSearch(e) {
    const query = e.target.value;
    setSearchText(query);
    // clearTimeout(timer);
    if (query.trim() !== "") {
      console.log("justin")
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

      <button onClick={handleSubmit}>Search</button>

      {searchText && (
        <ul id="search-dropdown">
          {searchResults.map((result) => {
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
