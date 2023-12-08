import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  clearSearchResults,
  fetchSearchResults,
  fetchSearchSuggestions,
} from "../../store/search";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import sear from "./sear.png";
import "./Navigation.css";

function SearchBar() {
  const [showMenu, setShowMenu] = useState(false);
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

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const searchResults = useSelector((state) => Object.values(state.search));

  const [searchText, setSearchText] = useState("");
  // const [timer, setTimer] = useState(0);

  function handleSearch(e) {
    const query = e.target.value;
    setSearchText(query);
    if (query.trim() !== "") {
      dispatch(fetchSearchSuggestions(query));
    } else {
      dispatch(clearSearchResults());
    }

    if (query.length > 0) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  function handleSubmit(e) {
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

      {showMenu && (
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
