import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <nav id="navbar" data-theme={theme}>
        <div className="navbar-logo">
          <h5>Movie-Browser</h5>
        </div>
        <ul className="navbar-item-list">
          <li className="navbar-item">
            <NavLink
              className="navbar-item-link"
              to={"/"}
              activeclassname="active"
            >
              <i class="fa-solid fa-house"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              className="navbar-item-link"
              to={"/movies"}
              activeclassname="active"
            >
              <i class="fa-solid fa-film"></i>
              <span>Movies</span>
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              className="navbar-item-link"
              to={"/about"}
              activeclassname="active"
            >
              <i class="fa-solid fa-circle-info"></i>
              <span>About</span>
            </NavLink>
          </li>
          {/* <li className="navbar-item"></li>
            <li className="navbar-item"></li> */}
        </ul>
        <ul className="navbar-item-list">
          <li className="navbar-search-container navbar-item">
            <input type="text" className="navbar-search" />
            <button className="navbar-searchbtn">Search</button>
          </li>
          <li className="navbar-item">
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <i class="fa-solid fa-sun"></i>
              ) : (
                <i class="fa-solid fa-moon"></i>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
