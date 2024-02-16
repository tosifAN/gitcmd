import React, { useState, useEffect } from "react";
import Navbar from "../../parts/Navbar";
import Footer from "../../parts/Footer";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Style/Dashboard.css";

const Dashboard = () => {
  const [auth] = useAuth();
  const [testCreated, setTestCreated] = useState(0);
  const [blogCreated, setBlogCreated] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testTitles, setTestTitles] = useState([]);
  const [blogTitles, setBlogTitles] = useState([]);

  useEffect(() => {
    fetchTestCreated();
  }, [auth]);

  const fetchTestCreated = async () => {
    if (!auth || !auth.user || !auth.user.email) {
      console.log("Authentication information is missing.");
      setLoading(false);
      return;
    }

    try {
      const email = auth.user.email;
      console.log("Email:", email);

      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/testcreated/show",
        {
          params: { email },
        }
      );
      const response2 = await axios.get(
        "http://localhost:8080/api/v1/auth/getUserBlogInfo",
        {
          params: { email },
        }
      );
      setBlogTitles(response2.data.titles);
      setBlogCreated(response2.data.titles.length);
      setTestTitles(response.data.titles);
      setTestCreated(response.data.titles.length);
      console.log("Length is ", response.data.titles.length);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching test data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <h1 className="dashboard-title">Your Profile</h1>
              <div className="profile-details">
                <h3 className="profile-id">Id : {auth?.user?._id}</h3>
                <h3 className="profile-name">
                  FullName : {auth?.user?.fullName}
                </h3>
                <h3 className="profile-email">Email : {auth?.user?.email}</h3>
                <h3 className="profile-organization">
                  Organization : {auth?.user?.organization}
                </h3>
                <h3 className="profile-profession">
                  Profession : {auth?.user?.profession}
                </h3>
                <h3 className="profile-country">
                  Country : {auth?.user?.country}
                </h3>
                <Link
                  to="/update-profile/user"
                  className="update-profile-button"
                >
                  Update Profile
                </Link>
              </div>
            </div>
            <div className="card mt-3">
              <h2 className="test info">Test Papers Created</h2>
              <p>
                You have created {testCreated} test papers. Keep up the great
                work!
              </p>
              <ul>
                {testTitles &&
                  testTitles.map((title, index) => (
                    <li key={index}>{title}</li>
                  ))}
              </ul>
            </div>
            <div className="card mt-3">
              <h2 className="blog info">Blogs Created</h2>
              <p>
                You have created {blogCreated} blogs. Keep up the great
                work!
              </p>
              <ul>
                {blogTitles &&
                  blogTitles.map((title, index) => (
                    <li key={index}>{title}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

/*


import React, { useState, useEffect } from "react";
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import { useAuth } from '../../Context/auth';
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../Style/Dashboard.css'; // Import external CSS file for styling

const Dashboard = () => {
  const [auth] = useAuth();
  const [testCreated, setTestCreated] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestCreated();
  }, [auth]); // Fetch data whenever auth changes

  const fetchTestCreated = async () => {
    if (!auth || !auth.user) return; // Check if auth or auth.user is null
    try {
      const email = auth.user.email;
      console.log(auth.user);
      const response1 = await axios.get("http://localhost:8080/api/v1/auth/testcreated", { params: { email } });
      console.log(response1.data.testCreated);
      setTestCreated(response1.data.testCreated);
      setLoading(false); // Update loading state once data is fetched

      //code to show the title to test created

      const response2 = await axios.get("http://localhost:8080/api/v1/auth/testcreated/show", { params: { email } });
      console.log(response2.data.titles);
      

    } catch (error) {
      console.log(error);
      setLoading(false); // Update loading state in case of error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <h1 className="dashboard-title">Your Profile</h1>
              <div className="profile-details">
                <h3 className="profile-name">FullName : {auth?.user?.fullName}</h3>
                <h3 className="profile-email">Email : {auth?.user?.email}</h3>
                <h3 className="profile-organization">Organization : {auth?.user?.organization}</h3>
                <h3 className="profile-profession">Profession : {auth?.user?.profession}</h3>
                <h3 className="profile-country">Country : {auth?.user?.country}</h3>
                <Link to="/update-profile/user" className="update-profile-button">Update Profile</Link> 
              </div>
            </div>
            <div className="card mt-3">
              <h2 className="/update-profile">Test Papers Created</h2>
              <p>You have created {testCreated} test papers. Keep up the great work!</p>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

*/
