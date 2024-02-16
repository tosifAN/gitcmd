import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/auth';
import { useNavigate } from "react-router-dom";
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
import '../Style/Login.css';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        
        console.log('Login successful!', res.data);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate("/");
         // Display toast notification after 2 seconds
      setTimeout(() => {
        toast.success(res.data.message);
      }, 500);
   

      } else {
        toast.error("Something went wrong");
        setError('Wrong credentials. Please try again.');
      }
    } catch (error) {
      console.error("main hu error", error); 
      toast.error("Something went wrong");
      setError('Wrong credentials. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
        <div className="signup-container">
          <p className="signup-text">Not registered yet?</p>
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
