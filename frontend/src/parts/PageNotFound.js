import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';

const Pagenotfound = () => {
  return (
    <>
      <Navbar/>
      <div className="text-center">
        <h1 className="text-center">404</h1>
        <h2 className="text-center" >Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
      <Footer/>
    </>
  );
};

export default Pagenotfound;
