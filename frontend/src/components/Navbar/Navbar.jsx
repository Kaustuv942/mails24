import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = (props) => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    props.handleLogIn();
  };

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
              <NavLink
              exact
                to="/"
                activeClassName="GG"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact 
                to="/history"
                className="nav-links"
                activeClassName="GG"
                onClick={closeMobileMenu}
              >
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact 
                to="/compose"
                className="nav-links"
                onClick={closeMobileMenu}
                activeClassName="GG"
              >
                Compose
              </NavLink>
            </li>
            <li className="nav-item">
              {!props.isLoggedIn ? (
                <NavLink
                  to="/sign-up"
                  className="nav-links"
                  activeClassName="GG"
                  onClick={closeMobileMenu}
                >
                  Sign Up/Log In
                </NavLink>
              ) : (
                <NavLink  exact to="/" onClick={handleLogout} className="nav-links">
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
