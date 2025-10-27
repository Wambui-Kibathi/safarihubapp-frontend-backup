import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';
import Footer from '@/components/common/Footer/Footer';
import { ThemeContext } from '@/context/ThemeContext';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext) || { theme: 'light' };

  return (
    <div className={`main-layout ${theme}`}>
      <Navbar />
      <main className="main-content">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout;