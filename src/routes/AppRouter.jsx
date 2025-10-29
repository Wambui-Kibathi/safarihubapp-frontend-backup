import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Layouts
import MainLayout from '@/layouts/MainLayout/MainLayout';
import TravelerLayout from '@/layouts/TravelerLayout/TravelerLayout';
import GuideLayout from '@/layouts/GuideLayout/GuideLayout';

// Components
import ProtectedRoute from './PrivateRoutes';

// Shared Pages
import Home from '@/pages/shared/Home/Home';
import About from '@/pages/shared/About/About';
import Contact from '@/pages/shared/Contact/Contact';
import Login from '@/pages/shared/Login/Login';
import Register from '@/pages/shared/Register/Register';
import DestinationsPage from '@/pages/shared/DestinationsPage/DestinationsPage';
import UserProfile from '@/pages/shared/UserProfile/UserProfile'; // Single profile for all

// NEW: Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';

// Traveler Pages
import TravelerDashboard from '@/pages/traveler/TravelerDashboard/TravelerDashboard';
import TravelerExplore from '@/pages/traveler/TravelerExplore/TravelerExplore';
import TravelerBookings from '@/pages/traveler/TravelerBookings/TravelerBookings';

// Guide Pages
import GuideDashboard from '@/pages/guide/GuideDashboard/GuideDashboard';
import GuideTrips from '@/pages/guide/GuideTrips/GuideTrips';
import GuideBookings from '@/pages/guide/GuideBookings/GuideBookings';

const AppRouter = () => {
  const { user, isAuthenticated } = useAuth();

  // Enhanced ProtectedRoute with role checking
  const RoleProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (requiredRole && user?.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with MainLayout (Navbar & Footer included in MainLayout) */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/destinations" element={<MainLayout><DestinationsPage /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

        {/* Shared Profile Route (for all authenticated users) */}
        <Route 
          path="/profile" 
          element={
            <RoleProtectedRoute>
              <MainLayout>
                <UserProfile />
              </MainLayout>
            </RoleProtectedRoute>
          } 
        />

        {/* NEW: Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <RoleProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </RoleProtectedRoute>
          } 
        />

        {/* Traveler Routes */}
        <Route 
          path="/traveler/dashboard" 
          element={
            <RoleProtectedRoute requiredRole="traveler">
              <TravelerLayout>
                <TravelerDashboard />
              </TravelerLayout>
            </RoleProtectedRoute>
          } 
        />
        
        <Route 
          path="/traveler/explore" 
          element={
            <RoleProtectedRoute requiredRole="traveler">
              <TravelerLayout>
                <TravelerExplore />
              </TravelerLayout>
            </RoleProtectedRoute>
          } 
        />
        
        <Route 
          path="/traveler/bookings" 
          element={
            <RoleProtectedRoute requiredRole="traveler">
              <TravelerLayout>
                <TravelerBookings />
              </TravelerLayout>
            </RoleProtectedRoute>
          } 
        />

        {/* Guide Routes */}
        <Route 
          path="/guide/dashboard" 
          element={
            <RoleProtectedRoute requiredRole="guide">
              <GuideLayout>
                <GuideDashboard />
              </GuideLayout>
            </RoleProtectedRoute>
          } 
        />
        
        <Route 
          path="/guide/trips" 
          element={
            <RoleProtectedRoute requiredRole="guide">
              <GuideLayout>
                <GuideTrips />
              </GuideLayout>
            </RoleProtectedRoute>
          } 
        />
        
        <Route 
          path="/guide/bookings" 
          element={
            <RoleProtectedRoute requiredRole="guide">
              <GuideLayout>
                <GuideBookings />
              </GuideLayout>
            </RoleProtectedRoute>
          } 
        />

        {/* Catch all undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;