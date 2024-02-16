
import React, { useState,useEffect } from 'react';
import { useAuth } from '../../Context/auth';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Style/details.css'; // Import CSS for styling
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';






const Details = () => {
  // Define state variables for input values
  const [auth] = useAuth();
  const [code,setCode]=useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [instruction, setInstruction] = useState('');
  const [timing_of_test, setTiming] = useState('');
  const [marking_scheme, setMarkingScheme] = useState('');
  const navigate = useNavigate();

  // Load test code from localStorage when component mounts
  /*
  useEffect(() => {
    const cachedCode = localStorage.getItem('testCode');
    if (cachedCode) {
      setCode(cachedCode);
    }
  }, []);
*/

  // Save test code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('testCode', code);
  }, [code]);



  const handleFinalSubmit = async () => {
    try {

      if (!code || !title || !note || !instruction || !timing_of_test || !marking_scheme) {
        toast.error('Please fill in all fields');
        return;
      }


      // Prepare data to be sent to the server
      const testData = {
        email:auth.user.email,
        exam_code :code,
        title: title,
        note: note,
        instruction: instruction,
        timing_of_test: timing_of_test,
        marking_scheme: marking_scheme,
      };

      // Send a POST request to your backend server
      const response = await axios.post(
        'http://localhost:8080/api/v1/test/testing',
        testData
      );

      // Handle response if needed
      console.log('Data saved successfully:', response.data);

      // Navigate to the preview page
      navigate(`/createmanuallymcqs/user`);
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="details-container">
        <h1>Details of the Test</h1>
        <div className="input-section">
          <label htmlFor="exam_code">Code of the Test:</label>
          <input
            type="text"
            id="examcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="input-section">
          <label htmlFor="title">Title of the Test:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-section">
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-section">
          <label htmlFor="instruction">Instruction:</label>
          <textarea
            id="instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-section">
          <label htmlFor="timing">Timing of Test:</label>
          <input
            type="text"
            id="timing"
            value={timing_of_test}
            onChange={(e) => setTiming(e.target.value)}
            required
          />
        </div>
        <div className="input-section">
          <label htmlFor="markingScheme">Marking Scheme:</label>
          <textarea
            id="markingScheme"
            value={marking_scheme}
            onChange={(e) => setMarkingScheme(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="button-section">
          <button onClick={handleFinalSubmit} className="submit-button">
            Enter
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;







































/*
import React, { useState } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Style/details.css'; // Import CSS for styling

const Details = () => {
  // Define state variables for input values
  const [code,setCode]=useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [instruction, setInstruction] = useState('');
  const [timing_of_test, setTiming] = useState('');
  const [marking_scheme, setMarkingScheme] = useState('');
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    try {
      // Prepare data to be sent to the server
      const testData = {
        exam_code :code,
        title: title,
        note: note,
        instruction: instruction,
        timing_of_test: timing_of_test,
        marking_scheme: marking_scheme,
      };

      // Send a POST request to your backend server
      const response = await axios.post(
        'http://localhost:8080/api/v1/test/testing',
        testData
      );

      // Handle response if needed
      console.log('Data saved successfully:', response.data);

      // Navigate to the preview page
      navigate('/createmanuallymcqs/user');
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="details-container">
        <h1>Details of the Test</h1>
        <div className="input-section">
          <label htmlFor="exam_code">Code of the Test:</label>
          <input
            type="text"
            id="examcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="input-section">
          <label htmlFor="title">Title of the Test:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-section">
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <div className="input-section">
          <label htmlFor="instruction">Instruction:</label>
          <textarea
            id="instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          ></textarea>
        </div>
        <div className="input-section">
          <label htmlFor="timing">Timing of Test:</label>
          <input
            type="text"
            id="timing"
            value={timing_of_test}
            onChange={(e) => setTiming(e.target.value)}
          />
        </div>
        <div className="input-section">
          <label htmlFor="markingScheme">Marking Scheme:</label>
          <textarea
            id="markingScheme"
            value={marking_scheme}
            onChange={(e) => setMarkingScheme(e.target.value)}
          ></textarea>
        </div>
        <div className="button-section">
          <button onClick={handleFinalSubmit} className="submit-button">
            Enter
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;





*/
























































