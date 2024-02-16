import React, { useState, useEffect } from "react";
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import { useAuth } from '../../Context/auth';
import axios from "axios";

const Result = () => {
  const [auth] = useAuth();
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    // Fetch test results for the user
    const fetchTestResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/test/testpaperresults', {
          params: {
            email: auth.user.email
          }
        });
        setTestResults(response.data.testPapers);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchTestResults();
  }, [auth]);

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4 mb-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h2 className="text-center mb-4">Your Test Results</h2>
            <div className="card-group">
              {testResults.map((result, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <h4 className="card-title">Exam Code: {result.exam_code}</h4>
                    <p className="card-text">Score: {result.score}</p>
                    <p className="card-text">Date: {new Date(result.createdAt).toLocaleDateString()}</p>
                    {/* Add more details as needed */}
                  </div>
                </div>
              ))}
              {testResults.length === 0 && (
                <div className="text-center">No test results found.</div>
              )}
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Result;
