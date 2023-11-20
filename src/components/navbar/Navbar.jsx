import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [toggleMenu, setToggleMenu] = useState(false);
  // const screensize = window.screen.width;
  // console.log(screensize);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleSearch = (e) => {
    // Add your search logic here, for example, redirect to a search results page
    e.preventDefault();
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    navigate("/search", { state: newQuery });
    console.log("Searching for:", newQuery);
  };

  const list = [
    { name: "Home", link: "/", icon: <i className="fa-solid fa-house"></i> },
    {
      name: "Movies",
      link: "/movies",
      icon: <i className="fa-solid fa-film"></i>,
    },
    {
      name: "About",
      link: "/about",
      icon: <i className="fa-solid fa-circle-info"></i>,
    },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      const newSize = window.screen.width;
      if (newSize >= 800) {
        setToggleMenu(false);
      }
    });
  }, [toggleMenu]);

  return (
    <>
      <nav id="navbar" data-theme={theme}>
        <div className="navbar-logo">
          <h5>Movie-Browser</h5>
        </div>
        <ul className="navbar-item-list">
          {list.map(({ name, link, icon }, i) => (
            <li className="navbar-item" key={i}>
              <NavLink
                className="navbar-item-link"
                to={link}
                activeclassname="active"
              >
                {icon}
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="navbar-item-list">
          <li className="navbar-search-container navbar-item">
            <input
              type="text"
              className="navbar-search"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="navbar-searchbtn">Search</button>
          </li>
          <li className="navbar-item" style={{ marginLeft: 5 }}>
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <i className="fa-solid fa-sun"></i>
              ) : (
                <i className="fa-solid fa-moon"></i>
              )}
            </button>
          </li>
        </ul>
        <div className="menu-icon" onClick={handleToggleMenu}>
          <i className="fa fa-bars"></i>
        </div>
      </nav>
      <ul
        id="navbar-menu-item-list"
        style={{ display: toggleMenu ? "flex" : "none" }}
      >
        <div className="navbar-menu-group">
          <li className="navbar-search-container navbar-item">
            <input
              type="text"
              className="navbar-search"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="navbar-searchbtn">Search</button>
          </li>
          <li className="toggle-btn navbar-item" style={{ marginLeft: 5 }}>
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <i className="fa-solid fa-sun"></i>
              ) : (
                <i className="fa-solid fa-moon"></i>
              )}
            </button>
          </li>
        </div>
        {list.map(({ name, link, icon }, i) => (
          <li className="navbar-item" key={i}>
            <NavLink
              className="navbar-item-link"
              to={link}
              activeclassname="active"
            >
              {icon}
              <span>{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
