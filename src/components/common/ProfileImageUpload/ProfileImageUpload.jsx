import React, { useState } from 'react';
import uploadService from '../../../services/uploadService';
import './ProfileImageUpload.css';

const ProfileImageUpload = ({ currentImage, onImageUpdate, userId }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setUploading(true);
    try {
      const result = await uploadService.uploadProfileImage(file);
      setPreviewUrl(result.image_url);
      if (onImageUpdate) {
        onImageUpdate(result.image_url);
      }
    } catch (error) {
      alert('Upload failed: ' + error);
      setPreviewUrl(currentImage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-image-upload">
      <div className="image-container">
        <img 
          src={previewUrl || '/default-avatar.png'} 
          alt="Profile" 
          className="profile-image"
        />
        {uploading && (
          <div className="upload-overlay">
            <div className="upload-spinner"></div>
            <span>Uploading...</span>
          </div>
        )}
      </div>
      
      <label className="upload-button">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          style={{ display: 'none' }}
        />
        {uploading ? 'Uploading...' : 'Change Photo'}
      </label>
    </div>
  );
};

export default ProfileImageUpload;