import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our team</p>
        
        <div className="contact-content">
          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="contact-info-section">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="info-item">
                <strong>Email:</strong>
                <p>info@safarihub.com</p>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <p>+254 700 123 456</p>
              </div>
              <div className="info-item">
                <strong>Address:</strong>
                <p>Nairobi, Kenya<br />East Africa</p>
              </div>
            </div>
            
            <div className="map-placeholder">
              <div className="map-content">
                <p>Interactive Map</p>
                <small>Nairobi, Kenya</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;