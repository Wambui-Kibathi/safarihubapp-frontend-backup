import React from 'react';
import Navbar from '@/components/common/Navbar/Navbar';
import Footer from '@/components/common/Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;