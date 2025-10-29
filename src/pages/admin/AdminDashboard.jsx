import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardOverview from './components/DashboardOverview';
import UserManagement from './components/UserManagement';
import DestinationManagement from './components/DestinationManagement';
import BookingManagement from './components/BookingManagement';
import AdminLayout from './components/AdminLayout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect if not admin or not authenticated
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/destinations" element={<DestinationManagement />} />
        <Route path="/bookings" element={<BookingManagement />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;