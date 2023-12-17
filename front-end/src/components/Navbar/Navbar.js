import React, { useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo-curacha.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCircleUser } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const navRef = useRef();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  const handleLogout = () => {
    // Clear user authentication state
    localStorage.removeItem('token');
    setIsAuthenticated(false);

    // Redirect to the home page or any other desired location
    navigate('/');
  };

  const handleProfileIcon = () => {
    // If authenticated, redirect to the profile page
    // Otherwise, redirect to the login page
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" onClick={() => navigate('/')} />
      <div className="menu" ref={navRef}>
        <Link to="/quote" className="menuItem">Request Quote</Link>
        <ScrollLink to="services-container" spy={true} smooth={true} duration={800} onClick={closeNavbar} className="menuItem"> Services </ScrollLink>

        {isAuthenticated ? (
          <button className="menuItem" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="menuItem">Login</Link>
        )}

        <FontAwesomeIcon icon={faCircleUser} className="icon" onClick={() => handleProfileIcon()} />

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
