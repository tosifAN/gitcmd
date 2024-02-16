import React from "react";
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
//import "./Style/Pricing.css"; // Import your CSS file for specific pricing page styling

const Courses = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid m-3 p-3 courses">
        <div className="row">
          <div className="col-md-12">
            <div className="course-card">
              <div className="card">
                <p>No Course is Available Write now.</p> 
              </div>       
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
