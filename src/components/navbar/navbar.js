import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';
import './navbar.css';
import Hamburger from '../hamburger/hamburger';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${cookies.get('session')}`,
        },
      });

      console.log('Logged out');
      cookies.remove('session');
      setAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    // Fetch the authentication status directly from the frontend
    fetch('/login', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAuthenticated(data.authenticated);
      })
      .catch(error => {
        console.error('Error during authentication check:', error);
      });
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 id='logoName'>ExpenseMapper.</h1>
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <Link to="/" onClick={closeNavbar}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeNavbar}>About</Link>
            </li>
            <li>
              <Link to="/Contact" onClick={closeNavbar}>Contact Us</Link>
            </li>
            {authenticated ? (
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={closeNavbar}>Login</Link>
              </li>
            )}
            <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
