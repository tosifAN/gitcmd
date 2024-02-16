import React, { useState } from "react";
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const SubmitUserBlog = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [authors, setAuthor] = useState("");
  const [additional_links, setAdditionallinks] = useState("");
  const [others, setOthers] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    try {
      const fullName = auth?.user?.fullName;
      const email = auth?.user?.email;
      const userId = auth?.user?._id;
      const stars = 0;
      // Send a POST request to the server with blog data
      const response = await axios.post('http://localhost:8080/api/v1/blog/adduserblog', {
        fullName: fullName,
        email: email,
        title: title,
        blog: blog,
        authors: authors,
        additional_links: additional_links,
        others: others,
        stars: stars,
        userId:userId,
      });
  
      console.log('Blog created successfully:', response.data);
  
      // Navigate to the confirmation or preview page
      navigate(`/`);
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
  
      // Example: Display a user-friendly error message
      if (error.response && error.response.status === 400) {
        console.error('Validation error. Please check your input.');
        // You could show a notification to the user
      } else {
        console.error('An unexpected error occurred. Please try again later.');
        // You could show a notification to the user
      }
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="details-container">
        <h1>Create A Project</h1>
        <div className="input-section">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-section">
          <label htmlFor="blog">Blog</label>
          <textarea
            id="blog"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-section">
          <label htmlFor="authors">Authors:</label>
          <textarea
            id="authors"
            value={authors}
            onChange={(e) => setAuthor(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-section">
          <label htmlFor="additionallinks">Additional Links:</label>
          <input
            type="text"
            id="additionallinks"
            value={additional_links}
            onChange={(e) => setAdditionallinks(e.target.value)}
            required
          />
        </div>
        <div className="input-section">
          <label htmlFor="others">Others:</label>
          <textarea
            id="others"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="button-section">
          <button onClick={handleFinalSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubmitUserBlog;
