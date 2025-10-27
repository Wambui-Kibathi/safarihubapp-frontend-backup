import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/layouts/MainLayout/MainLayout';
import TravelerLayout from '@/layouts/TravelerLayout/TravelerLayout';
import GuideLayout from '@/layouts/GuideLayout/GuideLayout';

// Components
import Navbar from '@/components/common/Navbar/Navbar';
import Footer from '@/components/common/Footer/Footer';
import ProtectedRoute from './PrivateRoutes';

// Shared Pages
import Home from '@/pages/shared/Home/Home';
import About from '@/pages/shared/About/About';
import Contact from '@/pages/shared/Contact/Contact';
import Login from '@/pages/shared/Login/Login';
import Register from '@/pages/shared/Register/Register';

// Traveler Pages
import TravelerDashboard from '@/pages/traveler/TravelerDashboard/TravelerDashboard';
import TravelerExplore from '@/pages/traveler/TravelerExplore/TravelerExplore';
import TravelerBookings from '@/pages/traveler/TravelerBookings/TravelerBookings';
import TravelerProfile from '@/pages/traveler/TravelerProfile/TravelerProfile';

// Guide Pages
import GuideDashboard from '@/pages/guide/GuideDashboard/GuideDashboard';
import GuideTrips from '@/pages/guide/GuideTrips/GuideTrips';
import GuideBookings from '@/pages/guide/GuideBookings/GuideBookings';
import GuideProfile from '@/pages/guide/GuideProfile/GuideProfile';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={
          <MainLayout>
            <Navbar />
            <Home />
            <Footer />
          </MainLayout>
        } />
        
        <Route path="/about" element={
          <MainLayout>
            <Navbar />
            <About />
            <Footer />
          </MainLayout>
        } />
        
        <Route path="/contact" element={
          <MainLayout>
            <Navbar />
            <Contact />
            <Footer />
          </MainLayout>
        } />
        
        <Route path="/login" element={
          <MainLayout>
            <Navbar />
            <Login />
            <Footer />
          </MainLayout>
        } />
        
        <Route path="/register" element={
          <MainLayout>
            <Navbar />
            <Register />
            <Footer />
          </MainLayout>
        } />

        {/* Protected Traveler Routes */}
        <Route path="/traveler/dashboard" element={
          <ProtectedRoute userType="traveler">
            <TravelerLayout>
              <TravelerDashboard />
            </TravelerLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/traveler/explore" element={
          <ProtectedRoute userType="traveler">
            <TravelerLayout>
              <TravelerExplore />
            </TravelerLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/traveler/bookings" element={
          <ProtectedRoute userType="traveler">
            <TravelerLayout>
              <TravelerBookings />
            </TravelerLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/traveler/profile" element={
          <ProtectedRoute userType="traveler">
            <TravelerLayout>
              <TravelerProfile />
            </TravelerLayout>
          </ProtectedRoute>
        } />

        {/* Protected Guide Routes */}
        <Route path="/guide/dashboard" element={
          <ProtectedRoute userType="guide">
            <GuideLayout>
              <GuideDashboard />
            </GuideLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/guide/trips" element={
          <ProtectedRoute userType="guide">
            <GuideLayout>
              <GuideTrips />
            </GuideLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/guide/bookings" element={
          <ProtectedRoute userType="guide">
            <GuideLayout>
              <GuideBookings />
            </GuideLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/guide/profile" element={
          <ProtectedRoute userType="guide">
            <GuideLayout>
              <GuideProfile />
            </GuideLayout>
          </ProtectedRoute>
        } />

        {/* Catch all undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;