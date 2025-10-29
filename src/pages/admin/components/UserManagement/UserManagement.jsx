import React, { useState, useEffect } from 'react';
import adminApi from '../../../../api/adminApi';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminApi.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await adminApi.updateUserRole(userId, newRole);
      // Refresh users list
      fetchUsers();
    } catch (error) {
      alert('Failed to update user role: ' + error);
    }
  };

  if (loading) {
    return <div className="user-management-loading">Loading users...</div>;
  }

  return (
    <div className="user-management">
      <div className="section-header">
        <h1>User Management</h1>
        <p>Manage user accounts and roles</p>
      </div>

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className="role-select"
                  >
                    <option value="traveler">Traveler</option>
                    <option value="guide">Guide</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button className="btn-view">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;