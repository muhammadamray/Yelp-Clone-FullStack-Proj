import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import Login from "./Login.png";
import Logo from "./Logo.png";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  return (
    <div>
      <div id="header">
        <div id="NotYelp">
          <a href="/">
            <div className="centered-content">
              <span className="not-yelp-text">not yelp</span>
              <img src={Logo} alt="Not Yelp Logo" className="not-yelp-logo" />
            </div>
          </a>
        </div>
      </div>

      <div id="parent">
        <div className="Login-wrapper">
          <h1 id="title">Log In to Not Yelp</h1>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>

            <div id="top-form">
              <div id="welcome" className="centered-text">
                <span className="bold-text">New to Not Yelp?</span>
                <a href="/signup"> Sign up</a>
              </div>
              <div id="msg">
                <div className="msg-line">
                  By logging in, you agree to Not Yelp's
                </div>
                <div className="msg-line">
                  <a href="https://terms.yelp.com/tos/en_us/20200101_en_us/">
                    Terms of Service
                  </a>
                  <a href="https://terms.yelp.com/privacy/en_us/20220831_en_us/">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>

            <div className="demo-login-button">Demo Login</div>

            <span id ="lines">
              or
            </span>

            <div id="email">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div id="password">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button id="button" type="submit">
              Log In
            </button>
          </form>
        </div>

        <div id="image">
          <img className="Login" src={Login} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
