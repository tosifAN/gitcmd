import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
import '../Style/HomeBlog.css';

const Blogs = () => {
  const [blogTitles, setBlogTitles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/blog/getallblogs')
      .then(response => {
        setBlogTitles(response.data);
      })
      .catch(error => {
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
                      <li key={index} className="blog-item">
                        {/* Link to the second page (Blog) with blog ID as parameter */}
                        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                      </li> 
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

export default Blogs;
