import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import '../../Style/TestPaper.css';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

function TestPaper() {
  const [examCode, setExamCode] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0); // Track user's score
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  
  useEffect(() => {
    document.documentElement.requestFullscreen();
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/test/testpaperquestions", {
          params: { exam_code: examCode }
        });
        if (response.data.success && response.data.exampaper && response.data.exampaper.questions) {
          setQuestions(response.data.exampaper.questions.map(q => ({
            ...q,
            options: [q.option1, q.option2, q.option3, q.option4]
          })));
        } else {
          console.error('Error: Paper data not found');
        }
      } catch (error) {
        console.error('Error in receiving data:', error);
      }
    };

    const cachedCode = localStorage.getItem('testCode');
    if (cachedCode) {
      setExamCode(cachedCode);
    }
    fetchData();

    // Event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [examCode]);

  // Function to handle visibility change
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // User switched tabs or minimized window
      // You can add your logic here, such as showing a reminder message
      toast.warn("Please focus on the test! Switching tabs or minimizing the window may lead to disqualification.");
    }
  };


  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption('');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const updatedQuestions = questions.map((q, index) => ({
        ...q,
        isCorrect: q.options[q.answerIndex] === selectedOption, // Check if selected option is correct
      }));

      const userScore = updatedQuestions.reduce((acc, q) => acc + (q.isCorrect ? 1 : 0), 0);

      // Update the user's score
      setScore(userScore);
      const email = auth.user.email;
      const testData = {
        exam_code: examCode,
        email:email,
        questions: updatedQuestions.map((q) => ({
          question: q.question,
          options: q.options,
          answerIndex: q.answerIndex,
         // selectedOption: q.isCorrect ? selectedOption : '', // Store selected option
         // isCorrect: q.isCorrect,
        })),
        score: userScore, // Include user's score in the request
      };

      // Send test data to backend for storage
      const response = await axios.put('http://localhost:8080/api/v1/test/testpaperstudentupdate', testData);
      console.log('paper updated successfully:', response.data);
      setSubmitted(true);
      console.log('Test Submitted!');
      setTimeout(() => {
        toast.success("Test Paper Successfully Submitted!");
      }, 500);
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="test-paper-container">
        <h1>Test Paper Title</h1>
        <p>Description of the test paper goes here.</p>
        <div className="note">
          <p>Note: Please choose the most appropriate option for each question.</p>
        </div>
        {questions.length > 0 && questions[currentQuestionIndex] && (
          <div className="question-container">
            <h2>Question {currentQuestionIndex + 1}:</h2>
            <p>{questions[currentQuestionIndex].question}</p>
            <form>
              {questions[currentQuestionIndex].options && questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option${index}`}>{option}</label>
                </div>
              ))}
            </form>
          </div>
        )}
        <div className="button-container">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        </div>
        <div className="submit-button-container">
          {submitted ? (
            <p>Test Submitted! Score: {score}</p>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TestPaper;














/*
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import '../../Style/TestPaper.css';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

function TestPaper() {
  const [examCode, setExamCode] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0); // Track user's score
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/test/testpaperquestions", {
          params: { exam_code: examCode }
        });
        if (response.data.success && response.data.exampaper && response.data.exampaper.questions) {
          setQuestions(response.data.exampaper.questions.map(q => ({
            ...q,
            options: [q.option1, q.option2, q.option3, q.option4]
          })));
        } else {
          console.error('Error: Paper data not found');
        }
      } catch (error) {
        console.error('Error in receiving data:', error);
      }
    };

    const cachedCode = localStorage.getItem('testCode');
    if (cachedCode) {
      setExamCode(cachedCode);
    }
    fetchData();

  }, [examCode]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption('');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const updatedQuestions = questions.map((q, index) => ({
        ...q,
        isCorrect: q.options[q.answerIndex] === selectedOption, // Check if selected option is correct
      }));

      const userScore = updatedQuestions.reduce((acc, q) => acc + (q.isCorrect ? 1 : 0), 0);

      // Update the user's score
      setScore(userScore);
      const email = auth.user.email;
      const testData = {
        exam_code: examCode,
        email:email,
        questions: updatedQuestions.map((q) => ({
          question: q.question,
          options: q.options,
          answerIndex: q.answerIndex,
         // selectedOption: q.isCorrect ? selectedOption : '', // Store selected option
         // isCorrect: q.isCorrect,
        })),
        score: userScore, // Include user's score in the request
      };

      // Send test data to backend for storage
      const response = await axios.put('http://localhost:8080/api/v1/test/testpaperstudentupdate', testData);
      console.log('paper updated successfully:', response.data);
      setSubmitted(true);
      console.log('Test Submitted!');
      setTimeout(() => {
        toast.success("Test Paper Successfully Submitted!");
      }, 500);
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="test-paper-container">
        <h1>Test Paper Title</h1>
        <p>Description of the test paper goes here.</p>
        <div className="note">
          <p>Note: Please choose the most appropriate option for each question.</p>
        </div>
        {questions.length > 0 && questions[currentQuestionIndex] && (
          <div className="question-container">
            <h2>Question {currentQuestionIndex + 1}:</h2>
            <p>{questions[currentQuestionIndex].question}</p>
            <form>
              {questions[currentQuestionIndex].options && questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option${index}`}>{option}</label>
                </div>
              ))}
            </form>
          </div>
        )}
        <div className="button-container">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        </div>
        <div className="submit-button-container">
          {submitted ? (
            <p>Test Submitted! Score: {score}</p>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TestPaper;


*/











































/*

import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import '../../Style/TestPaper.css';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TestPaper() {
  const [examCode, setExamCode] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/test/testpaperquestions", {
          params: { exam_code: examCode }
        });
        if (response.data.success && response.data.exampaper && response.data.exampaper.questions) {
          setQuestions(response.data.exampaper.questions.map(q => ({
            ...q,
            options: [q.option1, q.option2, q.option3, q.option4]
          })));
        } else {
          console.error('Error: Paper data not found');
        }
      } catch (error) {
        console.error('Error in receiving data:', error);
      }
    };

    const cachedCode = localStorage.getItem('testCode');
    if (cachedCode) {
      setExamCode(cachedCode);
    }
    fetchData();

  }, [examCode]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption('');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const testData = {
        exam_code: examCode,
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options, // options are already in the correct format
          answerIndex: q.answerIndex,
        })),
      };
      const response = await axios.put('http://localhost:8080/api/v1/test/testpaperstudentupdate', testData);
      console.log('paper updated successfully:', response.data);
      setSubmitted(true);
      console.log('Test Submitted!');
      setTimeout(() => {
        toast.success("Test Paper Successfully Submitted!");
      }, 500);
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="test-paper-container">
        <h1>Test Paper Title</h1>
        <p>Description of the test paper goes here.</p>
        <div className="note">
          <p>Note: Please choose the most appropriate option for each question.</p>
        </div>
        {questions.length > 0 && questions[currentQuestionIndex] && (
          <div className="question-container">
            <h2>Question {currentQuestionIndex + 1}:</h2>
            <p>{questions[currentQuestionIndex].question}</p>
            <form>
              {questions[currentQuestionIndex].options && questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option${index}`}>{option}</label>
                </div>
              ))}
            </form>
          </div>
        )}
        <div className="button-container">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        </div>
        <div className="submit-button-container">
          {submitted ? (
            <p>Test Submitted!</p>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TestPaper;



















































*/








































/*

import React, { useState, useEffect } from 'react';
import '../../Style/TestPaper.css';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TestPaper() {
  const [examCode, setExamCode] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/test/testpaperquestions", {
          params: { exam_code: examCode }
        });
        if (response.data.success && response.data.exampaper && response.data.exampaper.questions) {
          setQuestions(response.data.exampaper.questions);
        } else {
          console.error('Error: Paper data not found');
        }
      } catch (error) {
        console.error('Error in receiving data:', error);
      }
    };

    const cachedCode = localStorage.getItem('testCode');
    if (cachedCode) {
      setExamCode(cachedCode);
    }
    fetchData();

  }, [examCode]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption('');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const testData = {
        exam_code: examCode,
        questions: questions.map((q) => ({
          question: q.question,
          option1: q.option1,
          option2: q.option2,
          option3: q.option3,
          option4: q.option4,
          answerIndex: q.answerIndex,
        })),
      };

      const response = await axios.put('http://localhost:8080/api/v1/test/testpaperstudentupdate', testData);
      console.log('paper updated successfully:', response.data);
      setSubmitted(true);
      console.log('Test Submitted!');
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="test-paper-container">
        <h1>Test Paper Title</h1>
        <p>Description of the test paper goes here.</p>
        <div className="note">
          <p>Note: Please choose the most appropriate option for each question.</p>
        </div>
        {questions.length > 0 && questions[currentQuestionIndex] && (
          <div className="question-container">
            <h2>Question {currentQuestionIndex + 1}:</h2>
            <p>{questions[currentQuestionIndex].question}</p>
            <form>
              {questions[currentQuestionIndex].options && questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option${index}`}>{option}</label>
                </div>
              ))}
            </form>
          </div>
        )}
        <div className="button-container">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        </div>
        <div className="submit-button-container">
          {submitted ? (
            <p>Test Submitted!</p>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TestPaper;
*/