import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Traveler'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const data = {
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase()
      };

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Auto-login after successful registration
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginResult.message || 'Auto-login failed');
      }

      // Store authentication data
      localStorage.setItem('token', loginResult.token);
      localStorage.setItem('user', JSON.stringify(loginResult.user));

      // Update auth context
      const loginContextResult = await login({
        email: formData.email,
        password: formData.password
      });

      if (loginContextResult.success) {
        // Redirect based on user role from login response
        const userRole = loginResult.user.role;
        if (userRole === 'guide') {
          navigate('/guide/dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/traveler/dashboard'); // Default for travelers
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register-card">
        <h1 className="register-title">Join SafariHub</h1>
        <p className="register-subtitle">Create your account to start exploring</p>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Traveler">Traveler</option>
              <option value="Guide">Guide</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;