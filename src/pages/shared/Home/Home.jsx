import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const destinations = [
    {
      id: 1,
      image: '/src/assets/images/kenya-safari.jpg',
      title: 'Kenya Safari Adventure',
      description: 'Experience the Big Five in their natural habitat across Kenya\'s iconic national parks.'
    },
    {
      id: 2,
      image: '/src/assets/images/tanzania-adventure.jpg',
      title: 'Tanzania Adventure Trails',
      description: 'Discover the Serengeti and climb Mount Kilimanjaro on this epic adventure.'
    },
    {
      id: 3,
      image: '/src/assets/images/zanzibar-beach.jpg',
      title: 'Zanzibar Beach Escape',
      description: 'Relax on pristine beaches and explore the rich culture of Zanzibar Island.'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Africa's Wild Beauty</h1>
          <p className="hero-tagline">Unforgettable safari adventures and cultural experiences await you</p>
          <Link to="/traveler/explore" className="hero-button">
            Start Exploring
          </Link>
        </div>
      </section>

      <section className="destinations">
        <div className="destinations-container">
          <h2 className="destinations-title">Popular Destinations</h2>
          <div className="destinations-grid">
            {destinations.map(destination => (
              <div key={destination.id} className="destination-card">
                <img 
                  src={destination.image} 
                  alt={destination.title}
                  className="destination-image"
                />
                <div className="destination-content">
                  <h3 className="destination-name">{destination.title}</h3>
                  <p className="destination-description">{destination.description}</p>
                  <button className="destination-button">View More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;