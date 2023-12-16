import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: 'user', // Default to 'user'
        secretKey: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const url = 'http://localhost:4000/api/users';
      
          // Check if the user is an admin and validate the secret key
          if (data.userType === 'admin' && data.secretKey !== 'CPE025SOFTDES') {
            setError('Invalid Admin Credentials');
            return;
          }
      
          // Prepare the data to be sent to the server
          const postData = {
            ...data,
            // Omit secretKey from the data if it's not admin
            ...(data.userType === 'admin' ? {} : { secretKey: undefined }),
          };
      
          const { data: res } = await axios.post(url, postData);
          navigate('/login');
          console.log(res.message);
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
        <div className="signupContainer">
            <div className="signupFormContainer">
                <div className="left">
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className="white-btn">
                            Sign in
                        </button>
                    </Link>
                    <Link to="/">
                        <button type="button" className="back-btn1">
                            ◀
                        </button>
                    </Link>
                </div>
                <div className="right">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <div className="radio-container">
                            <p>Register as</p>
                            <input
                                type="radio"
                                name="userType"
                                value="user"
                                checked={data.userType === 'user'}
                                onChange={handleChange}
                            />{" "}
                            User
                            <input
                                type="radio"
                                name="userType"
                                value="admin"
                                checked={data.userType === 'admin'}
                                onChange={handleChange}
                            />{" "}
                            Admin
                        </div>
                        {data.userType === 'admin' && (
                            <input
                            type="text"
                            placeholder="Secret Key"
                            name="secretKey"
                            onChange={handleChange}
                            value={data.secretKey}
                            required={data.userType === 'admin'}
                            className="input"
                            />
                        )}
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="input"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className="input"
                        />
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
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
