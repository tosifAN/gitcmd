import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import '../../Style/Update.css'; // Import external CSS file for styling
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer

import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    if (auth?.user) { // Check if auth.user is not null or undefined
      const { email, fullName, organization, profession, country } = auth.user; // Access properties if user is available
      setName(fullName);
      setOrganization(organization);
      setEmail(email);
      setProfession(profession);
      setCountry(country);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
        fullName,
        email,
        password,
        organization,
        profession,
        country,
      });
      if (data?.errro) {
        console.log(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        console.log("Profile Updated Successfully");
        setTimeout(() => {
          toast.success("Profile Updated Successfully");
        }, 500);
        navigate("/dashboard/user");
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <Navbar/>
      <ToastContainer /> 
      <div className="update-page">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">USER PROFILE</h4>
            <div className="form-group">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Your Name"
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email"
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="form-control"
                placeholder="Enter Your Organization"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="form-control"
                placeholder="Enter Your Profession"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
                placeholder="Enter Your Country"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              UPDATE
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Profile;
