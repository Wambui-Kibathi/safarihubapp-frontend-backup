import React, { useState } from 'react';
import './GuideProfile.css';

const GuideProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const [guideInfo, setGuideInfo] = useState({
    name: 'David Kimani',
    email: 'david.kimani@email.com',
    phone: '+254 700 123 456',
    location: 'Nairobi, Kenya',
    experience: '8 years',
    languages: 'English, Swahili, French',
    specialties: 'Wildlife Safari, Cultural Tours',
    joinedDate: 'January 10, 2020'
  });

  const [editForm, setEditForm] = useState({ ...guideInfo });

  const subscriptionPlan = {
    current: 'Premium',
    price: '$29/month',
    nextBilling: 'Dec 15, 2024',
    features: ['Unlimited trip listings', 'Priority support', 'Advanced analytics']
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...guideInfo });
  };

  const handleSave = () => {
    setGuideInfo({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...guideInfo });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="guide-profile">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Guide Profile</h1>
          <p className="profile-subtitle">Manage your guide information and subscription</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {guideInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <div className="profile-info">
              {!isEditing ? (
                <>
                  <div className="info-group">
                    <label>Full Name</label>
                    <p>{guideInfo.name}</p>
                  </div>
                  <div className="info-group">
                    <label>Email</label>
                    <p>{guideInfo.email}</p>
                  </div>
                  <div className="info-group">
                    <label>Phone</label>
                    <p>{guideInfo.phone}</p>
                  </div>
                  <div className="info-group">
                    <label>Location</label>
                    <p>{guideInfo.location}</p>
                  </div>
                  <div className="info-group">
                    <label>Experience</label>
                    <p>{guideInfo.experience}</p>
                  </div>
                  <div className="info-group">
                    <label>Languages</label>
                    <p>{guideInfo.languages}</p>
                  </div>
                  <div className="info-group">
                    <label>Specialties</label>
                    <p>{guideInfo.specialties}</p>
                  </div>
                  <div className="info-group">
                    <label>Member Since</label>
                    <p>{guideInfo.joinedDate}</p>
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
                  <div className="form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={editForm.experience}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Languages</label>
                    <input
                      type="text"
                      name="languages"
                      value={editForm.languages}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Specialties</label>
                    <input
                      type="text"
                      name="specialties"
                      value={editForm.specialties}
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

          <div className="subscription-card">
            <h2 className="subscription-title">Subscription Plan</h2>
            <div className="plan-info">
              <div className="plan-current">
                <span className="plan-name">{subscriptionPlan.current}</span>
                <span className="plan-price">{subscriptionPlan.price}</span>
              </div>
              <p className="next-billing">Next billing: {subscriptionPlan.nextBilling}</p>
              <div className="plan-features">
                <h4>Features:</h4>
                <ul>
                  {subscriptionPlan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button className="payment-button" onClick={openPaymentModal}>
                Update Payment Method
              </button>
            </div>
          </div>
        </div>

        {isPaymentModalOpen && (
          <div className="modal-overlay" onClick={closePaymentModal}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Update Payment Method</h2>
                <button className="close-button" onClick={closePaymentModal}>×</button>
              </div>
              <div className="modal-content">
                <p>Update your payment method for subscription billing.</p>
                <div className="payment-form">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="**** **** **** 1234" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
                <button className="confirm-payment">Update Payment Method</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideProfile;