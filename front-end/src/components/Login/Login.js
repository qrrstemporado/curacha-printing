import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://curacha-printing-backend.onrender.com/api/auth/login';
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
      navigate('/profile');  // Use navigate for navigation
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <div className="left">
          <Link to="/">
            <button type="button" className="back-btn">
              ◀
            </button>
          </Link>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className="white-btn">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form-container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="green-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
