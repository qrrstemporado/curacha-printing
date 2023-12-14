import React, { useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo-curacha.svg';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
//import icon from '../../assets/profile icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCircleUser } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" onClick={() => { window.location.href = '/' }} />
      <div className="menu" ref={navRef}>
        <Link to="/quote" className="menuItem">Request Quote</Link>
        <ScrollLink to="services-container" spy={true} smooth={true} duration={800} onClick={closeNavbar} className="menuItem"> Services </ScrollLink>
        <Link to="/login" className="menuItem">Login</Link>
        <FontAwesomeIcon icon={faCircleUser} className="icon" onClick={() => { window.location.href = '/profile' }} />

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <button className="nav-btn" onClick={showNavbar}>
      <Link to="/profile" className="profile-icon">
        <FontAwesomeIcon icon={faCircleUser} />
        </Link>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
}

export default NavBar;