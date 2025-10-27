import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import './GuideNavbar.css';

const GuideNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="guide-navbar">
      <div className="navbar-container">
        <Link to="/guide/dashboard" className="navbar-logo" onClick={closeMenu}>
          SafariHub Guide
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'navbar-menu-active' : ''}`}>
          <Link 
            to="/guide/dashboard" 
            className={`navbar-link ${isActiveLink('/guide/dashboard')}`}
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/guide/trips" 
            className={`navbar-link ${isActiveLink('/guide/trips')}`}
            onClick={closeMenu}
          >
            My Trips
          </Link>
          <Link 
            to="/guide/bookings" 
            className={`navbar-link ${isActiveLink('/guide/bookings')}`}
            onClick={closeMenu}
          >
            Bookings
          </Link>
          <Link 
            to="/guide/profile" 
            className={`navbar-link ${isActiveLink('/guide/profile')}`}
            onClick={closeMenu}
          >
            Profile
          </Link>
          
          <div className="navbar-user">
            <span className="user-name">Hi, {currentUser?.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>
    </nav>
  );
};

export default GuideNavbar;