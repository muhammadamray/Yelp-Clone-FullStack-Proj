import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import Logo from "./Logo.png";
import "./Navigation.css";
import SearchBar from "./NavSearch";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const DemoLogin = async () => {
    const demoUser = { email: "demologin@gmail.com", password: "password" };
    dispatch(sessionActions.login(demoUser));
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/reservations" className="reservation-btn">
          All Reservations
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className="auth-btn-container">
        <NavLink to="/login" className="login-btn">
          Log In
        </NavLink>
        <NavLink to="/signup" className="signup-btn">
          Sign Up
        </NavLink>
        <div className="demo-login" onClick={DemoLogin}>
          Demo Login
        </div>
      </div>
    );
  }

  return (
    <div className="cont">
      <div id="header">
        <div id="NotYelp">
          <NavLink to="/">
            <div className="centered-content">
              <span className="not-yelp-text">not yelp</span>
              <img src={Logo} alt="Not Yelp Logo" className="not-yelp-logo" />
            </div>
          </NavLink>
        </div>

        {/* <div className="SearchBar"> */}
          <SearchBar />
        {/* </div> */}

        <div className="resturants">
          <NavLink exact to="/restaurants" className="restaurants-link">
            Restaurants
          </NavLink>
        </div>

        <div id="sessionLinks">{sessionLinks}</div>

        <div></div>
      </div>
    </div>
  );
}

export default Navigation;
