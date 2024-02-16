import React, { useState } from 'react';
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer

import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');
  const [fullName, setFullName] = useState('');
  const [profession, setProfession] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signing up with:', email, password, organization, country, fullName, profession);
    
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/register', {
        fullName,
        email,
        password,
        organization,
        country,
        profession
      });

      if (res.data.success) {
        toast.success(res.data.message);
        console.log("register successfuly");
        navigate("/login");

        setTimeout(() => {
          toast.success(res.data.message);
        }, 500);
      } else {
        toast.error(res.data.message);
        console.log("toast error");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
      console.log("again toast error");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-control">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
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
          <div className="form-control">
            <label htmlFor="organization">Organization</label>
            <input
              type="text"
              id="organization"
              placeholder="Enter your organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select your country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="China">China</option>
              <option value="Others1">Others</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="profession">Profession</label>
            <select
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            >
              <option value="">Select your profession</option>
              <option value="Student">Student</option>
              <option value="SDE">SDE</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Teacher">Teacher</option>
              <option value="Others2">Others</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="login-link-container">
          <p className="login-link-text">Already have an account?</p>
          <a href="/login" className="login-link">
            Login
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
