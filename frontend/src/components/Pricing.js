import React from "react";
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
//import "./Style/Pricing.css"; // Import your CSS file for specific pricing page styling

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid m-3 p-3 pricing">
        <div className="row">
          <div className="col-md-12">
            <h1 className="pricing-title">Pricing Plans</h1>
            <div className="pricing-plans">
              <div className="card">
                <h2>Basic Plan</h2>
                <p>All the Services are free until further update</p>
               
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
