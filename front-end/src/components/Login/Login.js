import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:4000/api/auth/login';
      const { data: res } = await axios.post(url, data);
      
      // Set the received token in local storage
      localStorage.setItem('token', res.data);

      // Display alert if the user logs in as an admin
      if (res.userType === 'admin') {
        navigate('/admin-profile');
        window.alert('Admin logged in successfully!');
      } else {
        window.alert('User logged in successfully!');
        navigate('/profile');
      }
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
