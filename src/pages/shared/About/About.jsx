import React from 'react';
import { Users, Compass, Star, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    {
      icon: <Users size={40} />,
      number: '10,000+',
      label: 'Happy Travelers'
    },
    {
      icon: <Compass size={40} />,
      number: '500+',
      label: 'Local Guides'
    },
    {
      icon: <Globe size={40} />,
      number: '200+',
      label: 'Unique Trips'
    },
    {
      icon: <Star size={40} />,
      number: '4.9/5',
      label: 'Average Rating'
    }
  ];

  return (
    <div className="about">
      <div className="about-container">
        <section className="about-hero">
          <h1 className="about-title">About SafariHub</h1>
          <p className="about-subtitle">Connecting travelers with authentic African experiences</p>
        </section>

        <section className="about-mission">
          <div className="mission-content">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-text">
              SafariHub bridges the gap between adventurous travelers and passionate local guides across Africa. 
              We believe that the best travel experiences come from authentic connections with local communities 
              and their deep knowledge of the land, wildlife, and culture.
            </p>
            <p className="mission-text">
              Our platform empowers local guides to share their expertise while providing travelers with 
              unforgettable, personalized safari adventures that go beyond the ordinary tourist experience.
            </p>
          </div>
        </section>

        <section className="about-stats">
          <h2 className="stats-title">Our Impact</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;