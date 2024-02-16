import React, { useState, useEffect } from "react";
import { useAuth } from '../../Context/auth';
import axios from 'axios';

import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';;
//import "./Style/Pricing.css"; // Import your CSS file for specific pricing page styling

//brace import should be on the top

const ShowUserBlogs = () => {
  const [blogTitles, setBlogTitles] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    // Make Axios request to fetch blog titles
    axios.get('http://localhost:8080/api/v1/blog/getuserblogs', {
      params: { email: auth?.user?.email }
    })
      .then(response => {
        // Handle successful response
        console.log(auth?.user?.email);
        console.log(response.data);
        setBlogTitles(response.data); // Assuming response.data is an array of blog titles
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching blog titles:', error);
      });
  }, []); 

  return (
    <>
      <Navbar />
      <div className="container-fluid m-3 p-3 blog-container">
        <div className="row">
          <div className="col-md-12">
            <div className="blog-card">
              <div className="card">
                {blogTitles.length === 0 ? (
                  <p className="no-blogs">No blogs available right now.</p>
                ) : (
                  <ul className="blog-list">
                    {blogTitles.map((blog, index) => (
                      <li key={index} className="blog-item">{blog.title}</li> 
                    ))}
                  </ul>
                )}
              </div>       
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowUserBlogs;
