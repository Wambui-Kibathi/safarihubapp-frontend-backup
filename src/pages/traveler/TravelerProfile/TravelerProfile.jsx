import React, { useState } from 'react';
import './TravelerProfile.css';

const TravelerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    joinedDate: 'March 15, 2023',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA'
  });

  const [editForm, setEditForm] = useState({ ...userInfo });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...userInfo });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="traveler-profile">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account information</p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          <div className="profile-info">
            {!isEditing ? (
              <>
                <div className="info-group">
                  <label>Full Name</label>
                  <p>{userInfo.name}</p>
                </div>
                <div className="info-group">
                  <label>Email</label>
                  <p>{userInfo.email}</p>
                </div>
                <div className="info-group">
                  <label>Phone</label>
                  <p>{userInfo.phone}</p>
                </div>
                <div className="info-group">
                  <label>Location</label>
                  <p>{userInfo.location}</p>
                </div>
                <div className="info-group">
                  <label>Member Since</label>
                  <p>{userInfo.joinedDate}</p>
                </div>
                <button className="edit-button" onClick={handleEdit}>
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-actions">
                  <button className="save-button" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerProfile;