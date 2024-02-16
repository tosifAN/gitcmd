import React, { useState } from 'react';
import { useAuth } from '../../Context/auth';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import '../../Style/Options.css'; // Import CSS file for styling
import { useNavigate } from "react-router-dom";



const Options = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  // State for handling form fields
  const [createMethod, setCreateMethod] = useState('');

  const handleCreateManually = () => {
    // Logic for creating MCQs manually
    console.log(auth?.user);
    navigate("/createmanuallymcqs/user/title");
  };

  const handleCreateThroughPDF = () => {
    // Logic for creating MCQs through PDF
    navigate("/createthroughpdfmcqs/user/uploadpdf");
  };

  return (
    <>
      <Navbar />
      <div className="container"> {/* Use className to apply CSS classes */}
        <h1 className="title">Create MCQs</h1>
        <div style={{ textAlign: 'center' }}>
          <button className="button" onClick={handleCreateManually}>Create MCQs Manually</button>
          <button className="button" onClick={handleCreateThroughPDF}>Create Through PDF</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Options;
