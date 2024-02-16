import React, { useState } from 'react';

import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';



const CreatePDF = () => {
  return (
    <>
      <Navbar />
      <div className="container"> {/* Use className to apply CSS classes */}
       
        <div style={{ textAlign: 'center' }}>
        <h1 className="title">This Service is Under Construction</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePDF;
