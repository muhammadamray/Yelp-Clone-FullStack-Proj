import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import Login from "./Login.png";
import Logo from "./Logo.png";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.signup({
        first_name,
        last_name,
        email,
        password,
        zip_code,
        birthday,
      })
    ).catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  const DemoLogin = async () => {
    const demoUser = { email: "demologin@gmail.com", password: "password" };
    dispatch(sessionActions.login(demoUser));
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
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="Login-wrapper">
          <h1 id="title">Sign Up for Not Yelp</h1>
          <form onSubmit={handleSubmit}>
            <div id="top-form">
              <div id="welcome" className="centered-text">
                <span className="bold-text">
                  Connect with great local businesses
                </span>
              </div>
              <div id="msg">
                <div className="msg-line">
                  By signing up, you agree to Not Yelp's
                </div>
                <div className="msg-line">
                  <a href="https://terms.yelp.com/tos/en_us/20200101_en_us/">
                    Terms of Service
                  </a>
                  and
                  <a href="https://terms.yelp.com/privacy/en_us/20220831_en_us/">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>

            <div className="demo-login-button" onClick={DemoLogin}>
              Demo Login
            </div>

            <fieldset>
              <legend align="center">OR</legend>
            </fieldset>

            <div id="first-name">
              <input
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div id="last-name">
              <input
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div id="email">
              <input
                type="email"
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

            <div id="zip-code">
              <input
                type="text"
                placeholder="Zip Code"
                value={zip_code}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div id="birthday">
              <input
                type="date"
                placeholder="Birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <button id="button" type="submit">
              Sign Up
            </button>
          </form>

          <div className="centered-text">
            <span className="text"> Already on Not Yelp? </span>
            <a id="login_but" href="/login">
              Log in
            </a>
          </div>
        </div>

        <div id="image">
          <img className="Login" src={Login} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
