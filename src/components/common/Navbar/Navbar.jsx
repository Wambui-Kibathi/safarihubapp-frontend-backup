import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          SafariHub
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'navbar-menu-active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" className="navbar-link" onClick={closeMenu}>
            About
          </Link>
          <Link to="/destinations" className="navbar-link" onClick={closeMenu}>
            Destinations
          </Link>
          <Link to="/contact" className="navbar-link" onClick={closeMenu}>
            Contact
          </Link>
          <div className="navbar-auth">
            <Link to="/login" className="navbar-link navbar-login" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/register" className="navbar-link navbar-register" onClick={closeMenu}>
              Register
            </Link>
          </div>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;