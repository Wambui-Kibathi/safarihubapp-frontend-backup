import React, { useState, useEffect } from 'react';
import './Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [mapUrl, setMapUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (connects to Flask backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const res = await axios.post('http://127.0.0.1:5000/contact', formData);
      if (res.status === 201 || res.status === 200) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setStatusMessage('Failed to send message. Please check your connection.');
    }
  };

  // Fetch the static map URL from Flask backend
  useEffect(() => {
    const fetchMap = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/contact/map');
        const data = await res.json();
        if (data.map_url) {
          setMapUrl(data.map_url);
        }
      } catch (err) {
        console.error('Error fetching map URL:', err);
      }
    };
    fetchMap();
  }, []);

  return (
    <div className="contact">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our team</p>
        
        <div className="contact-content">
          {/* Contact Form */}
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
              {statusMessage && (
                <p style={{ marginTop: '15px', color: '#00695C', fontWeight: '500' }}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info + Static Map */}
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

            <div className="map-section">
              {mapUrl ? (
                <>
                  <img src={mapUrl} alt="SafariHub Location" />
                  <p className="map-caption">SafariHub – Nairobi, Kenya</p>
                </>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
