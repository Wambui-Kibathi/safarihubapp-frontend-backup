import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaMapMarkerAlt, 
  FaCalendarCheck, 
  FaDollarSign,
  FaClock,
  FaUserPlus,
  FaCreditCard
} from 'react-icons/fa';
import adminApi from '../../../../api/adminApi';
import './DashboardOverview.css';

const DashboardOverview = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await adminApi.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers || 0,
      icon: <FaUsers className="stat-icon" />,
      color: '#3498db',
      bgColor: '#ebf5fb'
    },
    {
      title: 'Destinations',
      value: stats.totalDestinations || 0,
      icon: <FaMapMarkerAlt className="stat-icon" />,
      color: '#2ecc71',
      bgColor: '#eafaf1'
    },
    {
      title: 'Active Bookings',
      value: stats.activeBookings || 0,
      icon: <FaCalendarCheck className="stat-icon" />,
      color: '#f39c12',
      bgColor: '#fef5e7'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue || 0}`,
      icon: <FaDollarSign className="stat-icon" />,
      color: '#9b59b6',
      bgColor: '#f4ecf7'
    }
  ];

  const recentActivities = [
    {
      icon: <FaCalendarCheck className="activity-icon" />,
      message: 'New booking for Maasai Mara',
      time: '2 hours ago',
      color: '#3498db'
    },
    {
      icon: <FaUserPlus className="activity-icon" />,
      message: 'New user registered',
      time: '5 hours ago',
      color: '#2ecc71'
    },
    {
      icon: <FaCreditCard className="activity-icon" />,
      message: 'Payment completed for Tokyo trip',
      time: '1 day ago',
      color: '#9b59b6'
    },
    {
      icon: <FaMapMarkerAlt className="activity-icon" />,
      message: 'New destination added: Paris',
      time: '2 days ago',
      color: '#e74c3c'
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of your SafariHub platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div 
              className="stat-icon-container"
              style={{ backgroundColor: stat.bgColor, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="activity-header">
          <h2>Recent Activity</h2>
          <FaClock className="header-icon" />
        </div>
        <div className="activity-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div 
                className="activity-icon-container"
                style={{ backgroundColor: activity.bgColor, color: activity.color }}
              >
                {activity.icon}
              </div>
              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;