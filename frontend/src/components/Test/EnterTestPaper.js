import React, { useState, useEffect } from 'react';
import '../../Style/StudentHome.css'; // Import CSS file for styling
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';

function TestPage() {
  const [fullName, setFullName] = useState('');
  const [exam_code, setTestCode] = useState('');
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('testCode', exam_code);
  }, [exam_code]);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleTestCodeChange = (event) => {
    setTestCode(event.target.value);
  };

  const handleEnterTestClick = async () => {
    try {
      const testData = {
        fullname: fullName,
        email: auth.user.email,
        exam_code: exam_code,
      };

      const ans = await axios.get("http://localhost:8080/api/v1/test/testpaperexist", {
        params: { exam_code, email : auth?.user?.email }
      });
      
      console.log(ans.data.success);
      console.log(ans.data.copied);
      console.log(auth.user.email);

      if (!ans.data.success) {
        console.log("Wrong Test Paper Code");
        toast.error("Wrong Test Paper Code"); // Notify user
        return; // Don't proceed if test code is wrong
      }
      
      if (ans.data.copied) {
        console.log("You Already Submitted");
        toast.error("You Already Submitted"); // Notify user
        return; // Don't proceed if test code is wrong
      }
   
      const response = await axios.post(
        'http://localhost:8080/api/v1/test/testpaperstudent',
        testData
      );

      console.log('Data saved successfully:', response.data);

      navigate('./testpaper');
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error("Error entering the test. Please try again."); // Notify user
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="test-page-container">
        <h1>Enter Your Full Name and Test Code</h1>
        <div className="input-container">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="testCode">Test Code:</label>
          <input
            type="text"
            id="testCode"
            value={exam_code}
            onChange={handleTestCodeChange}
            className="input-field"
          />
        </div>
        <button onClick={handleEnterTestClick} className="enter-button">
          Enter the Test
        </button>
      </div>
      <Footer />
    </>
  );
}

export default TestPage;


















/*
import React, { useState,useEffect } from 'react';
import '../../Style/StudentHome.css'; // Import CSS file for styling
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';


function TestPage() {
  const [fullName, setFullName] = useState('');
  const [testCode, setTestCode] = useState('');
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('testCode', testCode);
  }, [testCode]);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleTestCodeChange = (event) => {
    setTestCode(event.target.value);
  };

  const handleEnterTestClick  = async () =>  {
    // Handle the logic for entering the test
    try {
      // Prepare data to be sent to the server
      const testData = {
        fullname:fullName,
        email:auth.user.email,
        exam_code :testCode,
      };
      

      // Send a POST request to your backend server
      const response = await axios.post(
        'http://localhost:8080/api/v1/test/testpaperstudent',
        testData
      );

      // Handle response if needed
      console.log('Data saved successfully:', response.data);

      navigate('./testpaper')
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
    }};

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="test-page-container">
        <h1>Enter Your Full Name and Test Code</h1>
        <div className="input-container">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="testCode">Test Code:</label>
          <input
            type="text"
            id="testCode"
            value={testCode}
            onChange={handleTestCodeChange}
            className="input-field"
          />
        </div>
        <button onClick={handleEnterTestClick} className="enter-button">
          Enter the Test
        </button>
      </div>
      <Footer />
    </>
  );
}

export default TestPage;
*/
