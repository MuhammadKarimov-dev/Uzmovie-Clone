import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Navbar = () => {
  const [active, setActive] = useState(false);

  

  return (
    <div className="navbar_wrapper">
      <div className="navbar_container">
        <Link to="/" className="navbar_logo">
          <img src="https://uzmovi.tv/images/logo.gif" alt="logo" />
        </Link>

        <ul className="navbar_list">
          <li className="navbar_list_item">
            <Link to="/home">Bosh sahifa</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Kinolar</Link>
            <ul className="navbar_list_dropdown">
              <li>
                <Link to="/">Tarima kino</Link>
              </li>
              <li>
                <Link to="/">Tarima kino</Link>
              </li>
              <li>
                <Link to="/">Tarima kino</Link>
              </li>
            </ul>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Seriallar</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Janr</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Yil</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Mamlakat</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Kino Yangiliklar</Link>
          </li>
        </ul>
        <button className="menu-button" onClick={()=>setActive(!active)}>
          <span className="menu-text">MENYU</span>
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

      </div>
      <div className={`navbar_list_mobile ${active ? "navbar_list_mobile_active" : ""}`} >
      <ul className="navbar_mobile_list">
          <li className="navbar_list_item">
            <Link to="/home">Bosh sahifa</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Kinolar</Link>
            <ul className="navbar_list_dropdown">
              <li>
                <Link to="/">Tarima kino</Link>
              </li>
              <li>
                <Link to="/">Tarima kino</Link>
              </li>
              <li>
                <Link to="/">Tarima kino</Link>
              </li>
            </ul>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Seriallar</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Janr</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Yil</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Mamlakat</Link>
          </li>
          <li className="navbar_list_item">
            <Link to="/">Kino Yangiliklar</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
