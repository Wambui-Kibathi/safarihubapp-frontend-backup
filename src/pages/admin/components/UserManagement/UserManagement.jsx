import React, { useState, useEffect } from 'react';
import adminApi from '../../../../api/adminApi';
import { FaSearch, FaSync, FaUser, FaEnvelope, FaCog } from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingUser, setUpdatingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to load users: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter(user =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      setUpdatingUser(userId);
      await adminApi.updateUserRole(userId, newRole);
      // Refresh users list
      await fetchUsers();
    } catch (error) {
      alert('Failed to update user role: ' + error);
    } finally {
      setUpdatingUser(null);
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { label: 'Admin', color: '#e74c3c', bgColor: '#fadbd8' },
      guide: { label: 'Guide', color: '#f39c12', bgColor: '#fdebd0' },
      traveler: { label: 'Traveler', color: '#27ae60', bgColor: '#d5f4e6' }
    };
    
    const config = roleConfig[role] || { label: role, color: '#7f8c8d', bgColor: '#ecf0f1' };
    
    return (
      <span 
        className="role-badge"
        style={{ 
          backgroundColor: config.bgColor,
          color: config.color,
          borderColor: config.color
        }}
      >
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="user-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="section-header">
        <div className="header-title">
          <h1>User Management</h1>
          <p>Manage user accounts and roles across SafariHub</p>
        </div>
        <button onClick={fetchUsers} className="refresh-btn">
          <FaSync />
          Refresh
        </button>
      </div>

      {/* Search and Filters */}
      <div className="user-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="user-stats">
          <span>Total Users: {users.length}</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="user-info-cell">
                    <div className="user-avatar">
                      {user.profile_image_url ? (
                        <img src={user.profile_image_url} alt={user.full_name} />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user.full_name}</span>
                      <span className="user-id">ID: {user.id}</span>
                    </div>
                  </td>
                  <td className="user-contact">
                    <div className="contact-item">
                      <FaEnvelope />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td>
                    {getRoleBadge(user.role)}
                  </td>
                  <td>
                    <select 
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="role-select"
                      disabled={updatingUser === user.id}
                    >
                      <option value="traveler">Traveler</option>
                      <option value="guide">Guide</option>
                      <option value="admin">Admin</option>
                    </select>
                    {updatingUser === user.id && (
                      <FaCog className="updating-spinner" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users">
                  {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;