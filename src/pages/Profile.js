// src/pages/Profile.js
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.css';

export default function Profile() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    skinType: '',
    skinConcern: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setIsLogin(!searchParams.has('signup'));
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // To determine endpoint based on login/signup state
      const endpoint = isLogin ? 'http://localhost:5001/api/auth/login' : 'http://localhost:5001/api/auth/signup';
      
      // Prepare request configuration
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      //To  Make the API call
      const { data } = await axios.post(endpoint, formData, config);
      
      // Storing token and navigate to schedule page
      localStorage.setItem('token', data.token);
      navigate('/schedule');
    } catch (error) {
      // Detailed error handling
      console.error('Authentication Error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        setError(error.response.data.msg || 'An error occurred during authentication');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              value={formData.age}
              onChange={handleInputChange}
            />
            <select
              name="skinType"
              required
              value={formData.skinType}
              onChange={handleInputChange}
            >
              <option value="">Select Skin Type</option>
              <option value="Oily">Oily</option>
              <option value="Dry">Dry</option>
              <option value="Sensitive">Sensitive</option>
              <option value="Combo">Combo</option>
              <option value="Acne prone">Acne prone</option>
              <option value="Don't know">Don't know</option>
            </select>
            <input
              type="text"
              name="skinConcern"
              placeholder="Skin Concern (acne, aging, etc.)"
              required
              value={formData.skinConcern}
              onChange={handleInputChange}
            />
          </>
        )}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength="6"
          value={formData.password}
          onChange={handleInputChange}
        />
        
        <button type="submit" className={styles.submitButton}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <button
        onClick={() => setIsLogin(!isLogin)}
        className={styles.toggleButton}
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
}