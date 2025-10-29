import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ProfileImageUpload from '@/components/common/ProfileImageUpload/ProfileImageUpload';
import './UserProfile.css';

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  const handleImageUpdate = (newImageUrl) => {
    updateUser({ ...user, profile_image_url: newImageUrl });
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <span className="user-role-badge">{user?.role}</span>
      </div>
      
      <div className="profile-content">
        <div className="profile-image-section">
          <ProfileImageUpload
            currentImage={user?.profile_image_url}
            onImageUpdate={handleImageUpdate}
            userId={user?.id}
          />
        </div>
        
        <div className="profile-details">
          <h2>{user?.full_name}</h2>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          {/* Add more profile fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;