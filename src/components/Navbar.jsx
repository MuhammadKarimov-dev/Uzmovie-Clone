import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Navbar ma'lumotlarini data obyekti sifatida saqlash
const navbarData = [
  { id: 1, title: "Bosh sahifa", path: "/home", dropdown: false, border: "var(--border-orange)" },
  { 
    id: 2, 
    title: "Kinolar", 
    path: "/", 
    dropdown: true, 
    border: "var(--border-green)",
    dropdownItems: [
      { id: "k1", title: "Tarjima kino", path: "/" },
      { id: "k2", title: "Hind kino", path: "/" },
      { id: "k3", title: "O'zbek kino", path: "/" }
    ]
  },
  { id: 3, title: "Seriallar", path: "/", dropdown: false, border: "var(--border-blue)" },
  { 
    id: 4, 
    title: "Janr", 
    path: "/", 
    dropdown: true, 
    border: "var(--border-red)",
    dropdownItems: [
      { id: "j1", title: "Komediya", path: "/" },
      { id: "j2", title: "Drama", path: "/" },
      { id: "j3", title: "Fantastika", path: "/" },
      { id: "j4", title: "Qo'rqinchli", path: "/" }
    ]
  },
  { 
    id: 5, 
    title: "Yil", 
    path: "/", 
    dropdown: true, 
    border: "var(--border-yellow)",
    dropdownItems: [
      { id: "y1", title: "2024", path: "/" },
      { id: "y2", title: "2023", path: "/" },
      { id: "y3", title: "2022", path: "/" },
      { id: "y4", title: "2021", path: "/" },
      { id: "y5", title: "2020", path: "/" }
    ]
  },
  { 
    id: 6, 
    title: "Mamlakat", 
    path: "/", 
    dropdown: true, 
    border: "var(--border-purple)",
    dropdownItems: [
      { id: "m1", title: "O'zbekiston", path: "/" },
      { id: "m2", title: "AQSh", path: "/" },
      { id: "m3", title: "Rossiya", path: "/" },
      { id: "m4", title: "Hindiston", path: "/" },
      { id: "m5", title: "Turkiya", path: "/" }
    ]
  },
  { id: 7, title: "Kino Yangiliklar", path: "/", dropdown: false, border: "var(--border-orange)" }
];

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [mobileActiveDropdowns, setMobileActiveDropdowns] = useState({});

  // Desktop dropdown menu togglei
  const toggleDropdown = (menuId) => {
    const newState = { ...activeDropdowns };
    // Avval hamma menu yopiladi
    Object.keys(newState).forEach(key => {
      newState[key] = false;
    });
    // Keyin tanlangan menu ochiladi (agar ochiq bo'lmasa)
    newState[menuId] = !activeDropdowns[menuId];
    setActiveDropdowns(newState);
    
    // Active hover holatini o'rnatish
    if (newState[menuId]) {
      setActiveHover(menuId);
    } else {
      setActiveHover(null);
    }
  };

  // Mobile dropdown menu togglei
  const toggleMobileDropdown = (menuId) => {
    const newState = { ...mobileActiveDropdowns };
    newState[menuId] = !mobileActiveDropdowns[menuId];
    setMobileActiveDropdowns(newState);
  };

  // Dropdown item bosilganda menyu to'liq yopilishi uchun
  const handleMobileItemClick = () => {
    // Mobil menyu to'liq yopilsin
    setActive(false);
    // Barcha dropdown menyular ham yopilsin
    setMobileActiveDropdowns({});
  };

  // Desktop dropdown item bosilganda
  const handleDesktopItemClick = () => {
    // Faqat desktop dropdown menyular yopilsin
    setActiveDropdowns({});
    setActiveHover(null);
  };

  // Dokument tanasiga click eventni qo'shish
  useEffect(() => {
    // Dropdown tashqarisiga bosilganda barcha dropdown menyularini yopish
    const handleClickOutside = (event) => {
      // Navbar elementini topish
      const navbar = document.querySelector('.navbar_wrapper');
      
      // Agar navbar mavjud bo'lsa va bosilgan joy navbar ichida bo'lmasa
      if (navbar && !navbar.contains(event.target)) {
        // Barcha dropdown menularini yopish
        setActiveDropdowns({});
        setActiveHover(null);
      }
    };

    // Click event listener qo'shish
    document.addEventListener('click', handleClickOutside);
    
    // Komponent o'chirilganda event listenerlarni tozalash
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar_wrapper">
      <div className="navbar_container">
        <Link to="/" className="navbar_logo">
          <img src="https://uzmovi.tv/images/logo.gif" alt="logo" />
        </Link>

        {/* Desktop Navbar */}
        <ul className="navbar_list">
          {navbarData.map((item) => (
            <li 
              key={item.id}
              className={`navbar_list_item ${activeDropdowns[item.id] ? "navbar_list_item_active" : ""}`}
              onClick={() => item.dropdown && toggleDropdown(item.id)}
              onMouseEnter={() => activeHover === item.id && setActiveHover(item.id)}
              onMouseLeave={() => activeHover === item.id && setActiveHover(null)}
            >
              {item.dropdown ? (
                <Link to={item.path} className="dropdown_link">
                  {item.title} <span className="down_icon"></span>
                </Link>
              ) : (
                <Link to={item.path} onClick={handleDesktopItemClick} className="linkitem">
                  {item.title}
                </Link>
              )}
              
              {item.dropdown && (
                <ul className={`navbar_list_dropdown ${activeDropdowns[item.id] ? "active_bottm_nav" : ""}`}>
                  {item.dropdownItems.map((dropItem) => (
                    <li key={dropItem.id} onClick={handleDesktopItemClick}>
                      <Link to={dropItem.path} className="dropdown_item_link">{dropItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Menu Button */}
        <button className="menu-button" onClick={() => setActive(!active)}>
          <span className="menu-text">MENYU</span>
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className={`navbar_list_mobile ${active ? "navbar_list_mobile_active" : ""}`}>
        <ul className="navbar_mobile_list">
          {navbarData.map((item) => (
            <li 
              key={item.id} 
              className={`navbar_list_item ${mobileActiveDropdowns[item.id] ? "dropdown_active" : ""}`}
            >
              {item.dropdown ? (
                <>
                  <button 
                    className="navbar_list_item_button"
                    onClick={() => toggleMobileDropdown(item.id)}
                  >
                    {item.title} <span className="dropdown_icon"></span>
                  </button>
                  <ul className={`navbar_list_dropdown ${mobileActiveDropdowns[item.id] ? "active_bottm_nav" : ""}`}>
                    {item.dropdownItems.map((dropItem) => (
                      <li key={dropItem.id} onClick={handleMobileItemClick}>
                        <Link to={dropItem.path}>{dropItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={item.path} onClick={handleMobileItemClick}>
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
