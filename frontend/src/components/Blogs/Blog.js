import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    authors: '',
    createdAt: '',
    blog: ''
  });
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("tosif it is");
        const response = await axios.get(`http://localhost:8080/api/v1/blog/getspecficblog?blogId=${id}`);
        const blogData = getBlogDataFromResponse(response.data);
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, id);

  const getBlogDataFromResponse = (responseData) => {
    if (Array.isArray(responseData) && responseData.length > 0) {
      return responseData[0];
    }
    return responseData;
  };

  return (
    <>
      <Navbar />
      <div className="center-content">
        <div>
          <h1>Blog title : {blog.title}</h1>
          <p>Blog : {blog.blog}</p>
          <h1>Stars : {blog.stars}</h1>
          <p>Authors : {blog.authors}</p>
          <p>Created AT : {blog.createdAt}</p>
          <p>Updated AT : {blog.updatedAt}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
