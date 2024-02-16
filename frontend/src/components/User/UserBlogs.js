import React, { useState } from 'react';
import { useAuth } from '../../Context/auth';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import '../../Style/Options.css'; // Import CSS file for styling
import { useNavigate } from "react-router-dom";



const UserBlogs = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  
  const handleSubmitBlog = () => {
  
    console.log(auth?.user);
    navigate("/user/submitblogs");
  };

  const handlePersonalSubmittedBlogs = () => {
    // Logic for creating MCQs through PDF
    navigate("/user/personalsubmittedblogs");
  };

  return (
    <>
      <Navbar />
      <div className="container"> {/* Use className to apply CSS classes */}
        <h1 className="title">Blogs</h1>
        <div style={{ textAlign: 'center' }}>
          <button className="button" onClick={handleSubmitBlog}>Create a Blog</button>
          <button className="button" onClick={handlePersonalSubmittedBlogs}>Your Personal Created Blogs</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserBlogs;
