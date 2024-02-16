import React from 'react';
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mt-5"
      >
        <div className="row">
          <div className="col-lg-8">
            <h1 className="display-4 mb-4">Welcome to Our Test Creation Platform!</h1>
            <p className="lead">Empower your teaching and assessment process with our comprehensive test creation platform.</p>
            <p>Our platform provides educators and professionals with the tools they need to create engaging and effective tests for their students.</p>
            <p>With customizable features and an intuitive interface, you can easily craft quizzes, exams, and assessments tailored to your curriculum.</p>
            <p>Students can access these assessments seamlessly, track their progress, and enhance their learning experience.</p>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0 d-flex align-items-center justify-content-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/createmanuallymcqs/user/title">
                <button className="btn btn-primary btn-lg">
                  Create Test
                </button>
              </Link>
              <Link to="/entertestpaper">
                <button className="btn btn-primary btn-lg">
                  Give Test
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default Home;
