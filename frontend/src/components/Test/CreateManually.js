import React, { useState,useEffect } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import { useNavigate } from 'react-router-dom';
import '../../Style/CreateMCQsPage.css';
import axios from 'axios';

const CreateMCQsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cachedCode = localStorage.getItem('testCode');
    if (cachedCode) {
      setCode(cachedCode);
    }
  }, []);


  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    if (index >= 0 && index < questions.length) {
      const newQuestions = [...questions];
      newQuestions[index].options[optionIndex] = value;
      setQuestions(newQuestions);
    }
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].answerIndex = value !== null ? value : 0;
    setQuestions(newQuestions);
  };

  const handleSaveAndNext = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        answerIndex: 0,
      },
    ]);
  };

  const handleFinalSubmit = async () => {
    try {
      // Prepare data to be sent to the server
      const testData = {
        exam_code : code,
        questions: questions.map((q) => ({
          question: q.question,
          option1: q.options[0],
          option2: q.options[1],
          option3: q.options[2],
          option4: q.options[3],
          answerIndex: q.answerIndex,
        })),
      };

      // Send a put request to your backend server
      const response = await axios.put('http://localhost:8080/api/v1/test/testingsave', testData);

      // Handle response if needed
      console.log('paper updated successfully:', response.data);

      // Navigate to the preview page
      navigate('/createmanuallymcqs/user/preview');
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-mcqs-container">
        <h1>Number of Question Added: {questions.length}</h1>
        {questions.map((question, index) => (
          <div key={`question-${index}`}>
            <form key={`form-${index}`}>
              <input
                type="text"
                placeholder='Write the Question here...'
                value={question.question}
                onChange={(e) => handleQuestionChange(e, index)}
              />
              {question.options.map((option, optionIndex) => (
                <input
                  key={`option-${index}-${optionIndex}`}
                  placeholder='Write the options here...'
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                />
              ))}
              <select
                value={question.answerIndex}
                onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
              >
                {question.options.map((option, optionIndex) => (
                  <option key={`option-${index}-${optionIndex}`} value={optionIndex}>
                    Option {optionIndex + 1}
                  </option>
                ))}
              </select>
            </form>
          </div>
        ))}
        <div className="btn-group">
          <button type="button" onClick={handleSaveAndNext}>
           Add/Save and Next
          </button>
        </div>
        <div className="btn-group">
          <button type="button" onClick={handleFinalSubmit}>
            Preview Test Paper
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateMCQsPage;



/*
const handleFinalSubmit = async () => {
    try {
      // Prepare data to be sent to the server
      const testData = {
        exam_code : "123abc",
        questions: questions.map((q) => ({
          question: q.question,
          option1: q.options[0],
          option2: q.options[1],
          option3: q.options[2],
          option4: q.options[3],
          answerIndex: q.answerIndex,
        })),
      };

      // Send a put request to your backend server
      const response = await axios.put('http://localhost:8080/api/v1/test/testingsave', testData);

      // Handle response if needed
      console.log('paper updated successfully:', response.data);

      // Navigate to the preview page
      navigate('/createmanuallymcqs/user/preview');
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
    }
  };
/*/