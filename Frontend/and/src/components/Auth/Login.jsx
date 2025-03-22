import React, { useState, useEffect } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [API_BASE_URL, setApiBaseUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch('/base_data.json');
        const data = await response.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (error) {
        console.error('Error loading API_BASE_URL:', error);
      }
    };

    fetchBaseUrl();
  }, []);

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setError('');
    setShowOtpField(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      if (response.status === 200) {
        alert(`Welcome back, ${response.data.name}!`);
        navigate('/Dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.response || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (!showOtpField) {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/confirm-email`, { name, usn, email });
        if (response.status === 200) {
          setShowOtpField(true);
          alert('OTP sent to your email. Please verify.');
        }
      } catch (err) {
        setError(err.response?.data?.response || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, { name,usn,email,password, otp });
        if (response.status === 200) {
          alert('Registration successful! You can now sign in.');
          toggleMode();
        }
      } catch (err) {
        setError(err.response?.data?.response || 'Invalid OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <video id="background-video" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
        <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
          {isSignUp ? (
            <form onSubmit={handleSignUp}>
              <h1 className="hh1">Create Account</h1>
              <span>Use your email for registration</span>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="USN" value={usn} onChange={(e) => setUsn(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {showOtpField && (
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              )}
              <button type="submit" disabled={loading}>{loading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Sign Up'}</button>
              {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            </form>
          ) : (
            <form onSubmit={handleSignIn}>
              <h1 className="hh1">Sign In</h1>
              <span>Use your email and password</span>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Link to="/forgotpass">Forgot Your Password?</Link>
              <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
              {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            </form>
          )}
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className={`toggle-panel ${isSignUp ? 'toggle-left' : 'toggle-right'}`}>
              {isSignUp ? (
                <>
                  <h1 className="hh1">Welcome Back!</h1>
                  <p>Enter your personal details to use all of the site features</p>
                  <button onClick={toggleMode}>Sign In</button>
                </>
              ) : (
                <>
                  <h1 className="hh1">Hello, Friend!</h1>
                  <p>Register with your personal details to use all of the site features</p>
                  <button onClick={toggleMode}>Sign Up</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
