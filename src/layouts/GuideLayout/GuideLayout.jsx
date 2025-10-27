import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import GuideNavbar from '@/components/guide/GuideNavbar/GuideNavbar';
import Footer from '@/components/common/Footer/Footer';
import { AuthContext } from '@/context/AuthContext';
import './GuideLayout.css';

const GuideLayout = ({ children }) => {
  const { user } = useContext(AuthContext) || {};

  return (
    <div className="guide-layout">
      <GuideNavbar />
      <main className="guide-content">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default GuideLayout;