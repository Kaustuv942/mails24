import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            path="/"
            to="/"
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            MAILS24 <i class="fas fa-envelope-open"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/history"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/compose"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Compose
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sign-up"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sign Up/Log In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
