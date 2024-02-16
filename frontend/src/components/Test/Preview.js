import React, { useState, useEffect } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/auth';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';


const Preview = () => {
  const [code, setCode] = useState("");
  const [testData, setTestData] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/test/getting/${code}`
      );
      setTestData(response.data);
    } catch (error) {
      console.error('Error in receiving data:', error);
    }
  };


  useEffect(() => {
    // Fetch data from backend when component mounts
    const cachedCode = localStorage.getItem('testCode');
    if (cachedCode) {
      setCode(cachedCode);
    }
    console.log(code);
    fetchData();
  }, [code, fetchData]); // Include code and fetchData in the dependency array
  

  
  const handleFinalSubmit = async () => {
    try {
      const email = auth.user.email;
      console.log(auth.user);
      const { response } = await axios.put("http://localhost:8080/api/v1/auth/testcreatedupdate", {
       email : email,  
      });
      console.log("your paper is submited");
      setTimeout(() => {
        toast.success("Test Paper Successfully Created");
      }, 500);
      navigate('/dashboard/user');
    } catch (error) {
      // Handle errors
      console.error('Error in navigating:', error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      {testData && (
        <div className="preview-questions">
          <h1>Title of the Test: {testData.title}</h1>
          <h1>Number of Questions: {testData.questions.length}</h1>
          <div>
            {testData.questions.map((question, index) => (
              <div key={question._id}>
                <h2>Question {index + 1}:</h2>
                <p>{question.question}</p>
                <ul>
                  <li>{question.option1}</li>
                  <li>{question.option2}</li>
                  <li>{question.option3}</li>
                  <li>{question.option4}</li>
                </ul>
                <p>Correct Answer: {question[`option${question.answerIndex + 1}`]}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="button" onClick={handleFinalSubmit}>Submit TestPaper</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Preview;
