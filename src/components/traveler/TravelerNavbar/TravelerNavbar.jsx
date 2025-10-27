import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import './TravelerNavbar.css';

const TravelerNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const auth = useAuth(); // get full auth object
  const currentUser = auth?.currentUser;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActiveLink = (path) => (location.pathname === path ? 'active' : '');

  const handleLogout = () => {
    auth.logout();
    closeMenu();
  };

  return (
    <nav className="traveler-navbar">
      <div className="navbar-container">
        <Link to="/traveler/dashboard" className="navbar-logo" onClick={closeMenu}>
          SafariHub
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'navbar-menu-active' : ''}`}>
          <Link
            to="/traveler/dashboard"
            className={`navbar-link ${isActiveLink('/traveler/dashboard')}`}
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/traveler/explore"
            className={`navbar-link ${isActiveLink('/traveler/explore')}`}
            onClick={closeMenu}
          >
            Explore
          </Link>
          <Link
            to="/traveler/bookings"
            className={`navbar-link ${isActiveLink('/traveler/bookings')}`}
            onClick={closeMenu}
          >
            My Bookings
          </Link>
          <Link
            to="/traveler/profile"
            className={`navbar-link ${isActiveLink('/traveler/profile')}`}
            onClick={closeMenu}
          >
            Profile
          </Link>

          {currentUser && (
            <div className="navbar-user">
              <span className="user-name">Hi, {currentUser.name}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>
    </nav>
  );
};

export default TravelerNavbar;
