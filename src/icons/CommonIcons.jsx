import React from 'react';
import { 
  FaHome, 
  FaUser, 
  FaSearch, 
  FaHeart, 
  FaStar, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe,
  FaCamera,
  FaPlane,
  FaMountain,
  FaTree,
  FaWater
} from 'react-icons/fa';

export const HomeIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaHome size={size} color={color} />
);

export const UserIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaUser size={size} color={color} />
);

export const SearchIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaSearch size={size} color={color} />
);

export const HeartIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaHeart size={size} color={color} />
);

export const StarIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaStar size={size} color={color} />
);

export const LocationIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaMapMarkerAlt size={size} color={color} />
);

export const CalendarIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaCalendarAlt size={size} color={color} />
);

export const ClockIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaClock size={size} color={color} />
);

export const PhoneIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaPhone size={size} color={color} />
);

export const EmailIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaEnvelope size={size} color={color} />
);

export const GlobeIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaGlobe size={size} color={color} />
);

export const CameraIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaCamera size={size} color={color} />
);

export const PlaneIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaPlane size={size} color={color} />
);

export const MountainIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaMountain size={size} color={color} />
);

export const TreeIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaTree size={size} color={color} />
);

export const WaterIcon = ({ size = 20, color = 'currentColor' }) => (
  <FaWater size={size} color={color} />
);

// Custom Safari-themed icons using SVG
export const SafariIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const BinocularsIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8 3C6.9 3 6 3.9 6 5v6c0 2.21 1.79 4 4 4s4-1.79 4-4V5c0-1.1-.9-2-2-2H8zm6 0c1.1 0 2 .9 2 2v6c0 2.21 1.79 4 4 4s4-1.79 4-4V5c0-1.1-.9-2-2-2h-4z"/>
  </svg>
);

export const CompassIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);