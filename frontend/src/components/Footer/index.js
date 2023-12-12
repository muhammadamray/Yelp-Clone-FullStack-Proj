import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h1>Not Yelp</h1>
          <p>Your guide to local restaurants and reviews</p>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <h2>Discover</h2>
            </li>
            <li>Restaurants</li>
          </ul>
          <ul>
            <li>
              <a href="https://github.com/muhammadamray" target="_blank">
                My GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/muhammad-amray-b94983207/"
                target="_blank"
              >
                My LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Not Yelp, Inc. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
