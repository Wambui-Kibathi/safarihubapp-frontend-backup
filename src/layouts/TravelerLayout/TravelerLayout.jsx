import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import TravelerNavbar from '@/components/traveler/TravelerNavbar/TravelerNavbar';
import Footer from '@/components/common/Footer/Footer';
import { AuthContext } from '@/context/AuthContext';
import './TravelerLayout.css';

const TravelerLayout = ({ children }) => {
  const { user } = useContext(AuthContext) || {};

  return (
    <div className="traveler-layout">
      <TravelerNavbar />
      <main className="traveler-content">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default TravelerLayout;